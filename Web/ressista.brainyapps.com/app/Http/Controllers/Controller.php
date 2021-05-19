<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;

use Session;
use Image;
use DateTime;

use Parse\ParseObject;
use Parse\ParseQuery;
use Parse\ParseACL;
use Parse\ParsePush;
use Parse\ParseUser;
use Parse\ParseInstallation;
use Parse\ParseException;
use Parse\ParseAnalytics;
use Parse\ParseFile;
use Parse\ParseCloud;
use Parse\ParseClient;
use Parse\ParseGeoPoint;


class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
    public function __construct()
    {

    }

    public function index(Request $request){
      if ($request->session()->get('user_isAdmin') != null && $request->session()->get('user_isAdmin') == 'true') {
        return redirect('/all-users');
      }
      return view('index');
    }

    public function removedata(Request $request){
      $input = $request->input();
      $query = ParseUser::query();
      try {
        $obj = $query->get($input['id']);
      } catch (ParseException $ex) {
        return false;
      }
      $obj->destroy(true);
      $res['success'] = true;
      return $res;
    }

    public function login(Request $request){
        Session::put('user_email', $request['email']);
        Session::put('user_id', $request['uid']);
        Session::put('user_name', $request['displayName']);
        Session::put('user_avatar', url('/img/avatar.jpg'));
        Session::put('user_verification', 'user_verification');
        Session::put('user_isAdmin', 'true');

        $res['success'] = true;
        $res['user_type'] = 'admin';

        return $res;
    }


    public function showPassword(){
      return view('admin.password');
    }

    public function sendPasswordLink(Request $request){
      $email = $request->input('uid');

      // if($email !='admin@gmail.com'){
      //   $res['success'] = false;
      //   $res['error'] = 'Invalid Admin Email';
      //   return $res;
      // }

        try {
          ParseUser::requestPasswordReset($email);
        } catch (ParseException $ex) {
          $res['error'] = $ex->getMessage();
          $res['code'] = $ex->getCode();
          $res['success'] = false;
          return $res;
        }

        $res['success'] = true;

        return $res;
    }


    public function showChangePassword(){
      return view('admin.changepassword');
    }

    public function ChangePassword(Request $request){
      $param = $request->input();
      $curPwd = $request->session()->get('user_pwd');
      $user_id = $request->session()->get('user_id');
      if($param['old_password'] != $curPwd){
        $res['success'] = false;
        return $res;
      }


      $query = ParseUser::query();
      $user = $query->get($user_id);
      $user->password = $param['new_password'];
      $user->save(true);
      Session::put('user_pwd', $param['new_password']);
      $res['success'] = true;
      return $res;

    }

    public function showUserDetail(Request $request){
      $uid = $request->input('id');
      return view('admin.userdetail', ['uid'=>$uid]);
    }

    public function showReports(Request $request){
      $param = $request->input();
      if(array_key_exists("id", $param)){
        return view('admin.reportdetail', ['id' => $param['id']]);
      } else {
        return view('admin.reports');
      }

    }

    public function deleteReport(Request $request){
      $objectId = $request->input('objectId');
      $query = new ParseQuery("Report");
      $report = $query->get($objectId);
      $report->destroy(true);
      $res['success'] = true;
      return $res;
    }

    public function showBannedUsers(){
      $bannedUsers = [];
      return view('admin.banneduser', ['bannedUsers'=>$bannedUsers]);
    }

	public function showAllUsers(){
      $allUsers = [];
      return view('admin.alluser', ['allUsers'=>$allUsers]);
    }

    public function banUser(Request $request){
      $user_id = $request->input('user_id');
      $query = ParseUser::query();
      $user = $query->get($user_id);
      $user->isBanned = ($request->input('action') == 'true');
      $user->save(true);
      $res['success'] = true;
      if ($request->input('action') == 'true') {
        $this->sendPush($user->username);
      }
      return $res;
    }

    private function sendPush($email) {
      $params = array(
        'email' => $email,
        'alert' => 'Sorry, you are banned.',
        'type' => 34,
        'data' => '',
        'badge' => 'Increment',
        'sound' => 'cheering.caf'
      );

      $results = ParseCloud::run("SendPush", $params);
      return  $results;
    }



    public function locations(Request $request) {

      $count_per_page = 20;
      $page =  $request->input('page');
      if (!$page) $page = 1;
      $search = $request->input('query');

      $params = array(
        'count_per_page' => $count_per_page,
        'page' => $page,
        'search' => $search,
      );
      // return $params;
      $results = ParseCloud::run("GetLocations", $params);

      $total_pages = intval($results['total'] / $count_per_page);
      return view('admin.locations', ['locations'=>$results['locations'], 'total_pages' => $total_pages, 'current_page' => $page, 'query' => $request->input('query')]);
    }

    public function showLocationDetail(Request $request){
      if ($request['id']) {
        $query = new ParseQuery("Locations");
        $query->includeKey("owner");
        $location = $query->get($request['id']);
      } else {
        $location = new ParseObject("Locations");
      }
      return view('admin.locationdetail', ['location'=>$location]);
    }

    public function postLocationDetail(Request $request){
      if ($request['id']) {
        $query = new ParseQuery("Locations");
        $location = $query->get($request['id']);
      } else {
        $location = new ParseObject("Locations");
      }

      $location->title = $request['title'];
      $location->titleLC = strtolower($request['title']);
      $location->address = $request['address'];
      $location->website = $request['website'];
      $location->description = $request['description'];

      $imageFile = $request->file('image');
      if ($imageFile) {
        $parseFile = ParseFile::createFromData( file_get_contents( $imageFile->getPathName() ), $imageFile->getClientOriginalName() );
        $parseFile->save();
        $location->photo = $parseFile->getURL();
      }

      if (!$location->lonLat && !$request->lon && !$request->lon) {
        $location->lonLat = new ParseGeoPoint(0, 0);
      }

      $location->save();
      return redirect('/locations');
    }

    public function movies(Request $request) {
      $count_per_page = 20;
      $page =  $request->input('page');
      if (!$page) $page = 1;
      $param = $request->input('query');
      $query = new ParseQuery("Movies");
      $query->ascending("titleLC");
      $query->skip($count_per_page*$page);
      $query->limit($count_per_page);

      if ($param) {
        $query->contains('titleLC', $param);
      }
      $mvoies = $query->find();

      $query1 = new ParseQuery("Movies");
      if ($param) {
        $query1->contains('titleLC', $param);
      }
      $total_pages = intval($query1->count() / $count_per_page);
      return view('admin.titles', ['movies'=>$mvoies, 'total_pages' => $total_pages, 'current_page' => $page]);
    }

    public function showMovieDetail(Request $request){
      $query = new ParseQuery("Movies");
      $query->includeKey("owner");
      $movie = $query->get($request['id']);
      return view('admin.titledetail', ['movie'=>$movie]);
    }

    public function logout() {
      Session::forget('user_verification');
      Session::forget('user_isAdmin');
      return redirect('/');
    }

    public function affirmationIndex() {
      return view('admin.affirmations');
    }

    public function affirmationShow($id) {
      return view('admin.affirmation-detail', ['id' => $id]);
    }

    public function categoryIndex() {
      return view('admin.categories');
    }
}

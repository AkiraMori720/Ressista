<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your application. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/
Route::get('/',         'Controller@index');
Route::post('/login',   'Controller@login');
Route::get('/logout',   'Controller@logout');
Route::get('/password',  'Controller@showPassword');
Route::post('/send-password-link',  'Controller@sendPasswordLink');


Route::group(['middleware' => 'panel.admin'], function() {

  Route::get('/reports',          'Controller@showReports');
  Route::post('/delete-report',   'Controller@deleteReport');

  Route::get('/change-password',  'Controller@showChangePassword');
  Route::post('/change-password', 'Controller@changePassword');

  Route::get('/banned-users',     'Controller@showBannedUsers');
  Route::get('/all-users',        'Controller@showAllUsers');

  Route::get('affirmations',        'Controller@affirmationIndex');
  Route::get('affirmation/{id}',   'Controller@affirmationShow');
  Route::post('affirmation/{id}',  'Controller@affirmationPost');


  Route::get('categories',        'Controller@categoryIndex');

  Route::get('/locations',        'Controller@locations');
  Route::get('/titles',           'Controller@movies');
  Route::post('/ban-user',        'Controller@banUser');
  Route::get('/transactions',     'Controller@showTransactions');
  Route::get('/user-detail',      'Controller@showUserDetail');
  Route::get('/location-detail',  'Controller@showLocationDetail');
  Route::post('/location-detail',  'Controller@postLocationDetail');
  Route::get('/title-detail',     'Controller@showMovieDetail');
});



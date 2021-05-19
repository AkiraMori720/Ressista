<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <!-- Meta, title, CSS, favicons, etc. -->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title></title>

    <!-- Bootstrap -->
    <link href="/vendors/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Font Awesome -->
    <link href="/vendors/font-awesome/css/font-awesome.min.css" rel="stylesheet">
    <!-- NProgress -->
    <link href="/vendors/nprogress/nprogress.css" rel="stylesheet">
    <!-- iCheck -->
    <!-- <link href="../vendors/iCheck/skins/flat/green.css" rel="stylesheet"> -->
    <!-- Datatables -->
    <link href="/vendors/datatables.net-bs/css/dataTables.bootstrap.min.css" rel="stylesheet">
    <link href="/vendors/datatables.net-buttons-bs/css/buttons.bootstrap.min.css" rel="stylesheet">
    <link href="/vendors/datatables.net-fixedheader-bs/css/fixedHeader.bootstrap.min.css" rel="stylesheet">
    <link href="/vendors/datatables.net-responsive-bs/css/responsive.bootstrap.min.css" rel="stylesheet">
    <link href="/vendors/datatables.net-scroller-bs/css/scroller.bootstrap.min.css" rel="stylesheet">
    <link href="/css/login.css" rel="stylesheet" type="text/css"/>
    <link href="/css/components-rounded.css" id="style_components" rel="stylesheet" type="text/css"/>
    <link href="/vendors/pnotify/dist/pnotify.css" rel="stylesheet">
    <link href="/vendors/pnotify/dist/pnotify.buttons.css" rel="stylesheet">
    <link href="/vendors/cropper/dist/cropper.min.css" rel="stylesheet">

    <link href="/plugin/timepicker/lib/bootstrap-datepicker.css" rel="stylesheet">
    <link href="/plugin/timepicker/jquery.timepicker.css" rel="stylesheet">
    <link href="/plugin/select2/select2.css" rel="stylesheet">
    <link href="/plugin/switchery/dist/switchery.min.css" rel="stylesheet">

    <link rel="stylesheet" href="/plugin/easy-autocomplete/easy-autocomplete.min.css">
    <link rel="stylesheet" href="/plugin/easy-autocomplete/easy-autocomplete.themes.min.css">


    <!-- Custom Theme Style -->
    <link href="/css/custom.min.css" rel="stylesheet">
  </head>
  <style media="screen">
      .df-color{
          color: #fe761e!important
      }

      body {
          color: black !important;
      }

      .login-btn {
          margin-top: 20px!important;
          width: 100%;
          height: 50px;
      }
      .x_panel {
          background-color: white;
      }

      .select2-container--default .select2-results__option[aria-selected=true] {
          color: #76838f;
          background-color: #c1eaff;
      }

      body, .left_col{
          background: white !important;
      }

      .nav-md .container.body .col-md-3.left_col{
          width: 250px;
      }

      .nav_title {
          background: #303c47 !important;
      }

      .nav.side-menu>li.active>a {
          background: linear-gradient(#a8a8a8, #202020),#6f6f6f;
      }

      .nav-md ul.nav.child_menu li:before {
          background: #c7c7c7;
      }
      .nav-md ul.nav.child_menu li:after {
          border-left: 1px solid #923a00;
      }
      .nav-sm .top-logo{
          display:none!important;
      }

      .nav-sm .logout-menu{
          width:70px!important;
      }

      .control-label{
          padding-top: 7px;
          text-align: right;
      }

      .logout-side-menu{
          bottom: 0px!important;
          display: block;
          position: fixed!important;
          width: 250px;
      }

      .nav.side-menu>li>a:hover{
          background-color: #a09d78;
      }
      .nav.side-menu>li>a {
          padding: 13px 20px;
          border-top: 1px solid #8d8845;
          position: relative;
          margin-bottom: 0px;
          background-color: white;
          color: black;
      }

      .text-in-image{
          margin-left: -43px;
          font-size: 18px;
      }

      textarea:focus {
          outline-style: none;
      }

      .img-circle.profile_img{
          width:  60px;
          height: 60px;
      }

      .select2-dropdown{
          z-index: 9999;
      }

      .select2-selection__choice{
          font-size: 13px;
      }
      .select2-dropdown{

      }
      .modal-open .select2-container{
          z-index: 99990!important;
      }
      footer {
          background: #1c2c3b;
      }

      .side-menu .fa{
          color: black;
      }
      .nav_menu .fa {
          color: white;
      }
      .nav.side-menu>li.current-page a, .nav.side-menu>li.active {
          background: #8d8845 !important;
      }
      .nav.side-menu>li.current-page, .nav.side-menu>li.active{
          border-right: 0 !important;
      }
      .site_title {
          background: black !important;
      }
      .nav-flex{
          display: flex;
      }
      .nav-md .container.body .right_col {
          background-color: #f5f6f8;
          margin-left: 250px;
      }
      @media (max-width: 991px){
          .nav-md .container.body .right_col {
              margin-left: 0 !important;
          }
      }

      .main_container .top_nav{
          margin-left: 250px;
      }
      .nav_menu {
          background-color: #8d8845 !important;
          color: white;
      }
      body .container.body .right_col {
          /* background: #F7F7F7; */
          background-color: #f5f6f8;
      }
      .navbar-title{
          font-size: 20px;
          padding: 10px 0;
          display: flex;
          flex-grow: 1;
          margin: 0 !important;
      }
      @media (max-width: 600px) {
          .navbar-title {
              display: block;
          }
      }
      .navbar-title .title-content{
          flex-grow: 1;
      }
      .navbar-title i{
          font-size: 20px;
      }

      .navbar-title .right-addon input {
          padding: 0 10px;
          background-color: #726f46  !important;
          border-radius: 5px;
          border-width: 0;
          color: white;
      }

      /* enable absolute positioning */
      .inner-addon {
          position: relative;
          margin-right: 8px;
      }

      /* style icon */
      .inner-addon .fa {
          position: absolute;
          padding: 8px 15px;
      }

  </style>

  <body class="nav-md">
    <div id="progressDlg" class="modal fade in" role="basic" style="padding-right: 17px;z-index:9999999999999;" [class.show] = "appState.get('isLoading') > 0">
     <div class="modal-backdrop fade in" style="height: 100%;opacity:0.28;background-color:rgb(40, 56, 71) !important;"></div>
     <div class="modal-dialog" style="width:45px;height:100%;margin:auto;">
       <i class="fa fa-circle-o-notch fa-spin fa-fw" aria-hidden="true" style="font-size: 44px;top: 50%;position: absolute;color: rgb(40, 56, 71);"></i>
     </div>
    </div>
    <div class="container body">
      <div class="main_container">
        <div class="col-md-3 left_col">
          <div class="left_col scroll-view">
{{--            <div class="navbar nav_title" style="border: 0; text-align: center;">--}}
{{--              <!-- <a href="index.html" class="site_title"><span></span></a> -->--}}
{{--              <a href="{{url('/')}}" class="site_title">--}}
{{--              <img class="top-logo" src="/img/icon_top_logo.png" alt="" style="width: 65%; max-height: 45px;"/>--}}
{{--              </a>--}}
{{--            </div>--}}

{{--            <div class="clearfix"></div>--}}

            <!-- menu profile quick info -->
            <div class="profile" style="height:70px;">
              <div class="profile_pic">
                <img src="/img/avatar.jpg" alt="..." class="img-circle profile_img" style="padding: 0;border: 2px solid white;">
              </div>
              <div class="profile_info">
                <span style="font-size: 16px; color: black;">{{ Session::get('user_name') }}</span>
                <span style="color: grey">Administrator</span>
              </div>
            </div>
            <!-- /menu profile quick info -->

            <br />

            <!-- sidebar menu -->
            <div id="sidebar-menu" class="main_menu_side hidden-print main_menu">
              <div class="menu_section">
                <ul class="nav side-menu">
                  <li><a class="btn-switch-page" href="{{url('/reports')}}"><i class="fa fa-file-text-o "></i> Reports</a></li>
                  <li><a class="btn-switch-page" href="{{url('/all-users')}}"><i class="fa fa-users "></i> All Users</a></li>
                  <li><a class="btn-switch-page" href="{{url('/banned-users')}}"><i class="fa fa-user-times "></i> Banned Users</a></li>
                  <li><a class="btn-switch-page" href="{{url('/categories')}}"><i class="fa fa-list "></i> Categories</a></li>
                  <li><a class="btn-switch-page" href="{{url('/change-password')}}"><i class="fa fa-lock"></i> Change Password</a></li>
                  <li><a class="btn-switch-page" href="{{url('/affirmations')}}"><i class="fa fa-cubes "></i> Daily Affirmation/Health Tips</a></li>
                </ul>
              </div>

              <div class="menu_section">
                <ul class="nav side-menu">
                  <li><a class="logout-side-menu btn-switch-page" href="{{url('/logout')}}" ><i class="fa fa-power-off"></i> Logout</a></li>
                </ul>
              </div>
            </div>
            <!-- /sidebar menu -->


          </div>
        </div>

        <!-- top navigation -->
        <div class="top_nav">
          <div class="nav_menu">
            <nav class="nav-flex">
              <div class="nav toggle">
                <a id="menu_toggle"><i class="fa fa-bars"></i></a>
              </div>
              <div class="nav navbar-nav navbar-title">
                @yield('page-title')
              </div>
{{--              <ul class="nav navbar-nav navbar-right">--}}
{{--                <li class="">--}}
{{--                  <a href="javascript:;" class="user-profile dropdown-toggle" data-toggle="dropdown" aria-expanded="false" style="">--}}
{{--                    <img  src="{{Session::get('user_avatar')}}" alt="">{{Session::get('user_name')}}--}}
{{--                    <span class=" fa fa-angle-down"></span>--}}
{{--                  </a>--}}
{{--                  <ul class="dropdown-menu dropdown-usermenu pull-right">--}}
{{--                    <!-- <li><a href="javascript:;"> Profile</a></li>--}}
{{--                    <li>--}}
{{--                      <a href="javascript:;">--}}
{{--                        <span class="badge bg-red pull-right">50%</span>--}}
{{--                        <span>Settings</span>--}}
{{--                      </a>--}}
{{--                    </li>--}}
{{--                    <li><a href="javascript:;">Help</a></li> -->--}}
{{--                    <li><a class="btn-switch-page" href="{{url('/logout')}}"><i class="fa fa-sign-out pull-right"></i> Log Out</a></li>--}}
{{--                  </ul>--}}
{{--                </li>--}}

{{--              </ul>--}}
            </nav>
          </div>

        </div>
        <!-- /top navigation -->

        <!-- page content -->
        <div class="right_col" role="main">
          <div class="">

              <!-- <div class="title_left">
                <h3>Fixed Footer <small> Just add class <strong>footer_fixed</strong></small></h3>
              </div> -->
              @yield('page-content')

          </div>
        </div>
        <!-- /page content -->

        <!-- footer content -->
{{--        <footer>--}}
{{--          <div class="pull-right">--}}
{{--            &nbsp;--}}
{{--          </div>--}}
{{--          <div class="clearfix"></div>--}}
{{--        </footer>--}}
        <!-- /footer content -->
      </div>
    </div>



    <!-- jQuery -->
    <script src="/vendors/jquery/dist/jquery.min.js"></script>
    <!-- Bootstrap -->
    <script src="/vendors/bootstrap/dist/js/bootstrap.min.js"></script>
    <!-- FastClick -->
    <script src="/vendors/fastclick/lib/fastclick.js"></script>
    <!-- NProgress -->
    <script src="/vendors/nprogress/nprogress.js"></script>
    <!-- iCheck -->
    <script src="/vendors/iCheck/icheck.min.js"></script>
    <!-- Datatables -->
    <script src="/vendors/datatables.net/js/jquery.dataTables.min.js"></script>
    <script src="/vendors/datatables.net-bs/js/dataTables.bootstrap.min.js"></script>
    <script src="/vendors/datatables.net-buttons/js/dataTables.buttons.min.js"></script>
    <script src="/vendors/datatables.net-buttons-bs/js/buttons.bootstrap.min.js"></script>
    <script src="/vendors/datatables.net-buttons/js/buttons.flash.min.js"></script>
    <script src="/vendors/datatables.net-buttons/js/buttons.html5.min.js"></script>
    <script src="/vendors/datatables.net-buttons/js/buttons.print.min.js"></script>
    <script src="/vendors/datatables.net-fixedheader/js/dataTables.fixedHeader.min.js"></script>
    <script src="/vendors/datatables.net-keytable/js/dataTables.keyTable.min.js"></script>
    <script src="/vendors/datatables.net-responsive/js/dataTables.responsive.min.js"></script>
    <script src="/vendors/datatables.net-responsive-bs/js/responsive.bootstrap.js"></script>
    <script src="/vendors/datatables.net-scroller/js/datatables.scroller.min.js"></script>
    <script src="/vendors/jszip/dist/jszip.min.js"></script>
    <script src="/vendors/pnotify/dist/pnotify.js"></script>
    <script src="/vendors/pnotify/dist/pnotify.buttons.js"></script>
    <script src="/vendors/pnotify/dist/pnotify.nonblock.js"></script>
    <script src="/vendors/cropper/dist/cropper.js"></script>
    <script src="/js/jquery.blockui.min.js" type="text/javascript"></script>
    <script src="/js/jquery.uniform.min.js" type="text/javascript"></script>
    <script src="/js/jquery.cokie.min.js" type="text/javascript"></script>
    <!-- END CORE PLUGINS -->
    <!-- BEGIN PAGE LEVEL PLUGINS -->
    <script src="/js/jquery.validate.min.js" type="text/javascript"></script>
    <script src="/js/metronic.js" type="text/javascript"></script>
    <script src="/js/layout.js" type="text/javascript"></script>
    <script src="/js/login.js" type="text/javascript"></script>
    <script src="/js/jquery.confirm.js" type="text/javascript"></script>

    <script src="/plugin/timepicker/lib/bootstrap-datepicker.js" type="text/javascript"></script>
    <script src="/plugin/timepicker/jquery.timepicker.js" type="text/javascript"></script>
    <script src="/plugin/select2/select2.full.min.js" type="text/javascript"></script>
    <script src="/plugin/jquery.inputmask/dist/min/jquery.inputmask.bundle.min.js" type="text/javascript"></script>
    <script src="/plugin/jquery.mask.js" type="text/javascript"></script>
    <script src="/plugin/switchery/dist/switchery.min.js"></script>
    <script src="/plugin/easy-autocomplete/jquery.easy-autocomplete.min.js"></script>


    <!-- Custom Theme Scripts -->
    <script src="/js/custom.min.js"></script>

    <!-- Datatables -->
    <script>
      $(document).ready(function() {
        // Metronic.init(); // init metronic core components
      	// Layout.init(); // init current layout
      	Login.init();
        $('.side-menu a').on('click', function(e) {
          // showProgress();
        });

        $('.btn-switch-page').on('click', function(e) {
            showProgress();
        });

      });
    </script>

    @yield('script-content')

  </body>
</html>

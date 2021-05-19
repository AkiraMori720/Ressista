<!DOCTYPE html>
<html lang="en" style="height: 100%">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <!-- Meta, title, CSS, favicons, etc. -->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Ressista</title>

    <!-- Bootstrap -->
    <link href="vendors/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Font Awesome -->
    <link href="vendors/font-awesome/css/font-awesome.min.css" rel="stylesheet">
    <!-- NProgress -->
    <link href="vendors/nprogress/nprogress.css" rel="stylesheet">
    <!-- iCheck -->
    <!-- <link href="../vendors/iCheck/skins/flat/green.css" rel="stylesheet"> -->
    <!-- Datatables -->
    <link href="vendors/datatables.net-bs/css/dataTables.bootstrap.min.css" rel="stylesheet">
    <link href="vendors/datatables.net-buttons-bs/css/buttons.bootstrap.min.css" rel="stylesheet">
    <link href="vendors/datatables.net-fixedheader-bs/css/fixedHeader.bootstrap.min.css" rel="stylesheet">
    <link href="vendors/datatables.net-responsive-bs/css/responsive.bootstrap.min.css" rel="stylesheet">
    <link href="vendors/datatables.net-scroller-bs/css/scroller.bootstrap.min.css" rel="stylesheet">
    <link href="css/login.css" rel="stylesheet" type="text/css"/>
    <link href="css/components-rounded.css" id="style_components" rel="stylesheet" type="text/css"/>
    <link href="vendors/pnotify/dist/pnotify.css" rel="stylesheet">
    <link href="vendors/pnotify/dist/pnotify.buttons.css" rel="stylesheet">

    <!-- Custom Theme Style -->
    <link href="css/custom.min.css" rel="stylesheet">
    <style media="screen">

    </style>
  </head>

  <body class="nav-md login" style="background-image: url(./img/background.png) !important; background-repeat: no-repeat; background-size: cover">
    <div id="progressDlg" class="modal fade in" role="basic" style="padding-right: 17px;z-index:9999999999999;" [class.show] = "appState.get('isLoading') > 0">
     <div class="modal-backdrop fade in" style="height: 100%;opacity:0.28;"></div>
     <div class="modal-dialog" style="width:45px;height:100%;margin:auto;">
       <i class="fa fa-circle-o-notch fa-spin fa-fw" aria-hidden="true" style="font-size: 44px;top: 50%;position: absolute;color: rgb(28, 44, 59);"></i>
     </div>
    </div>

    <div class="content login-page">
            <div class="logo">
                <img src="img/icon_logo.png" alt="" style="border-radius: 20px;height: 80px; margin-bottom: 60px;"/>
                <h1 style="margin-top: 24px">Login</h1>
            </div>
        	<!-- BEGIN LOGIN FORM -->
        	<form class="login-form" >
            @if (isset($error))
            <div class="alert alert-danger display-hide">
        			<button class="close" data-close="alert" onclick="$('.alert').addClass(display-hide)"></button>
        			<span>
        			Enter any username and password. </span>
        		</div>
            @endif
        		<div class="alert alert-danger display-hide">
        			<button class="close" data-close="alert" onclick="$('.alert').addClass(display-hide)"></button>
        			<span>
        			Enter any username and password. </span>
        		</div>

            <style>
            .color-red input, .color-red .fa{
              color:#700000 !important;
              border-color: #700000 !important;
            }

            </style>

        		<div class="form-group input-email-group">
              <input class="form-control form-control-solid placeholder-no-fix" type="text" autocomplete="off" placeholder="Email" name="uid" id="username"/>
              <i class="fa fa-envelope"></i>
        		</div>
        		<div class="form-group input-pwd-group">
        			<input class="form-control form-control-solid placeholder-no-fix" type="password" autocomplete="off" placeholder="Password" name="pwd" id="password"/>
              <i class="fa fa-lock"></i>
        		</div>

            <div class="form-group text-center" style="margin-top: 20px;">
                <label style="display: flex; justify-content: center">
                    <input class="form-control form-control-solid placeholder-no-fix" type="checkbox" name="remember" id="remember" style="width: 20px; height: 20px; margin: 0 8px;"/>
                    Remember Me
                </label>
            </div>
        		<div class="form-actions">
        			<button type="button" class="btn btn-warning login-btn" style="background-color: #b4ad51; color: #FFF; border-radius: 2.1rem !important; font-size: 1.7rem; font-weight: 700; margin: 0 !important;" onclick="login()">Log In</button>
        		</div>
        	</form>
        	<!-- END LOGIN FORM -->
        </div>

    <!-- jQuery -->
    <script src="vendors/jquery/dist/jquery.min.js"></script>
    <!-- Bootstrap -->
    <script src="vendors/bootstrap/dist/js/bootstrap.min.js"></script>
    <!-- FastClick -->
    <script src="vendors/fastclick/lib/fastclick.js"></script>
    <!-- NProgress -->
    <script src="vendors/nprogress/nprogress.js"></script>
    <!-- iCheck -->
    <script src="vendors/iCheck/icheck.min.js"></script>
    <!-- Datatables -->
    <script src="vendors/jszip/dist/jszip.min.js"></script>
    <script src="vendors/pnotify/dist/pnotify.js"></script>
    <script src="vendors/pnotify/dist/pnotify.buttons.js"></script>
    <script src="vendors/pnotify/dist/pnotify.nonblock.js"></script>

    <script src="js/jquery.blockui.min.js" type="text/javascript"></script>
    <script src="js/jquery.uniform.min.js" type="text/javascript"></script>
    <script src="js/jquery.cokie.min.js" type="text/javascript"></script>
    <!-- END CORE PLUGINS -->
    <!-- BEGIN PAGE LEVEL PLUGINS -->

    @include('firebase')

    <script src="js/jquery.validate.min.js" type="text/javascript"></script>
    <script src="js/metronic.js" type="text/javascript"></script>
    <script src="js/layout.js" type="text/javascript"></script>
    <script src="js/login.js" type="text/javascript"></script>

    <!-- Custom Theme Scripts -->
    <script src="js/custom.min.js"></script>

    <!-- Datatables -->
    <script>
      $(document).ready(function() {
        Metronic.init(); // init metronic core components
      	Layout.init(); // init current layout
      	Login.init();
        $('input').keyup(function(e){
            if(e.keyCode == 13)
            {
                $(this).trigger("enterKey");
                login();
            }
        });

      });


      function login(){
        if ($('#username').val() == '' || $('#password').val()==''){
          new PNotify({
              title: 'LogIn Error',
              text: 'User Email or Password is required',
              type: 'error',
              styling: 'bootstrap3'
          });
		    return;
      }
      var email = $('#username').val();
      var password = $('#password').val();

      showProgress();
      firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        new PNotify({
              title: 'LogIn Error',
              text: error.message,
              type: 'error',
              styling: 'bootstrap3'
          });
      }).then(function(res) {
        var user = res.user;
        get_fb_doc('users', user.uid, function(res) {
          if (res.success) {
            var user_info = res.data;
            if (!user_info.isAdmin) {
              return  new PNotify({
                  title: 'LogIn Error',
                  text: 'You have not permission',
                  type: 'error',
                  styling: 'bootstrap3'
              });
            }
            user_info.uid = user.uid;
            postLoginSuccess(user_info);
          } else {
            return  new PNotify({
                title: 'LogIn Error',
                text: 'Invalid User',
                type: 'error',
                styling: 'bootstrap3'
            });
          }

        })
      });

      }

      function postLoginSuccess(user_info) {
        user_info._token = '{{ csrf_token() }}';
        $.ajax({
                url: "{{ url('/login') }}",
                data: user_info,
                method: 'post',
                success: function(res) {
                  if (res.success) {
                    // gotoTable();
                    // for (var i = 0; i < res.data.length; i++) {
                    //   importData(res.data[i]);
                    // }
                    if (res.user_type == 'admin') {
                      window.location = "{{ url('/').'/all-users' }}";
                    } else {
                      window.location = "{{ url('/').'/all-users' }}";
                    }
                  } else {
                    new PNotify({
                        title: 'LogIn Error',
                        text: res.error,
                        type: 'error',
                        styling: 'bootstrap3'
                    });
                    hideProgress();
                  }
                },
                error: function() {
                  new PNotify({
                      title: 'LogIn Error',
                      text: 'Invalid User Email or Password.',
                      type: 'error',
                      styling: 'bootstrap3'
                  });
                  hideProgress();
                },
        });
      }


    </script>
    <!-- /Datatables -->
  </body>
</html>

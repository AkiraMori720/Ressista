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
    <link href="vendors/cropper/dist/cropper.min.css" rel="stylesheet">

    <link href="plugin/datepicker/css/datepicker.css" rel="stylesheet">
    <link href="plugin/select2/select2.css" rel="stylesheet">


    <!-- Custom Theme Style -->
    <link href="css/custom.min.css" rel="stylesheet">
    <style media="screen">
    	.login-btn {
        margin-top: 20px!important;
        width: 100%;
        height: 50px;
    	}


      .select2-container--default .select2-results__option[aria-selected=true] {
          color: #76838f;
          background-color: #c1eaff;
      }

    </style>
  </head>

  <body class="nav-md login">
    <canvas id="canvas" style="display:none;"></canvas>
    <div class="logo" style="padding: 40px 15px;">
      	<img src="img/icon_logo.png" alt="" style="height:60px;"/>
    </div>

    <div class="table-page" >
      <div class="" style="margin: 20px;">
        <!-- page content -->
        <div class="" role="main">
          <div class="">

            <div class="row">
              <div class="col-md-12 col-sm-12 col-xs-12">
                <div class="x_panel" >
                  <div class="x_title">
                    <h2><span class="fa fa-users" style="color:black"></span>  Users<small></small></h2>
                    <a href="#" onclick="addUser();"><span class = "append-icon fa fa-fw fa-plus-circle" style="color:red;font-size:20px;padding:5px;"> </span></a>
                    <div class="clearfix"></div>
                  </div>
                  <div class="x_content">
                    <button class="btn btn-success" style="width: 150px;margin: 10px 0px 20px;" type="button" name="button" onclick="showPushDlg();"><i class="append-icon glyphicon glyphicon-cloud-download"></i> Push Notification</button>

                    <style media="screen">
                      .select2-selection__choice{
                        font-size: 13px;
                      }
                      .select2-dropdown{

                      }
                      .modal-open .select2-container{
                        z-index: 99990!important;
                      }
                    </style>

                    <table id="datatable" class="table table-striped table-bordered">
                      <thead>
                        <tr>
                          <td>Name</td>
                          <td>Email</td>
                          <td>Avatar</td>
                          <td>Birthday</td>
                          <td>Phone Number</td>
                          <td>action</td>
                        </tr>
                      </thead>
                      <tbody>
                        @foreach ($data as $one)
                        <tr class="{{$one['id']}}">
                          <td style="padding: 18px 5px;">{{$one['fullName']}}</td>
                          <td style="padding: 18px 5px;">{{$one['email']}}</td>
                          <td style="text-align:center">
                            <input type="hidden" id="avatar_url_{{$one['id']}}" value="{{$one['avatar']}}">
                            <img src="{{$one['avatar']}}" alt="" style="height:30px;">
                          </td>
                          <td style="padding: 18px 5px;">{{$one['birthday']}}</td>
                          <td style="padding: 18px 5px;">{{$one['phoneNumber']}}</td>
                          <td>
                            <a class="btn menu-icon vd_yellow" data-placement="top" data-toggle="tooltip" data-original-title="edit" onclick="editItem('{{$one['id']}}')"> <i class="fa fa-pencil"></i> </a>
                            <a class="btn menu-icon vd_red " data-placement="top" data-toggle="tooltip" data-original-title="delete" onclick="removeItem('{{$one['id']}}')"><i class="fa fa-times"></i> </a>
                          </td>
                        </tr>
                        @endforeach

                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
        <!-- /page content -->

      </div>
    </div>
    <div class="copyright">

    </div>

    <div id="progressDlg" class="modal fade in" role="basic" style="padding-right: 17px;z-index:9999999999999;" [class.show] = "appState.get('isLoading') > 0">
     <div class="modal-backdrop fade in" style="height: 100%;opacity:0.28;background-color:rgb(129, 133, 253) !important;"></div>
     <div class="modal-dialog" style="width:45px;height:100%;margin:auto;">
       <i class="fa fa-circle-o-notch fa-spin fa-fw" aria-hidden="true" style="font-size: 44px;top: 50%;position: absolute;color: rgb(129, 133, 253);"></i>
     </div>
    </div>

<div id="dlg_modal" class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-hidden="true">

  <div class="modal-dialog modal-mm" style="min-width: 800px!important;">
    <form id="form_modal" class="form-horizontal form-label-left" novalidate method="POST" enctype="multipart/form-data" action="/savedata">
      {{ csrf_field() }}
      <input type="hidden" id="id" name="id" value="">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span>
          </button>
          <h4 class="modal-title" id="title_modal">Title</h4>
        </div>
        <div class="modal-body">
          <div class="" style="height: 300px;">
            <div class="col-md-3 img-responsive">
              <img id="imgAvatar" src="img/avatar.jpg" alt="" style="border:2px solid;min-width:100%;max-width: 100%;">
              <div class="form-img-action text-center mgbt-xs-20" style="margin-top:20px;">
                <label for="image_file" class="btn btn-warning" href="javascript:void(0);"><i class="fa fa-cloud-upload append-icon"></i> Upload</label>
                <input type="file" class="hidden" id="image_file" accept="image/*" name="avatar">
              </div>
            </div>

            <div class="col-md-9 col-sm-9 col-xs-12">
            <div class="item form-group">
              <label class="control-label col-md-3 col-sm-3 col-xs-12" for="name">Name <span class="required">*</span>
              </label>
              <div class="col-md-8 col-sm-8 col-xs-12">
                <input id="name" name="name" class="form-control col-md-7 col-xs-12" required="required" type="text">
              </div>
            </div>
            <div class="item form-group">
              <label class="control-label col-md-3 col-sm-3 col-xs-12" for="name">Email <span class="required">*</span>
              </label>
              <div class="col-md-8 col-sm-8 col-xs-12">
                <input id="email" name="email" class="form-control col-md-7 col-xs-12" required="required" type="email">
              </div>
            </div>

            <div class="item form-group">
              <label class="control-label col-md-3 col-sm-3 col-xs-12" for="adTime" >Birthday <span class="required">*</span>
              </label>
              <div class="col-md-8 col-sm-8 col-xs-12">
                <input id="birthday" name="birthday" class="form-control col-md-7 col-xs-12" data-date-format="yyyy-mm-dd">
              </div>
            </div>

            <div class="item form-group">
              <label class="control-label col-md-3 col-sm-3 col-xs-12" for="name">Phone Number <span class="required">*</span>
              </label>
              <div class="col-md-8 col-sm-8 col-xs-12">
                <input id="phonenumber" name="phonenumber" class="form-control col-md-7 col-xs-12"  type="text">
              </div>
            </div>

            <div class="item form-group">
              <label class="control-label col-md-3 col-sm-3 col-xs-12" for="password">Password <span class="required">*</span>
              </label>
              <div class="col-md-8 col-sm-8 col-xs-12">
                <input id="password" name="password" class="form-control col-md-7 col-xs-12" type="password">
              </div>
            </div>

            <div class="item form-group">
              <label class="control-label col-md-3 col-sm-3 col-xs-12" for="adTime">Confrim Password <span class="required">*</span>
              </label>
              <div class="col-md-8 col-sm-8 col-xs-12">
                <input id="confirmPassword" name="confirmPassword" class="form-control col-md-7 col-xs-12" type="password">
              </div>
            </div>

            <div class="item form-group">
              <div class="container cropper">
                <div class="row">
                  <div class="col-md-8">
                    <!-- <div class="img-container">
                      <img id="image" src="" alt="Picture">
                    </div> -->
                  </div>
                  <div class="col-md-4">
                    <div class="docs-preview clearfix">
                      <!-- <div class="img-preview preview-lg" style="margin:50% auto;float: none;"></div> -->
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
          </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-primary" id="btn_ok" onclick = "saveItem()">Save</button>
        </div>
      </div>
    </form>
  </div>
</div>
</div>


<div id="dlg_modal_push" class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-hidden="true">

  <div class="modal-dialog modal-mm" style="min-width: 800px!important;">
    <form id="form_modal" class="form-horizontal form-label-left" novalidate method="POST" enctype="multipart/form-data" action="/savedata">
      {{ csrf_field() }}
      <input type="hidden" id="id" name="id" value="">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span>
          </button>
          <h4 class="modal-title" id="title_modal">Push Notification</h4>
        </div>
        <div class="modal-body">
          <div class="" style="height: 250px;">

            <div class="col-md-12 col-sm-12 col-xs-12">
            <div class="item form-group">
              <label class="control-label col-md-3 col-sm-3 col-xs-12" for="name">Users <span class="required">*</span>
              </label>
              <div class="col-md-8 col-sm-8 col-xs-12">
                <select class="form-control" id="select2_users" multiple data-plugin="select2" style="font-size:13px;">
                  @foreach ($data as $one)
                    <option value="{{$one['id']}}">{{$one['email']}}</option>
                  @endforeach
                </select>
              </div>
            </div>
            <div class="item form-group">
              <label class="control-label col-md-3 col-sm-3 col-xs-12" for="name">Message <span class="required">*</span>
              </label>
              <div class="col-md-8 col-sm-8 col-xs-12">
                <textarea id="push_message" name="push_message" class="form-control col-md-7 col-xs-12" required="required" rows="8"></textarea>
              </div>
            </div>



            <div class="item form-group">
              <div class="container cropper">
                <div class="row">
                  <div class="col-md-8">
                    <!-- <div class="img-container">
                      <img id="image" src="" alt="Picture">
                    </div> -->
                  </div>
                  <div class="col-md-4">
                    <!-- <div class="docs-preview clearfix"> -->
                      <!-- <div class="img-preview preview-lg" style="margin:50% auto;float: none;"></div> -->
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
          </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-primary" id="btn_ok" onclick = "sendPush()">Send</button>
        </div>
      </div>
    </form>
  </div>
</div>
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
    <script src="vendors/datatables.net/js/jquery.dataTables.min.js"></script>
    <script src="vendors/datatables.net-bs/js/dataTables.bootstrap.min.js"></script>
    <script src="vendors/datatables.net-buttons/js/dataTables.buttons.min.js"></script>
    <script src="vendors/datatables.net-buttons-bs/js/buttons.bootstrap.min.js"></script>
    <script src="vendors/datatables.net-buttons/js/buttons.flash.min.js"></script>
    <script src="vendors/datatables.net-buttons/js/buttons.html5.min.js"></script>
    <script src="vendors/datatables.net-buttons/js/buttons.print.min.js"></script>
    <script src="vendors/datatables.net-fixedheader/js/dataTables.fixedHeader.min.js"></script>
    <script src="vendors/datatables.net-keytable/js/dataTables.keyTable.min.js"></script>
    <script src="vendors/datatables.net-responsive/js/dataTables.responsive.min.js"></script>
    <script src="vendors/datatables.net-responsive-bs/js/responsive.bootstrap.js"></script>
    <script src="vendors/datatables.net-scroller/js/datatables.scroller.min.js"></script>
    <script src="vendors/jszip/dist/jszip.min.js"></script>
    <script src="vendors/pnotify/dist/pnotify.js"></script>
    <script src="vendors/pnotify/dist/pnotify.buttons.js"></script>
    <script src="vendors/pnotify/dist/pnotify.nonblock.js"></script>
    <script src="vendors/cropper/dist/cropper.js"></script>
    <script src="js/jquery.blockui.min.js" type="text/javascript"></script>
    <script src="js/jquery.uniform.min.js" type="text/javascript"></script>
    <script src="js/jquery.cokie.min.js" type="text/javascript"></script>
    <!-- END CORE PLUGINS -->
    <!-- BEGIN PAGE LEVEL PLUGINS -->
    <script src="js/jquery.validate.min.js" type="text/javascript"></script>
    <script src="js/metronic.js" type="text/javascript"></script>
    <script src="js/layout.js" type="text/javascript"></script>
    <script src="js/login.js" type="text/javascript"></script>
    <script src="js/jquery.confirm.js" type="text/javascript"></script>

    <script src="plugin/datepicker/js/bootstrap-datepicker.js" type="text/javascript"></script>
    <script src="plugin/select2/select2.full.min.js" type="text/javascript"></script>
    <!-- Custom Theme Scripts -->
    <script src="js/custom.min.js"></script>

    <!-- Datatables -->
    <script>
      $(document).ready(function() {
        Metronic.init(); // init metronic core components
      	Layout.init(); // init current layout
      	Login.init();


        $('#birthday').datepicker();
        $('#datatable').dataTable();

        $(document).on('shown.bs.modal','#dlg_modal', function () {
            // alert($(".img-container").width());
            $("#image").cropper('init');
            console.log('finish modal show');
          });

          $("#image_file").on('change', function(e) {
    						var input = this;
    				    if (input.files && input.files[0]) {
    				        var reader = new FileReader();
    				        reader.onload = function (e) {
    				            $("#imgAvatar").attr('src', e.target.result);
    				        }
    				        reader.readAsDataURL(input.files[0]);
    				    }
                var file, img;
                if ((file = this.files[0])) {
                    img = new Image();
                    img.onload = function () {
                        var canvas = document.getElementById('canvas');
                        var tmpCtx2 = canvas.getContext('2d');
                        tmpCtx2.canvas.width = this.width;
                        tmpCtx2.canvas.height = this.height;
                        tmpCtx2.drawImage($('#imgAvatar')[0],0,0);
                        // var fullQuality = canvas.toDataURL('image/jpeg', 0.9);
                    };
                    img.src = window.URL.createObjectURL(file);
                }

    				return;
    		});
      });


      function addUser(){
        $('#dlg_modal').modal('show');
        $("#title_modal").text("Add User");
        $("#id").val("");
        $("#name").val("");
        $("#email").val("");
        $("#birthday").val("");
        $("#phonenumber").val("");
        $("#password").val("");
        $("#confirmPassword").val("");
        $("#image_file").val('');
        $("#imgAvatar").attr('src', "img/avatar.jpg");
      }

      function editItem(id){
          $('#dlg_modal').modal('show');
          $("#title_modal").text("Update User");
          $("#id").val(id);
          $("#name").val($($("."+id).children()[0]).text());
          $("#email").val($($("."+id).children()[1]).text());
          $("#birthday").val($($("."+id).children()[3]).text());
          $("#phonenumber").val($($("."+id).children()[4]).text());
          $("#imgAvatar").attr('src', $('#avatar_url_'+id).val());
      }

      function removeItem(id){
        $.confirm({
        text: "Do you want to remove?",
        confirm: function(button) {
          showProgress();
          $.ajax({
	           url: "{{url('/')}}" + '/removedata' ,
             data: {
              'id': id
            },
            method: 'get',
            success: function(res) {
              if (res.success) {
                location.reload();
              } else {
                new PNotify({
                  title: 'Remove Data Error',
                  text: 'Please check your Internet status.',
                  type: 'error',
                  styling: 'bootstrap3'
                });
                hideProgress();
              }
            },
            error: function() {
              new PNotify({
                title: 'Remove Data Error',
                text: 'Please check your Internet status.',
                type: 'error',
                styling: 'bootstrap3'
              });
            },
          });

        }
        });

      }



      function saveItem(){




        error = '';
        if ($('#name').val() == '') {
          error = 'Name is required field.';
        }
        else if ( $('#email').val() == '') {
          error = 'Email is required field.';
        }
        else if ( !isEmail($('#email').val())) {
          error = 'Email Format is Invalid.';
        }
        else if ( $('#phonenumber').val() == '') {
          error = 'Phone Number is required field.';
        }
        else if ( $('#birthday').val() == '') {
          error = 'Birthday is required field.';
        }
        else if ( $('#password').val() == '') {
          error = 'Password is required field.';
        }
        else if ( $('#password').val() != $('#confirmPassword').val()) {
          error = 'Confirm Password does not match.';
        }
        else if ( $('#id').val() == '' && $('#image_file').val() == '') {
          error = 'Please choose image';
        }

        if (error != '') {
          new PNotify({
              title: 'Validation Error',
              text: error,
              type: 'error',
              styling: 'bootstrap3'
          });
          return;
        }

        showProgress();



        if ($('#id').val() != '' && $('#image_file').val() == '') {
            avatar_data = '';
        } else {
          var zip_rate = 0.8;
          var avatar_data = '';
          var imgFileSize = 2000000; // set maximum

          while (imgFileSize > 1000000) {
            avatar_data = $("#canvas")[0].toDataURL('image/jpeg', zip_rate);
            imgFileSize = Math.round((avatar_data.length)*3/4) ;
            console.log("zipping...image file size("+ zip_rate +"): "+imgFileSize);
            zip_rate -= 0.05;
          }
        }

        $.ajax({
		        url: "{{url('/')}}"+'/savedata',
                data: {
                        '_token': '{{ csrf_token() }}',
                        'id': $('#id').val(),
                        'name': $('#name').val(),
                        'email': $('#email').val(),
                        'password': $('#password').val(),
                        'birthday': $('#birthday').val(),
                        'phonenumber': $('#phonenumber').val(),
                        'avatar': avatar_data,
                },
                method: 'post',
                success: function(res) {
                  if (res.success) {
                    location.reload();
                  } else {
                    var error ;
                    if (res.error) {
                      error = res.error;
                    } else {
                      error = 'Please check your Internet status.';
                    }

                    new PNotify({
                      title: 'Save Data Error',
                      text: error,
                      type: 'error',
                      styling: 'bootstrap3'
                    });
                    hideProgress();
                  }
                },
                error: function() {
                  new PNotify({
                      title: 'Save Data Error',
                      text: 'Please check your Internet status.',
                      type: 'error',
                      styling: 'bootstrap3'
                  });
                  hideProgress();
                },
        });
      }

      function isEmail(email) {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
      }

      function showPushDlg(){
        $("#dlg_modal_push").modal('show');
        setTimeout(function () {
            $("#select2_users").select2();
            $("#select2_users").select2("val", 'xx');
            $('#push_message').val("");
        }, 200);


      }

      function sendPush(){
        var sel_items = $('#select2_users').val();
        var message = $('#push_message').val();
        if(!sel_items){
          new PNotify({
              title: 'Push Notification Error',
              text: 'Please select users.',
              type: 'error',
              styling: 'bootstrap3'
          });
          return;
        }

        if(!message){
          new PNotify({
              title: 'Push Notification Error',
              text: 'Please input message.',
              type: 'error',
              styling: 'bootstrap3'
          });
          return;
        }

        // send push
        showProgress();
        setTimeout(function () {
          hideProgress();
          $("#dlg_modal_push").modal('hide');
          new PNotify({
            title: 'Push Notification',
            text: 'Send Push Notification Successfully.',
            type: 'success',
            styling: 'bootstrap3'
          });
        }, 1000);


      }


    </script>

  </body>
</html>

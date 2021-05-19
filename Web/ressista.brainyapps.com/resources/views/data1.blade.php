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

    <!-- Custom Theme Style -->
    <link href="css/custom.min.css" rel="stylesheet">
    <style media="screen">
    	.login-btn {
        margin-top: 20px!important;
        width: 100%;
        height: 50px;
    	}
    </style>
  </head>

  <body class="nav-md login">
    <div class="logo" style="padding: 40px 15px;">
      	<img src="img/icon_logo.png" alt="" style="width:60px;height:60px;"/>
    </div>
    <div class="content login-page" hidden>
        	<!-- BEGIN LOGIN FORM -->
        	<form class="login-form" action="#" method="post">
        		<h3 class="form-title">Sign In</h3>
        		<div class="alert alert-danger display-hide">
        			<button class="close" data-close="alert" onclick="$('.alert').addClass(display-hide)"></button>
        			<span>
        			Enter any username and password. </span>
        		</div>
        		<div class="form-group">
        			<!--ie8, ie9 does not support html5 placeholder, so we just show field title for that-->
        			<label class="control-label visible-ie8 visible-ie9">Username</label>
        			<input class="form-control form-control-solid placeholder-no-fix" type="text" autocomplete="off" placeholder="Username" name="username" id="username"/>
        		</div>
        		<div class="form-group">
        			<label class="control-label visible-ie8 visible-ie9">Password</label>
        			<input class="form-control form-control-solid placeholder-no-fix" type="password" autocomplete="off" placeholder="Password" name="password" id="password"/>
        		</div>
        		<div class="form-actions">
        			<button type="button" class="btn btn-success uppercase login-btn" onclick="login();">Login</button>
        		</div>
        	</form>
        	<!-- END LOGIN FORM -->
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
                    <h2>Own ADs<small></small></h2>

                    <div class="clearfix"></div>
                  </div>
                  <div class="x_content">
                    <button class="btn btn-success" style="width: 150px;margin: 10px 0px 20px;" type="button" name="button" onclick="showEditModal();">ADD</button>
                    <table id="datatable" class="table table-striped table-bordered">
                      <thead>
                        <tr>
                          <td>Name</td>
                          <td>adType</td>
                          <td>adURL</td>
                          <td>adImage</td>
                          <td>adTime</td>
                          <td>action</td>
                        </tr>
                      </thead>
                      <tbody>
                        @foreach ($data as $one)
                        <tr class="{{$one['id']}}">
                          <td >{{$one['name']}}</td>
                          <td>{{($one['adType']==1)?'Full Screen':'320*200'}}</td>
                          <td>{{$one['adURL']}}</td>
                          <td style="text-align:center">
                            <a href="{{$one['adImage']}}"><img src="{{$one['adImage']}}" alt="" style="height:30px;"></a>
                          </td>
                          <td>{{$one['adTime']}}</td>
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
     <div class="modal-backdrop fade in" style="height: 100%;opacity:0.28;background-color:rgb(253, 129, 163) !important;"></div>
     <div class="modal-dialog" style="width:45px;height:100%;margin:auto;">
       <i class="fa fa-circle-o-notch fa-spin fa-fw" aria-hidden="true" style="font-size: 44px;top: 50%;position: absolute;color: rgb(253, 129, 163);"></i>
     </div>
    </div>

    <div id="dlg_modal" class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-hidden="true">
  <div class="modal-dialog modal-mm" style="min-width: 1000px!important;">
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
          <div class="item form-group">
            <label class="control-label col-md-3 col-sm-3 col-xs-12" for="name">Name <span class="required">*</span>
            </label>
            <div class="col-md-8 col-sm-8 col-xs-12">
              <input id="name" name="name" class="form-control col-md-7 col-xs-12" required="required" type="text">
            </div>
          </div>
          <div class="item form-group">
            <label class="control-label col-md-3 col-sm-3 col-xs-12" for="name">adType <span class="required">*</span>
            </label>
            <div class="col-md-8 col-sm-8 col-xs-12">
              <!-- <input id="adType" name="adType" class="form-control col-md-7 col-xs-12" required="required" type="number"> -->
              <select class="form-control col-md-7 col-xs-12" id="adType" name="adType" onchange="onSelectType();">
                <option value=1>Full Screen</option>
                <option value=2>320*200</option>
              </select>
            </div>
          </div>
          <div class="item form-group">
            <label class="control-label col-md-3 col-sm-3 col-xs-12" for="name">adURL <span class="required">*</span>
            </label>
            <div class="col-md-8 col-sm-8 col-xs-12">
              <input id="adURL" name="adURL" class="form-control col-md-7 col-xs-12" required="required" type="text">
            </div>
          </div>
          <div class="item form-group">
            <label class="control-label col-md-3 col-sm-3 col-xs-12" for="adTime">adTime <span class="required">*</span>
            </label>
            <div class="col-md-8 col-sm-8 col-xs-12">
              <!-- <input id="adTime" name="adTime" class="form-control col-md-7 col-xs-12" required="required" type="number"> -->
              <select class="form-control col-md-7 col-xs-12" id="adTime" name="adTime">
                <option value=10>10</option>
                <option value=20>20</option>
                <option value=30>30</option>
                <option value=40>40</option>
                <option value=50>50</option>
                <option value=60>60</option>
              </select>
            </div>
          </div>
          <div class="item form-group">
            <label class="control-label col-md-3 col-sm-3 col-xs-12" for="name">adImage <span class="required">*</span>
            </label>
            <div class="col-md-8 col-sm-8 col-xs-12">
              <!-- <input id="car_detail" class="form-control col-md-7 col-xs-12" name="car_detail" required="required" type="text"> -->
              <!-- <img id="previewImg" src="" alt="" style="width: 100%; display: block;"> -->
              <input type="file"  id="file" name="file" accept="image/*">
            </div>
          </div>
          <div class="item form-group">
            <div class="container cropper">
              <div class="row">
                <div class="col-md-8">
                  <div class="img-container">
                    <img id="image" src="" alt="Picture">
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="docs-preview clearfix">
                    <div class="img-preview preview-lg" style="margin:50% auto;float: none;"></div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-primary" id="btn_ok" onclick = "saveItem()">OK</button>
        </div>
      </div>
    </form>
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

    <!-- Custom Theme Scripts -->
    <script src="js/custom.min.js"></script>

    <!-- Datatables -->
    <script>
      $(document).ready(function() {
        Metronic.init(); // init metronic core components
      	Layout.init(); // init current layout
      	Login.init();
        initDataTable();

        $(document).on('shown.bs.modal','#dlg_modal', function () {
            // alert($(".img-container").width());
            $("#image").one().cropper('init');
          })

        // initCropImage();
      });

      function initDataTable(){
        $('#datatable').dataTable();

        $('#datatable-keytable').DataTable({
          keys: true
        });

        $('#datatable-responsive').DataTable();

        $('#datatable-scroller').DataTable({
          ajax: "js/datatables/json/scroller-demo.json",
          deferRender: true,
          scrollY: 380,
          scrollCollapse: true,
          scroller: true
        });

        $('#datatable-fixed-header').DataTable({
          fixedHeader: true
        });

        var $datatable = $('#datatable-checkbox');

        $datatable.dataTable({
          'order': [[ 1, 'asc' ]],
          'columnDefs': [
            { orderable: false, targets: [0] }
          ]
        });
        $datatable.on('draw.dt', function() {
          $('input').iCheck({
            checkboxClass: 'icheckbox_flat-green'
          });
        });
      }


      function gotoTable(){
        username = $("#username").val();
        password = $("#password").val();
        if (username == '' || password == '') {
          $('.alert').removeClass('display-hide');
          $('.alert').css('display', 'block');
          return;
        }

        $('.table-page').fadeIn();
        $('.login-page').hide();
      }

      function showEditModal(){
        $('#dlg_modal').modal('show');
        initModal();
      }



      function readURL(input) {
          if (input.files && input.files[0]) {
              var reader = new FileReader();
              reader.onload = function (e) {
                  $("#previewImg").attr('src', e.target.result);
              }
              reader.readAsDataURL(input.files[0]);
        }
      }

      function login(){
        $.ajax({
                url: "{{ url('/login') }}",
                data: {
                        'uid': $('#username').val(),
                        'pwd': $('#password').val(),
                },
                method: 'get',
                success: function(res) {
                  if (res.success) {
                    gotoTable();
                    for (var i = 0; i < res.data.length; i++) {
                      importData(res.data[i]);
                    }
                    initDataTable();
                  } else {
                    new PNotify({
                        title: 'LogIn Error',
                        text: 'Invalid User Name or Password.',
                        type: 'error',
                        styling: 'bootstrap3'
                    });
                  }
                },
                error: function() {
                  new PNotify({
                      title: 'LogIn Error',
                      text: 'Invalid User Name or Password.',
                      type: 'error',
                      styling: 'bootstrap3'
                  });
                },
        });
      }
      function importData(data){
        var table = document.getElementById("datatable");
    		var row = table.insertRow(table.rows.length);
    		var td
    		td= row.insertCell(row.cells.length);
    		td.innerHTML = data.name;
    		td= row.insertCell(row.cells.length);
    		td.innerHTML = data.adType;
    		td= row.insertCell(row.cells.length);
    		td.innerHTML = data.adURL;
    		td= row.insertCell(row.cells.length);
    		td.innerHTML = data.adImage;
    		td= row.insertCell(row.cells.length);
    		td.innerHTML = data.adTime;
    		td= row.insertCell(row.cells.length);
    		row.className="vehicle-item-"+data.id;
    		td.className = 'menu-action';
    		td.innerHTML = '<a class="btn menu-icon vd_yellow" data-placement="top" data-toggle="tooltip" data-original-title="edit" onclick="dctype.editVehicleItem('+ data.id +')"> <i class="fa fa-pencil"></i> </a>' +
                        '<a class="btn menu-icon vd_red " data-placement="top" data-toggle="tooltip" data-original-title="delete" onclick="dctype.removeVehicleItem("'+data.id+'"")"><i class="fa fa-times"></i> </a>';
                      //  initDataTable();
      }

      function editItem(id){
          $('#dlg_modal').modal('show');
          $("#title_modal").text("Edit");
          $("#id").val(id);
          $("#name").val($($("."+id).children()[0]).text());
          $("#adType").val($($("."+id).children()[1]).text());
          $("#adURL").val($($("."+id).children()[2]).text());
          $("#adTime").val($($("."+id).children()[4]).text());
          $("#file").val('');
          onSelectType();
          $("#image").cropper('replace', $($("."+id+" img")).attr('src'));
      }
      function initModal(){
        $("#title_modal").text("ADD");
        $("#id").val('');
        $("#name").val('');
        $("#adURL").val('');
        $("#adTime").val(10);
        clearImage();
        $("#adType").val('1');
        onSelectType();
      }

      function clearImage(){
        $('#image').cropper('replace', '');
        // $("#image").attr('src', '');
      }

      function removeItem(id){
        $.confirm({
        text: "Do you want to remove?",
        confirm: function(button) {
          showProgress();
          $.ajax({
            url: "{{ url('/removedata') }}",
            data: {
              'id': id
            },
            method: 'get',
            success: function(res) {
              if (res.success) {
                window.location = "{{url('/data')}}";
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

      </script>
      <script>
        $(document).ready(function() {

      // function initCropImage(){
        var $image = $('#image');
        var $download = $('#download');
        var $dataX = $('#dataX');
        var $dataY = $('#dataY');
        var $dataHeight = $('#dataHeight');
        var $dataWidth = $('#dataWidth');
        var $dataRotate = $('#dataRotate');
        var $dataScaleX = $('#dataScaleX');
        var $dataScaleY = $('#dataScaleY');
        var options = {
              aspectRatio: 1242/2208,
              preview: '.img-preview',
              crop: function (e) {
                $dataX.val(Math.round(e.x));
                $dataY.val(Math.round(e.y));
                $dataHeight.val(Math.round(e.height));
                $dataWidth.val(Math.round(e.width));
                $dataRotate.val(e.rotate);
                $dataScaleX.val(e.scaleX);
                $dataScaleY.val(e.scaleY);
              }
            };


        // Tooltip
        $('[data-toggle="tooltip"]').tooltip();


        // Cropper
        $image.on({
          'build.cropper': function (e) {
            console.log(e.type);
          },
          'built.cropper': function (e) {
            console.log(e.type);
          },
          'cropstart.cropper': function (e) {
            console.log(e.type, e.action);
          },
          'cropmove.cropper': function (e) {
            console.log(e.type, e.action);
          },
          'cropend.cropper': function (e) {
            console.log(e.type, e.action);
          },
          'crop.cropper': function (e) {
            console.log(e.type, e.x, e.y, e.width, e.height, e.rotate, e.scaleX, e.scaleY);
          },
          'zoom.cropper': function (e) {
            console.log(e.type, e.ratio);
          }
        }).cropper(options);



        // Buttons
        if (!$.isFunction(document.createElement('canvas').getContext)) {
          $('button[data-method="getCroppedCanvas"]').prop('disabled', true);
        }

        if (typeof document.createElement('cropper').style.transition === 'undefined') {
          $('button[data-method="rotate"]').prop('disabled', true);
          $('button[data-method="scale"]').prop('disabled', true);
        }


        // Download
        // if (typeof $download[0].download === 'undefined') {
        //   $download.addClass('disabled');
        // }


        // Options
        $('.docs-toggles').on('change', 'input', function () {
          var $this = $(this);
          var name = $this.attr('name');
          var type = $this.prop('type');
          var cropBoxData;
          var canvasData;

          if (!$image.data('cropper')) {
            return;
          }

          if (type === 'checkbox') {
            options[name] = $this.prop('checked');
            cropBoxData = $image.cropper('getCropBoxData');
            canvasData = $image.cropper('getCanvasData');

            options.built = function () {
              $image.cropper('setCropBoxData', cropBoxData);
              $image.cropper('setCanvasData', canvasData);
            };
          } else if (type === 'radio') {
            options[name] = $this.val();
          }

          $image.cropper('destroy').cropper(options);
        });


        // Methods
        $('.docs-buttons').on('click', '[data-method]', function () {
          var $this = $(this);
          var data = $this.data();
          var $target;
          var result;

          if ($this.prop('disabled') || $this.hasClass('disabled')) {
            return;
          }

          if ($image.data('cropper') && data.method) {
            data = $.extend({}, data); // Clone a new one

            if (typeof data.target !== 'undefined') {
              $target = $(data.target);

              if (typeof data.option === 'undefined') {
                try {
                  data.option = JSON.parse($target.val());
                } catch (e) {
                  console.log(e.message);
                }
              }
            }

            result = $image.cropper(data.method, data.option, data.secondOption);

            switch (data.method) {
              case 'scaleX':
              case 'scaleY':
                $(this).data('option', -data.option);
                break;

              case 'getCroppedCanvas':
                if (result) {

                  // Bootstrap's Modal
                  $('#getCroppedCanvasModal').modal().find('.modal-body').html(result);

                  if (!$download.hasClass('disabled')) {
                    $download.attr('href', result.toDataURL());
                  }
                }

                break;
            }

            if ($.isPlainObject(result) && $target) {
              try {
                $target.val(JSON.stringify(result));
              } catch (e) {
                console.log(e.message);
              }
            }

          }
        });



        // Keyboard
        $(document.body).on('keydown', function (e) {
          if (!$image.data('cropper') || this.scrollTop > 300) {
            return;
          }

          switch (e.which) {
            case 37:
              e.preventDefault();
              $image.cropper('move', -1, 0);
              break;

            case 38:
              e.preventDefault();
              $image.cropper('move', 0, -1);
              break;

            case 39:
              e.preventDefault();
              $image.cropper('move', 1, 0);
              break;

            case 40:
              e.preventDefault();
              $image.cropper('move', 0, 1);
              break;
          }
        });

        // Import image
        var $inputImage = $('#file');
        var URL = window.URL || window.webkitURL;
        var blobURL;
        if (URL) {
          $inputImage.change(function () {
            var files = this.files;
            var file;
            if (!$image.data('cropper')) {
              return;
            }
            if (files && files.length) {
              file = files[0];
              if (/^image\/\w+$/.test(file.type)) {
                blobURL = URL.createObjectURL(file);
                console.log(blobURL);
                $image.one('built.cropper', function () {
                  // Revoke when load complete
                  URL.revokeObjectURL(blobURL);
                }).cropper('reset').cropper('replace', blobURL);
                // $inputImage.val('');
              } else {
                window.alert('Please choose an image file.');
              }
            }
          });
        } else {
          $inputImage.prop('disabled', true).parent().addClass('disabled');
        }

      });
      function onSelectType(){
        if (($("#adType").val()) == 1) {
          $('#image').cropper('setAspectRatio', 1242/2208);
        } else {
          $('#image').cropper('setAspectRatio', 320/200);
        }
      }

      function saveItem(){
        error = '';
        if ($('#name').val() == '') {
          error = 'Name is required field.';
        }
        else if ( $('#adType').val() == '') {
          error = 'adType is required field.';
        }
        else if ( $('#adURL').val() == '') {
          error = 'adURL is required field.';
        }
        else if ( $('#adTime').val() == '') {
          error = 'adTime is required field.';
        }
        else if ( $('#id').val() == '' && $('#file').val() == '') {
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
        var fileData = $('#image').cropper('getCroppedCanvas').toDataURL();
        if (fileData.length > 2000000) {
          new PNotify({
            title: 'Save Data Error',
            text: 'Your File Size is too big for upload. Please Resize',
            type: 'error',
            styling: 'bootstrap3'
          });
          hideProgress();
          return;
        }
        $.ajax({
                url: "{{ url('/savedata') }}",
                data: {
                        '_token': '{{ csrf_token() }}',
                        'id': $('#id').val(),
                        'name': $('#name').val(),
                        'adType': $('#adType').val(),
                        'adURL': $('#adURL').val(),
                        'adTime': $('#adTime').val(),
                        'adFileData': fileData,
                },
                method: 'post',
                success: function(res) {
                  if (res.success) {
                    window.location = "{{url('/data')}}";
                  } else {
                    new PNotify({
                      title: 'Save Data Error',
                      text: 'Please check your Internet status.',
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


    </script>
    <!-- /Datatables -->
  </body>
</html>

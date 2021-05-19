@extends('admin.frame')

@section('page-title')
    <div class="title-content">
        <i class="fa fa-users "></i> User Detail
    </div>
@endsection

@section('page-content')
  <style>
    .user-link{
      color:black!important;
    }
    .x_panel {
      background-color: #f5f6f8;
      border: 1px solid lightgray;
      border-radius: 5px;
    }
  </style>

<div class="" role="main">
  <div class="">

    <div class="row">
      <div class="col-md-12 col-sm-12 col-xs-12">
        <div class="col-md-3 col-sm-3 col-xs-12"></div>
        <div class="col-md-6 col-sm-6 col-xs-12">
          <div class="x_panel" >

            <div class="x_content step_1" style="">
              <div class="col-md-12 col-sm-12 col-xs-12" style="margin:15px 0px;">
                  <div class="col-md-12 col-sm-12 col-xs-12 text-center" style="margin-top:60px;">
                    <img src="{{url('/img/avatar.jpg')}}" alt="..." class="img-circle img-user-avatar">
                  </div>
                  <div class="col-md-12 col-sm-12 col-xs-12 text-center">
                    <h3 class="user-name"></h3>
                    <h4 class="user-email"></h4>
                    <h5 class="user-type" style="color:darkblue;"></h5>
                  </div>
              </div>
              <div class="col-md-12 col-sm-12 col-xs-12" style="padding:10px;text-align: center;margin:40px 0px;">
                <button type="button" class="btn btn-danger back-red btn-banned" style="width: 200px; display: none;" id="btn_ban" data-value='true' >BAN THIS USER</button>
                <button type="button" class="btn btn-danger back-red btn-banned" style="width: 200px; display: none;" id="btn_unban" data-value=''>UNBAN THIS USER</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>



@endsection

@section('script-content')
@include('firebase')
<script>
var step = 0;
$(document).ready(function() {
  fetchUserInfo();
});

function fetchUserInfo() {
  showProgress();
  get_fb_doc('users', '{{$uid}}', function(res) {
    hideProgress();
    console.log(res);
      if (res.success) {
        var user = res.data;
        user.is_driver = user.driver || user.isDriver;
        user.avatar_image = user.image || '/img/avatar.jpg';

        $('.img-user-avatar').attr('src', user.avatar_image);
        $('.user-name').text(user.displayName??'');
        $('.user-email').text(user.email);
        $('.user-type').text(user.is_driver ? 'Driver' : 'Customer');

        if (user.isBanned) {
          $('#btn_ban').hide();
          $('#btn_unban').show();
        } else {
          $('#btn_ban').show();
          $('#btn_unban').hide();
        }
      } else {
        return  new PNotify({
            title: 'Error',
            text: 'Fetch user info error',
            type: 'error',
            styling: 'bootstrap3'
        });
      }

    })
}

$('.btn-banned').on('click', function() {
  var isBanned = $(this).data('value') ? true : false;
  console.log(isBanned);
  $.confirm({
    text: "Are you sure?",
    confirm: function(button) {
                  showProgress();
                  update_fb_doc('users', '{{$uid}}', {isBanned}, function(success) {
                    hideProgress();
                      if (success) {
                        new PNotify({
                            title: 'Success',
                            text: 'User banned successfully.',
                            type: 'success',
                            styling: 'bootstrap3'
                        });
                        setTimeout(function() {
                          if (isBanned) {
                            location.href = "{{url('/banned-users')}}";
                          } else {
                            location.href = "{{url('/all-users')}}";
                          }
                        }, 500);
                      } else {
                        new PNotify({
                            title: 'Error',
                            text: 'Set banned error.',
                            type: 'error',
                            styling: 'bootstrap3'
                        });
                      }

                  })

    }
  });
})


function goBack(){
  step--;
  if(step < 0) {
    showProgress();
    location.href = "{{url('/reports')}}";
  }
  $('.step_0').show();
  $('.step_1').hide();
}

function goNext(){
  step = 1;
  $('.step_0').hide();
  $('.step_1').show();

}

function banUser(objectId, isBan){

    $.confirm({
    text: "Are you sure?",
    confirm: function(button) {
               showProgress();
               $.ajax({
                      url: "{{ url('/ban-user') }}",
                      data: {
                              '_token': '{{ csrf_token() }}',
                              'user_id': objectId,
                              'action': isBan,
                      },
                      method: 'post',
                      success: function(res) {
                        hideProgress();
                        if (res.success) {
                          new PNotify({
                              title: 'Success',
                              text: 'User banned successfully.',
                              type: 'success',
                              styling: 'bootstrap3'
                          });
                          setTimeout(function() {
                            if (isBan) {
                              location.href = "{{url('/banned-users')}}";
                            } else {
                              location.href = "{{url('/all-users')}}";
                            }
                          }, 500);
                        } else {
                          new PNotify({
                              title: 'Error',
                              text: 'Check Internet Status.',
                              type: 'error',
                              styling: 'bootstrap3'
                          });
                          // window.location.href = "{{url('/logout')}}";
                        }
                      },
                      error: function() {
                        // window.location.href = "{{url('/logout')}}";
                        new PNotify({
                            title: 'Error',
                            text: 'Check Internet Connection.',
                            type: 'error',
                            styling: 'bootstrap3'
                        });
                        hideProgress();
                      },
              });
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

function deleteReport(objectId){

    $.confirm({
    text: "Are you sure?",
    confirm: function(button) {
               showProgress();
               $.ajax({
                      url: "{{ url('/delete-report') }}",
                      data: {
                              '_token': '{{ csrf_token() }}',
                              'objectId': objectId,
                              'action': true,
                      },
                      method: 'post',
                      success: function(res) {
                        if (res.success) {
                          new PNotify({
                              title: 'Success',
                              text: 'Report deleted successfully.',
                              type: 'success',
                              styling: 'bootstrap3'
                          });
                          window.location.href = "{{url('/reports')}}";
                        } else {
                          new PNotify({
                              title: 'Error',
                              text: 'Check Internet Status.',
                              type: 'error',
                              styling: 'bootstrap3'
                          });
                          window.location.href = "{{url('/logout')}}";
                        }
                      },
                      error: function() {
                        window.location.href = "{{url('/logout')}}";
                        new PNotify({
                            title: 'Error',
                            text: 'Check Internet Connection.',
                            type: 'error',
                            styling: 'bootstrap3'
                        });
                        hideProgress();
                      },
              });
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

</script>
@endsection

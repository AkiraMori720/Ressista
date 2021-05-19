@extends('admin.frame')

@section('page-title')
    <div class="title-content">
        <i class="fa fa-lock"></i> Change Password
    </div>
    <div class="inner-addon search-box right-addon">
        <button id="saveBtn" class="btn btn-warning back-black" style="margin: 0;background-color: #bab478;color: white;font-size: 1.7rem;font-weight: bold;border-radius: 10px !important;padding: 4px 14px;">Save</button>
    </div>
@endsection

@section('page-content')
  <style>
    .user-link{
      color:black!important;
    }
    .round-input{
      height: 43px;
      border: 1px solid #dde3ec;
      border-radius: 10px;
    }

    .form-control.form-control-solid{
      border: 1px solid gray;
    background: none;
    }
    input {
      color: black !important;
    }
  </style>

<div class="" role="main">
  <div class="">

    <div class="row">
      <div class="col-md-12 col-sm-12 col-xs-12">
        <div class="col-md-2 col-sm-2 col-xs-12"></div>
        <div class="col-md-8 col-sm-8 col-xs-12">
          <div class="col-md-12 col-sm-12 col-xs-12" style="margin: 20px 0px;">
          </div>
          <div class="x_panel" >

            <div class="x_content" style="padding: 25px 50px;">
              <form id="frmPassword">
              <div class="form-group">
                <label class="control-label">Current Password</label>
                <input class="form-control form-control-solid placeholder-no-fix round-input pwd-input" type="password" autocomplete="off" placeholder="" name="pwd" id="oldpassword" required/>
              </div>
              <div class="form-group">
                <label class="control-label">New Password</label>
                <input class="form-control form-control-solid placeholder-no-fix round-input pwd-input" type="password" autocomplete="off" placeholder="" name="pwd" id="newpassword" required/>
              </div>
              <div class="form-group">
                <label class="control-label">Password</label>
                <input class="form-control form-control-solid placeholder-no-fix round-input pwd-input" type="password" autocomplete="off" placeholder="" name="pwd" id="confirmpassword" required/>
              </div>
              </form>
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
  $('#saveBtn').click(function(e) {
    e.preventDefault();
    if($('#newpassword').val() != $('#confirmpassword').val()) {
      return  new PNotify({
              title: 'Error',
              text: 'Confirm password not matched.',
              type: 'error',
              styling: 'bootstrap3'
          });
    }
    savePassword();
  })

  function savePassword(){
    showProgress();
    var password = $('#oldpassword').val();
    firebase.auth().signInWithEmailAndPassword('{{Session::get("user_email")}}', password).catch(function(error) {
        console.log(error);
        var errorCode = error.code;
        var errorMessage = error.message;
        new PNotify({
              title: 'Error',
              text: 'Invalid current password.',
              type: 'error',
              styling: 'bootstrap3'
        });
        hideProgress();
      }).then(function(res) {
        if (!res) return;
        firebase.auth().currentUser.updatePassword($('#newpassword').val()).then(function(){
          hideProgress();
          new PNotify({
              title: 'Success',
              text: 'Updated password successfully.',
              type: 'success',
              styling: 'bootstrap3'
          });
          $('.pwd-input').val('');
        }).catch(function(error){
          console.log(error);
          hideProgress();
          var errorCode = error.code;
          var errorMessage = error.message;
          new PNotify({
              title: 'Error',
              text: error.message,
              type: 'error',
              styling: 'bootstrap3'
          });
        });
      });

  }



</script>
@endsection

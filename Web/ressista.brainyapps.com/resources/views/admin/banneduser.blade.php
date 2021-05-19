@extends('admin.frame')

@section('page-title')
    <div class="title-content">
        <i class="fa fa-user-times "></i> Banned Users
    </div>
    <div class="inner-addon search-box right-addon">
        <input type="text" class="form-control" style=" " name="search_query" id="txtSearch" placeholder="Search" onchange="filterResult(this);" />
        <!-- <i class="fa fa-times" style="right: 0; top: 0;" onclick="clearSearch()"></i> -->
    </div>
@endsection

@section('page-content')
  <style>
    .user-link{
      color:black!important;
    }
	.div-user {
    border-bottom: 1px solid lightgray;
    padding: 15px 25px;
    margin-top: 5px;
	}
	/* enable absolute positioning */
	.inner-addon {
		position: relative;
	}

	/* style icon */
	.inner-addon .fa {
	  position: absolute;
	  padding: 8px 15px;
	}

	/* align icon */
	.left-addon .glyphicon  { left:  0px;}

	/* add padding  */
	.left-addon input  { padding-left:  30px; }
	.right-addon input {
    padding: 0 10px;
    background-color: #f5f6f8  !important;
    border: solid 1px lightgray;
    border-radius: 5px;;
  }


  </style>

  <script type="text/javascript">
	function filterResult(elem) {
		// $('.div-user').each(function () {
		// 	if ($(this).text().toUpperCase().indexOf($(elem).val().toUpperCase()) >= 0)
		// 	{
		// 		$(this).show();
		// 	}
		// 	else
		// 	{
		// 		$(this).hide();
		// 	}
		// });
	}
  </script>

<div class="" role="main">
  <div class="">

    <div class="row">
      <div class="col-md-12 col-sm-12 col-xs-12">
        <div class="col-md-2 col-sm-2 col-xs-12"></div>
        <div class="col-md-8 col-sm-8 col-xs-12">
          <div style="padding: 3px 20px;">
            <table style="width:100%">
              <!-- <tr >
                <td style="width:60%">USER NAME</td>
                <td style="width:40%;text-align:right">USER TYPE</td>
              </tr> -->
            </table>
          </div>

          <div class="x_panel" style="background-color: #f5f6f8;padding-left: 10px;padding-right: 10px;">

            <div class="x_content user-container" style="background-color: white;border: 1px solid lightgray;border-radius: 5px;    padding-bottom: 0px;">
              <div id="no_data" style="padding: 8px 0; text-align: center;display:none;">No User</div>
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

var all_users = [
    // id, name, photo, driver
  ];

$(document).ready(function() {
  fetchUsers();

});

function fetchUsers(){
  showProgress();
  get_fb_collection('users', function(users) {
    hideProgress();
    users.forEach(user => {
      if (!user.isAdmin && user.isBanned) {
        user.name =  (user.firstName && user.lastName) ? (user.firstName || '') + ' ' + (user.lastName || '') : user.displayName;

        user.is_driver = user.driver || user.isDriver;
        user.avatar_image = user.image || '/img/avatar.jpg';
        all_users.push(user);


        var user_html = `<a href="{{url('/user-detail')}}?id=`+user.id+`">
                  <div class="div-user user-item user-`+user.id+`">
                      <img src="`+user.avatar_image+`" alt="..." class="img-circle" style="margin:auto;height: 30px;width: 30px;border: 2px solid #1abb9c;">
                      <label style="padding-top:10px; margin-left: 20px;"><strong>`+ (user.displayName??'') +` (` + user.email + `)</strong></label>
                      <div style="float: right;margin-top: 10px;">
                        `+(user.is_driver ? 'Driver' : 'Customer')+`
                      </div>
                  </div>
                </a>`;
        $('.user-container').prepend(user_html);
      }
    });
    console.log(all_users);
    if (all_users.length == 0) {
      $('#no_data').show();
    } else {
      $('#no_data').hide();
    }
  })
}


function clearSearch() {
    $('#txtSearch').val("");
    changeSearch();
}

$('#txtSearch').keyup(changeSearch);
$('#txtSearch').change(changeSearch);

  function changeSearch(){
    var search = $('#txtSearch').val().toLowerCase();
        if(search == ''){
            $('.no-item').hide();
            $('.user-item').show();
            if(all_users.length == 0) {
                $('#no_data').show();
            } else {
                $('#no_data').hide();
            }
            return;
        }

        show_count = 0;
        for (var index = 0; index < all_users.length; index++) {
            var user = all_users[index];
            var name = (user.displayName && user.displayName.toLowerCase()) ?? '';
            var email = user.email.toLowerCase();
            if(name.includes(search) || email.includes(search)){
                $('.user-'+user.id).show();
                show_count ++;
            } else {
                $('.user-'+user.id).hide();
            }
        }

        if(show_count == 0) {
            $('.no-item').show();
            $('#no_data').show();
        } else {
            $('.no-item').hide();
            $('#no_data').hide();
        }
  }
</script>

<script>
  $(document).ready(function() {

  });
  function banUser(btn, objectId){

    $.confirm({
    text: "Are you sure?",
    confirm: function(button) {
               showProgress();
               $.ajax({
                      url: "{{ url('/ban-user') }}",
                      data: {
                              '_token': '{{ csrf_token() }}',
                              'user_id': objectId,
                              'action': false,
                      },
                      method: 'post',
                      success: function(res) {
                        hideProgress();
                        if (res.success) {
                          new PNotify({
                              title: 'Success',
                              text: 'User lift banned successfully.',
                              type: 'success',
                              styling: 'bootstrap3'
                          });
                          $(btn).parent().remove();
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


</script>
@endsection

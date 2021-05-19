@extends('admin.frame')

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
    .location-photo {
      height: 150px;
    }
  </style>

<div class="row">
      <div class="col-md-12 col-sm-12 col-xs-12">
        <div class="col-md-3 col-sm-3 col-xs-12"></div>
        <div class="col-md-6 col-sm-6 col-xs-12">
          <div class="col-md-12 col-sm-12 col-xs-12" style="margin: 0px 0px;"> 
          </div>
          <div class="x_panel" >
          <div style="width: 100%;text-align:center;">
                <div class="location-photo">
                  @if ($location->photo)
                    @if (substr( $location->photo, 0, 4 ) === "http")
                      <img src="{{$location->photo}}" alt="" style="height: 100%;">
                    @else
                      <img src="https://maps.googleapis.com/maps/api/place/photo?maxwidth=500&photoreference={{$location->photo}}&key=AIzaSyDn7L4j4_aIHjqalvcgyUr42eMKmdIAUHA" alt="" style="height: 100%;">
                    @endif
                  @else
                    <img src="/img/default-image.png" alt="" style="height: 100%;">
                  @endif
                </div>
                <div style="margin-top: 10px;">
                  <input type="file" id="imgFile" class="hidden" accept="image/*">
                  <canvas id="canvas" style="display:none;"></canvas>
                  <button class="btn btn-primary" onclick="$('#imgFile').click()">Update</button>
                </div>
           </div>
            <div class="x_content" style="padding: 25px 50px;">
              <form id="frmPassword" method="post" enctype="multipart/form-data">
                {{csrf_field()}}
              <input type="hidden" name="id" value="{{$location->getObjectId()}}">
              <input type="file" id="imgFile" class="hidden" name="image" accept="image/*">
              <div class="form-group">
                <label class="control-label">Title</label>
                <input class="form-control form-control-solid placeholder-no-fix round-input" name="title" type="text" autocomplete="off" placeholder="" id="title" value="{{$location->title}}" required/>
              </div>
              <div class="form-group">
                <label class="control-label">Address</label>
                <input class="form-control form-control-solid placeholder-no-fix round-input" name="address" type="text" autocomplete="off" placeholder="" id="autocomplete" value="{{$location->address}}" required/>
              </div>
              <div class="form-group">
                <label class="control-label">Website</label>
                <input class="form-control form-control-solid placeholder-no-fix round-input" name="website" type="text" autocomplete="off" placeholder="" id="website" value="{{$location->website}}" required/>
              </div>
              <div class="form-group">
                <label class="control-label">Description</label>
                <input class="form-control form-control-solid placeholder-no-fix round-input" name="description" type="text" autocomplete="off" placeholder="" id="description" value="{{$location->description}}" required/>
              </div>
              <div class="form-actions">
                <button type="submit" class="btn btn-warning back-black login-btn" style=" background-color: #00ff00;color: white;font-size: 1.7rem;font-weight: bold;border-radius: 10px !important;">Save</button>
              </div>
              </form>
              {{-- <div class="form-actions">
                <button type="button" class="btn btn-warning back-black login-btn" onclick="delete()" style=" background-color: #00ff00;color: white;font-size: 1.7rem;font-weight: bold;border-radius: 10px !important;">Delete</button>
              </div> --}}
            </div>
          </div>
        </div>
      </div>  
    </div>
  </div>
</div>


@endsection

@section('script-content')
{{-- <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDRuIUUQooDGGmoWL4VmZqKU-nyplTizIQ&libraries=places&callback=initAutocomplete" async defer></script> --}}
<script>
var placeSearch, autocomplete;

var componentForm = {
  street_number: 'short_name',
  route: 'long_name',
  locality: 'long_name',
  administrative_area_level_1: 'short_name',
  country: 'long_name',
  postal_code: 'short_name'
};

function initAutocomplete() {
  // Create the autocomplete object, restricting the search predictions to
  // geographical location types.
  autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('autocomplete'), {types: ['geocode']});

  // Avoid paying for data that you don't need by restricting the set of
  // place fields that are returned to just the address components.
  autocomplete.setFields(['address_component']);

  // When the user selects an address from the drop-down, populate the
  // address fields in the form.
  // autocomplete.addListener('place_changed', fillInAddress);
}

function fillInAddress() {
  // Get the place details from the autocomplete object.
  var place = autocomplete.getPlace();

  for (var component in componentForm) {
    document.getElementById(component).value = '';
    document.getElementById(component).disabled = false;
  }

  // Get each component of the address from the place details,
  // and then fill-in the corresponding field on the form.
  for (var i = 0; i < place.address_components.length; i++) {
    var addressType = place.address_components[i].types[0];
    if (componentForm[addressType]) {
      var val = place.address_components[i][componentForm[addressType]];
      document.getElementById(addressType).value = val;
    }
  }
}

// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      var circle = new google.maps.Circle(
          {center: geolocation, radius: position.coords.accuracy});
      autocomplete.setBounds(circle.getBounds());
    });
  }
}

$('#imgFile').on('change', function() {
	var input = this;
	if (input.files && input.files[0]) {
	    var reader = new FileReader();
	    reader.onload = function (e) {
	        $(".location-photo img").attr('src', e.target.result);
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
	        tmpCtx2.drawImage(this,0,0);
	        // var fullQuality = canvas.toDataURL('image/jpeg', 0.9);
	    };
	    img.src = window.URL.createObjectURL(file);
	}

	return;
})
</script>
@endsection

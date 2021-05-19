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
  </style>

<div class="row">
      <div class="col-md-12 col-sm-12 col-xs-12">
        <div class="col-md-3 col-sm-3 col-xs-12"></div>
        <div class="col-md-6 col-sm-6 col-xs-12">
          <div class="col-md-12 col-sm-12 col-xs-12" style="margin: 0px 0px;"> 
          </div>
          <div class="x_panel" >
          <div style="width: 100%;height:120px;text-align:center;">
                <img src="{{$movie->photo!=null?$movie->photo->getURL():url('/img/default-image.png')}}" alt="..." style="margin:auto;height: 100%;">
           </div>
            <div class="x_content" style="padding: 25px 50px;">
              <form id="frmPassword">
                  <div class="form-group">
                    <label class="control-label">Title</label>
                    <input class="form-control form-control-solid placeholder-no-fix round-input" type="text" autocomplete="off" placeholder="" id="title" value="{{$movie->title}}"/>
                  </div>
                  <div class="form-group">
                    <label class="control-label">Year</label>
                    <input class="form-control form-control-solid placeholder-no-fix round-input" type="number_format" autocomplete="off" placeholder="" id="year" value="{{$movie->Year}}"/>
                  </div>
                  <div class="form-group">
                    <label class="control-label">Description</label>
                    <input class="form-control form-control-solid placeholder-no-fix round-input" type="text" autocomplete="off" placeholder="" id="description" value="{{$movie->description}}"/>
                  </div>
              </from>
              <div class="form-actions">
                <button type="button" class="btn btn-warning back-black login-btn" onclick="save()" style=" background-color: #00ff00;color: white;font-size: 1.7rem;font-weight: bold;border-radius: 10px !important;">Save</button>
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
<script>
$(document).ready(function(){

});
function save(){
  location.href = "{{url('/locations')}}";
  return;
}
</script>
@endsection

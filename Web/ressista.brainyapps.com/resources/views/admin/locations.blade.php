@extends('admin.frame')

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
  </script>

<div class="" role="main">
  <div class="">

    <div class="row">
      <div class="col-md-12 col-sm-12 col-xs-12">
        <div class="col-md-2 col-sm-2 col-xs-12"></div>
        <div class="col-md-8 col-sm-8 col-xs-12">
          <div class="col-md-12 col-sm-12 col-xs-12" style="margin: 20px 0px; text-align: center;"> 
            <label style="width: 100%;border-bottom: 1px solid #3f4c58; position: absolute; top: 1rem; left: 0;"></label>
            <label style="padding: 0px 10px; background-color: white;color:black; margin-bottom: 20px; position: relative;">LOCATIONS</label>
            <div class="inner-addon right-addon">
              <input type="text" class="form-control" style=" " name="search_query" id="txtSearch" placeholder="Search" onchange="filterResult(this)" value="{{$query}}"/>
              <!-- <i class="fa fa-times" style="right: 0; top: 0;" onclick="clearSearch()"></i> -->
		      	</div>
          </div>
          
          <div class="text-right" style="padding-right: 5px;">
            <a href="/location-detail?id=" class="btn btn-primary">Add Location</a>
          </div>

          <div style="padding: 3px 20px;">
            <table style="width:100%">
              <!-- <tr >
                <td style="width:60%">USER NAME</td>
                <td style="width:40%;text-align:right">USER TYPE</td>
              </tr> -->
            </table>
          </div>

          <div class="x_panel" style="background-color: white;padding-left: 10px;padding-right: 10px;">

            <div class="x_content" style="background-color: #f5f6f8;border: 1px solid lightgray;border-radius: 5px;    padding-bottom: 0px;">

              @foreach($locations as $location)
              <a href="{{url('/location-detail')}}?id={{$location->getObjectId()}}">
                <div style="display: flex;padding: 10px;    border-bottom: 1px solid #d4d4d4;">
                  <div style="width: 80px;height:60px;overflow:hidden">
                    @if ($location->photo)
                      @if (substr( $location->photo, 0, 4 ) === "http")
                        <img src="{{$location->photo}}" alt="" style="width: 100%;">
                      @else
                        <img src="https://maps.googleapis.com/maps/api/place/photo?maxwidth=500&photoreference={{$location->photo}}&key=AIzaSyDn7L4j4_aIHjqalvcgyUr42eMKmdIAUHA" alt="" style="width: 100%;">
                      @endif
                    @else
                      <img src="url('/img/default-image.png')" alt="" style="height: 100%;">
                    @endif
                  </div>
                  <div style="font-size: 20px;padding-left: 10px;">
                    {{$location->title}}
                    <div style="    font-size: 13px;color: gray;">
                      {{$location->address}}
                    </div>
                  </div>
                </div>
              </a>
              @endforeach
            </div>

            <nav aria-label="Page navigation example">
                <ul class="pagination">
                  <li class="page-item page-prev">
                    <a class="page-link" href="javascript:;" aria-label="Previous">
                      <span aria-hidden="true">&laquo;</span>
                      <span class="sr-only">Previous</span>
                    </a>
                  </li>
                    <li class="page-item go-page"><a class="page-link" href="?page=1">1</a></li>
                    <li class="page-item go-page"><a class="page-link" href="?page=2">2</a></li>
                    <li class="page-item go-page"><a class="page-link" href="?page=3">3</a></li>
                    <li class="page-item go-page"><a class="page-link" href="?page=4">4</a></li>
                    <li class="page-item go-page"><a class="page-link" href="?page=5">5</a></li>
                    <li class="page-item go-page"><a class="page-link" href="?page=6">6</a></li>
                  
                  <li class="page-item page-next">
                    <a class="page-link" href="javascript:;" aria-label="Next">
                      <span aria-hidden="true">&raquo;</span>
                      <span class="sr-only">Next</span>
                    </a>
                  </li>
                </ul>
              </nav>
          </div>
        </div>
      </div>  
    </div>
  </div>
</div>



@endsection

@section('script-content')
<script>

var total_pages = parseInt('{{$total_pages}}');
var current_page = parseInt('{{$current_page}}');

var all_locations = [
    
  ];

$(document).ready(function() {
  
  if (all_locations.length == 0) {
    $('#no_data').show();
  } else {
    $('#no_data').hide();
  }
  init_pagination();
});





$('#txtSearch').keyup(inputSearch);

function inputSearch(event) {
  if (event.keyCode == 13) {
    var search = $('#txtSearch').val().toLowerCase();
    var url = new URL(location.origin + location.pathname);
    url.searchParams.append('query', search);
    location.href = url.href;
  }
}

  function init_pagination() {
    page_start = current_page - 5;
    if (page_start < 1) page_start = 1;

    page_end = page_start + 9;
    if (page_end > total_pages) page_end = total_pages;

    refresh_pagination(page_start, page_end)
  }

  function refresh_pagination(start, end) {
    $('.page-item.go-page').remove();
    for (let index = start; index <= end; index++) {
      var html = `<li class="page-item go-page `+(index == current_page ? 'active':'')+`" data-index="`+index+`"><a class="page-link" href="?page=`+index+`">`+index+`</a></li>`;
      $('.page-next').before(html);
    }
  }

  $('.page-item.page-prev').on('click', function() {
    var cur_start = $('.page-item.go-page:first').data('index');
    var page_start = cur_start - 10;
    if (page_start < 1) page_start = 1;

    page_end = page_start + 9;
    if (page_end > total_pages) page_end = total_pages;

    refresh_pagination(page_start, page_end)
  })
  $('.page-item.page-next').on('click', function() {
    var cur_end = $('.page-item.go-page:last').data('index');
    page_end = cur_end + 9;
    if (page_end > total_pages) page_end = total_pages;

    var page_start = page_end - 9;
    if (page_start < 1) page_start = 1;
    refresh_pagination(page_start, page_end)
  })

</script>
@endsection

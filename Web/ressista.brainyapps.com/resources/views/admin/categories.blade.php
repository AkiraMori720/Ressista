@extends('admin.frame')

@section('page-title')
    <div class="title-content">
        <i class="fa fa-list "></i> Categories
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

                <div class="x_content category-container" style="background-color: white;border: 1px solid lightgray;border-radius: 5px;    padding-bottom: 0px;">

                  <div id="no_data" style="padding: 12px; text-align: center;display:none;">Not Found Category</div>
                </div>



              <div class="text-right" style="margin-right: 5px;">
                  <a href="javascript:;" class="btn btn-primary btn-add-category" style="margin-top: 8px">Add Category</a>
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


var all_categories = [];

$(document).ready(function() {
  fetchCategories();
});


function fetchCategories(){
  showProgress();
  get_fb_collection('categories', function(categories) {
    hideProgress();
    let category_list = categories.sort((a, b) =>  a.order - b.order);
    console.log(category_list);
    all_categories = [];
      category_list.forEach(category => {
      category.search = category.title;
      all_categories.push(category);

      var category_html = `
              <div class="category-item category-`+category.id+`" data-id="`+category.id+`" data-name="`+category.title+`">
                <div style="display: flex;padding: 10px;    border-bottom: 1px solid #d4d4d4;">
                  <div style="font-size: 20px;padding-left: 10px; flex: 1;"><a class="btn-update-category" href="javascript:;" >
                    `+category.title+`  <i class="fa fa-pencil"></i>
                  </div>
                  </a>
                  <button type="button" class="btn btn-danger btn-delete-category"><i class="fa fa-trash"></i> Delete</button>
                </div>
              </div>
      `;
      $('.category-container').append(category_html);
    });

    $('.btn-delete-category').on('click', function() {
      var category_id = $(this).closest('.category-item').attr('data-id')
      $.confirm({
        text: "Are you sure to delete this category?",
        confirm: function(button) {
          showProgress();
          delete_fb_doc('categories', category_id, function(success) {
            hideProgress();
            if (!success) return alert('Delete category error.');
            $('.category-'+category_id).remove();
          })
        }
      });
    })

    $('.btn-update-category').on('click', function() {
      var category_id = $(this).closest('.category-item').attr('data-id');
      var org_name = $(this).closest('.category-item').attr('data-name');
      var category_name = prompt('Please input the Category Name', org_name);
      if (category_name) {
        showProgress();
        update_fb_doc('categories', category_id, {title: category_name}, function() {
          location.reload();
        })
      }
    })

  })
}

$('.btn-add-category').on('click', function() {
  var category = prompt('Please input the Category Name');
  if (category) {
    showProgress();
    let order = 1;
    all_categories.forEach(category => { if(category.order??1 > order) { order = category.order}})
    add_fb_doc('categories', {order: order + 1, title: category}, function() {
      location.reload();
    })
  }
})


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
            $('.category-item').show();
            if(all_categories.length == 0) {
                $('#no_data').show();
            } else {
                $('#no_data').hide();
            }
            return;
        }

        show_count = 0;
        for (var index = 0; index < all_categories.length; index++) {
            var category = all_categories[index];
            var category_search = category.search.toLowerCase();
            if(category_search.includes(search)){
                $('.category-'+category.id).show();
                show_count ++;
            } else {
                $('.category-'+category.id).hide();
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
@endsection

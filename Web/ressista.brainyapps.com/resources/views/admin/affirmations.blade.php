@extends('admin.frame')

@section('page-title')
    <div class="title-content">
        <i class="fa fa-cubes"></i> Daily Affirmation/Health Tips
    </div>
    <div class="inner-addon search-box right-addon">
        <input type="text" class="form-control" style=" " name="search_query" id="txtSearch" placeholder="Search"
               onchange="filterResult(this);"/>
        <!-- <i class="fa fa-times" style="right: 0; top: 0;" onclick="clearSearch()"></i> -->
    </div>
@endsection

@section('page-content')
    <style>
        .user-link {
            color: black !important;
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
        .left-addon .glyphicon {
            left: 0px;
        }

        /* add padding  */
        .left-addon input {
            padding-left: 30px;
        }

        .right-addon input {
            padding: 0 10px;
            background-color: #f5f6f8 !important;
            border: solid 1px lightgray;
            border-radius: 5px;;
        }

        .btn-delete-affirmation {
            background-color: #8d8845;
            color: white;
            font-size: 1.2rem;
            font-weight: bold;
            border-radius: 16px !important;
        }

        .table-cell{
            margin: 6px 0;
        }
    </style>

    <script type="text/javascript">
    </script>

    <div class="" role="main">
        <div class="">

            <div class="row">
                <div class="col-md-12 col-sm-12 col-xs-12">
                    <div style="padding: 3px 20px;">
                        <table style="width:100%">
                            <!-- <tr >
                              <td style="width:60%">USER NAME</td>
                              <td style="width:40%;text-align:right">USER TYPE</td>
                            </tr> -->
                        </table>
                    </div>

                    <div class="x_panel" style="background-color: #f5f6f8;padding-left: 10px;padding-right: 10px;">

                        <div class="x_content affirmation-container"
                             style="background-color: white;border: 1px solid lightgray;border-radius: 5px;    padding-bottom: 0px;">
                            <div class="affirmation-item">
                                <div style="display: flex;padding: 10px;    border-bottom: 1px solid #d4d4d4;">
                                    <div style="font-size: 14px;padding-left: 10px; flex: 1;">
                                        <div class="row">
                                            <div class="col-sm-2 col-md-2 col-xs-12">
                                                Title
                                            </div>
                                            <div class="col-sm-4 col-md-4 col-xs-12">
                                                Content
                                            </div>
                                            <div class="col-sm-2 col-md-2 col-xs-12">
                                                Creator
                                            </div>
                                            <div class="col-sm-3 col-md-3 col-xs-12">
                                                Created At
                                            </div>
                                            <div class="col-sm-1 col-md-1 col-xs-12">

                                            </div>
                                        <div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="no_data" style="padding: 12px; text-align: center;display:none;">Not Found affirmation</div>
                    </div>
                        </div>
                    </div>
                    <div class="text-right" style="padding-right: 5px;">
                        <a href="/affirmation/0" class="btn btn-primary">Add Affirmation</a>
                    </div>
                </div>
            </div>
        </div>
    </div>



@endsection

@section('script-content')
    @include('firebase')
    <script>


        var all_affirmations = [];
        var g_categories = [];

        $(document).ready(function () {
            fetchAffirmations();
        });

        function fetchAffirmations() {
            showProgress();
            get_fb_collection('affirmations', function (affirmations) {
                hideProgress();
                console.log(affirmations);
                all_affirmations = [];
                affirmations.forEach(affirmation => {
                    affirmation.search = affirmation.title + ' ' + affirmation.content;
                    all_affirmations.push(affirmation);

                    let affirmation_html = `
              <div class="affirmation-item affirmation-` + affirmation.id + `" data-id="` + affirmation.id + `">
                <div style="display: flex;padding: 10px;    border-bottom: 1px solid #d4d4d4;">
                  <div style="font-size: 12px;padding-left: 10px; flex: 1;">
                    <a class="row" href="/affirmation/` + affirmation.id + `" >
                        <div class="col-sm-2 col-md-2 col-xs-12 table-cell">
                        ` + affirmation.title + `
                        </div>
                        <div class="col-sm-4 col-md-4 col-xs-12 table-cell">
                          ` + affirmation.content + `
                        </div>
                        <div class="col-sm-2 col-md-2 col-xs-12 table-cell">
                          ` + affirmation.ownerName + `
                        </div>
                        <div class="col-sm-3 col-md-3 col-xs-12 table-cell">
                          ` + new Date(affirmation.createdAt).toISOString() + `
                        </div>
                        <div class="col-sm-1 col-md-1 col-xs-12 text-right">
                            <button type="button" class="btn btn-primary btn-delete-affirmation"> View</button>
                        </div>
                    </a>
                  </div>
                </div>
              </div>
      `;
                    $('.affirmation-container').append(affirmation_html);
                });

                $('.btn-delete-affirmation').on('click', function () {
                    var affirmation_id = $(this).closest('.affirmation-item').attr('data-id')
                    $.confirm({
                        text: "Are you sure to delete this affirmation?",
                        confirm: function (button) {
                            showProgress();
                            delete_fb_doc('affirmations', affirmation_id, function (success) {
                                hideProgress();
                                if (!success) return alert('Delete affirmation error.');
                                $('.affirmation-' + affirmation_id).remove();
                            })
                        }
                    });
                })

            })
        }


        function clearSearch() {
            $('#txtSearch').val("");
            changeSearch();
        }

        $('#txtSearch').keyup(changeSearch);
        $('#txtSearch').change(changeSearch);

        function changeSearch() {
            var search = $('#txtSearch').val().toLowerCase();
            if (search == '') {
                $('.no-item').hide();
                $('.affirmation-item').show();
                if (all_affirmations.length == 0) {
                    $('#no_data').show();
                } else {
                    $('#no_data').hide();
                }
                return;
            }

            show_count = 0;
            for (var index = 0; index < all_affirmations.length; index++) {
                var affirmation = all_affirmations[index];
                var affirmation_search = affirmation.search.toLowerCase();
                if (affirmation_search.includes(search)) {
                    $('.affirmation-' + affirmation.id).show();
                    show_count++;
                } else {
                    $('.affirmation-' + affirmation.id).hide();
                }
            }

            if (show_count == 0) {
                $('.no-item').show();
                $('#no_data').show();
            } else {
                $('.no-item').hide();
                $('#no_data').hide();
            }
        }

    </script>
@endsection

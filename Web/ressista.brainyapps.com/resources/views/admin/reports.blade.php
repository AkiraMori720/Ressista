@extends('admin.frame')

@section('page-title')
    <div class="title-content">
        <i class="fa fa-users "></i> Reports
    </div>
@endsection

@section('page-content')
    <style>
        .div-report  {
            border-bottom: 1px solid lightgray;
            padding: 15px 25px;
            margin-top: 5px;
            display: flex;
        }
        .report-link{
            flex-grow: 1;
            text-align: left;
        }
    </style>

    <div class="" role="main">
        <div class="">

            <div class="row">
                <div class="col-md-12 col-sm-12 col-xs-12">
                    <div class="col-md-12 col-sm-12 col-xs-12" style="margin: 20px 0px; text-align: center;">
                        <div class="x_panel" style="background-color: #f5f6f8;padding-left: 10px;padding-right: 10px;">
                            <div class="x_content product-container"
                                 style="background-color: white;border: 1px solid lightgray;border-radius: 5px;    padding-bottom: 0px;">
                                <div id="no_data" style="padding: 8px 0; text-align: center;display:none;"> No Report </div>
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
        $(document).ready(function () {
            fetchReports();
        });

        var all_reports = [];

        function fetchReports() {
            showProgress();
            get_fb_collection('feedbacks', function (feedbacks) {
                hideProgress();
                console.log(feedbacks);
                all_reports = [];
                feedbacks.forEach(feedback => {
                    feedback.search = feedback.subject + ' ' + feedback.content;
                    all_reports.push(feedback);

                    let product_html = `
            <div class="div-report">
              <a class="report-link btn-switch-page" href="{{url('/reports?id=')}}` + feedback.id + `">
                  <img src="{{url('/img/avatar.jpg')}}" alt="..." class="img-circle profile_img" style="margin:auto; margin-right: 20px;float:left;    width: 30px;height: 30px;padding: 0;border: 2px solid #1abb9c;">
                  <div style="color: black;    padding-top: 6px;">
                        <strong>` + (feedback.ownerName??'XXX') + `</strong> has reported a feedback
                  </div>
              </a>
              <div style="color: black; float:right;    padding-top: 6px;">
                    <span>` + new Date(feedback.createdAt).toISOString() + `</span>
              </div>
            </div>
      `;
                    $('.product-container').append(product_html);
                });

                if (all_reports.length == 0) {
                    $('#no_data').show();
                } else {
                    $('#no_data').hide();
                }
            })
        }
    </script>
@endsection

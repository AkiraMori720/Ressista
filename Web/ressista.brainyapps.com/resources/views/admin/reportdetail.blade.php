@extends('admin.frame')

@section('page-content')
    <style>
        .user-name {
            flex-grow: 1;
            margin-left: 8px;
        }
    </style>

    <div class="" role="main">
        <div class="">

            <div class="row">
                <div class="col-md-12 col-sm-12 col-xs-12">
                    <div class="x_panel">
                        <div class="x_content step_0">
                            <div class="col-md-12 col-sm-12 col-xs-12" style="margin:15px 0; display: flex; align-items: center;">
                                <img src="{{url('/img/avatar.jpg')}}" alt="..." class="img-circle img-user-avatar" style="margin:auto;height: 60px;width: 60px;border: 2px solid #1abb9c;">
                                <h3 class="user-name"></h3>
                                <div class="col-md-12 col-sm-12 col-xs-12" style="padding:10px;text-align: right;">
                                    <button type="button" class="btn btn-danger back-red btn-delete-report" style="width: 200px;">DELETE
                                        REPORT
                                    </button>
                                    <button type="button" class="btn btn-danger back-red btn-ban-user" style="width: 200px;">BAN THIS
                                        USER
                                    </button>
                                    <button type="button" class="btn btn-danger back-red btn-unban-user" style="width: 200px; display: none;">UNBAN THIS
                                        USER
                                    </button>
                                </div>
                            </div>
                            <div class="col-md-12 col-sm-12 col-xs-12" style="padding:10px;">
                                <h4 class="report-subject"></h4>
                            </div>
                            <div class="col-md-12 col-sm-12 col-xs-12" style="padding:10px;min-height:200px;">
                                <span class="report-content"></span>
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
        $(document).ready(function () {
            fetchReportInfo();
        });
        var global_feed_back = null;

        function fetchReportInfo() {
            showProgress();
            get_fb_doc('feedbacks', '{{$id}}', function (res) {
                hideProgress();
                console.log(res);
                if (res.success) {
                    let feedback = res.data;
                    global_feed_back = feedback;

                    get_fb_doc('users', feedback.ownerId, function (res) {
                        hideProgress();
                        console.log(res);
                        if (res.success) {
                            let user = res.data;
                            $('.img-user-avatar').attr('src', '/img/avatar.jpg');
                            $('.user-name').text(user.displayName ?? 'XXX');
                            $('.report-subject').text(feedback.subject);
                            $('.report-content').text(feedback.content);

                            if (user.isBanned) {
                                $('.btn-ban-user').hide();
                                $('.btn-unban-user').show();
                            } else {
                                $('.btn-ban-user').show();
                                $('.btn-unban-user').hide();
                            }
                        } else {
                            return new PNotify({
                                title: 'Error',
                                text: 'Fetch report info error',
                                type: 'error',
                                styling: 'bootstrap3'
                            });
                        }
                    })
                } else {
                    return new PNotify({
                        title: 'Error',
                        text: 'Fetch report info error',
                        type: 'error',
                        styling: 'bootstrap3'
                    });
                }
            })
        }

        $('.btn-ban-user').on('click', function() {
            banUser(true);
        })

        $('.btn-unban-user').on('click', function() {
            banUser(false);
        })

        function banUser(isBanned){
            $.confirm({
                text: "Are you sure?",
                confirm: function(button) {
                    showProgress();
                    update_fb_doc('users', global_feed_back.ownerId, {isBanned}, function(success) {
                        hideProgress();
                        if (success) {
                            new PNotify({
                                title: 'Success',
                                text: isBanned?'User banned successfully.':'User unbanned successfully.',
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
        }

        $('.btn-delete-report').on('click', function() {
            $.confirm({
                text: "Are you sure to delete this report?",
                confirm: function (button) {
                    showProgress();
                    delete_fb_doc('feedbacks', global_feed_back.id, function (success) {
                        hideProgress();
                        if (!success) return alert('Delete report error.');
                        new PNotify({
                            title: 'Success',
                            text: 'Report deleted successfully.',
                            type: 'success',
                            styling: 'bootstrap3'
                        });
                        location.href = "{{url('/reports')}}";
                    })
                }
            });
        })

    </script>
@endsection

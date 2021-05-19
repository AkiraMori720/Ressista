@extends('admin.frame')

@section('page-title')
    <div class="title-content">
        <i class="fa fa-cubes"></i> {{ $id == '0'?"New Affirmation":"Affirmation Detail"}}
    </div>
@endsection

@section('page-content')
    <style>
        .user-link {
            color: black !important;
        }

        .round-input {
            height: 43px;
            border: 1px solid #dde3ec;
            border-radius: 10px;
        }

        .form-control.form-control-solid {
            border: 1px solid gray;
            background: none;
        }

        input, textarea {
            color: black !important;
        }

        .location-photo {
            height: 150px;
        }
        .schedule-post-modal{
            margin: 100px auto;
            width: 350px !important;
        }
    </style>

    <div class="row">
        <div class="col-md-12 col-sm-12 col-xs-12">
            <div class="col-md-12 col-sm-12 col-xs-12" style="margin: 0px 0px;">
            </div>
            <div class="x_panel">
                <div class="x_content" style="padding: 25px 50px;">
                    <form id="frmProduct" method="post" enctype="multipart/form-data">
                        {{csrf_field()}}
                        <input type="hidden" name="id" value="{{$id}}">
                        <div class="form-group row">
                            <div class="col-md-2 col-sm-2 col-xs-12 text-right"><label class="control-label"> Affirmation Title</label></div>
                            <div class="col-md-10 col-sm-10 col-xs-12">
                              <input class="form-control form-control-solid placeholder-no-fix round-input" name="title"
                                   type="text" autocomplete="off" placeholder="Title" id="affirmation_title" required/>
                            </div>
                        </div>

                        <div class="form-group row">
                          <div class="col-md-2 col-sm-2 col-xs-12 text-right"><label class="control-label"> Affirmation Content</label></div>
                          <div class="col-md-10 col-sm-10 col-xs-12">
                            <textarea rows=3 class="form-control form-control-solid placeholder-no-fix round-input"
                                      id="affirmation_content" name="affirmation_content" type="text" autocomplete="off" placeholder="Content"
                                      required></textarea>
                          </div>
                        </div>
                        <div class="form-actions row text-right">
                            <button class="btn btn-primary btn-schedule"
                                    style=" background-color: #8d8845;color: white;font-size: 1.2rem;font-weight: bold;border-radius: 16px !important;">
                                {{$id=='0'?"SCHEDULE POST":"EDIT AFFIRMATION"}}
                            </button>
                            <button class="btn btn-primary btn-post"
                                    style=" background-color: #8d8845;color: white;font-size: 1.2rem;font-weight: bold;border-radius: 16px !important;">
                                POST AFFIRMATION
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <div id="dlg_modal" class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-mm schedule-post-modal">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span>
                    </button>
                    <h4 class="modal-title" id="title_modal">Post this affirmation on</h4>
                </div>
                <div class="modal-body">
                    <div class="item form-group row">
                        <label class="text-right col-xs-3" for="name">DATE <span class="required">*</span>
                        </label>
                        <div class="col-xs-8">
                            <input type="text" id="post-date" name="post-date"/><i class="fa fa-calendar" style="padding-left: 4px"></i>
                        </div>
                    </div>
                    <div class="item form-group row">
                        <label class="text-right col-xs-3" for="name">TIME <span class="required">*</span>
                        </label>
                        <div class="col-xs-8">
                            <input type="text" id="post-time" name="post-time"/><i class="fa fa-clock-o"  style="padding-left: 4px"></i>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary" id="btn_schedule_save" onclick = "">SAVE</button>
                </div>
            </div>
        </div>
    </div>

@endsection

@section('script-content')
    @include('firebase')
    <script src="/js/tinymce.min.js" type="text/javascript"></script>
    <script>
        var affirmation_id = '{{$id}}';
        if(affirmation_id !== '0'){
            fetchAffirmationInfo();
        }

        tinymce.init({
            selector: '#affirmation_content',
            toolbar: 'undo redo styleselect bold italic alignleft aligncenter alignright bullist numlist outdent indent code',
            menubar: false,
            statusbar: false,
            init_instance_callback: function(editor) {
                editor.on('keydown', function(e) {
                    if(affirmation_id !== '0'){
                        $('.btn-schedule').html('Save Affirmation');
                    }
                });
            }
        });

        $('#post-date').datepicker({
            'format': 'm/d/yyyy',
            'autoclose': true
        });

        $('#post-time').timepicker({
            'showDuration': true,
            'timeFormat': 'H:i:s'
        });

        function fetchAffirmationInfo() {
            showProgress();

            get_fb_doc('affirmations', affirmation_id, function (res) {
                hideProgress();
                if (!res.success) return alert('Invalid Affirmation');

                var affirmation = res.data;
                console.log(affirmation);

                $('#affirmation_title').val(affirmation.title);
                tinymce.get("affirmation_content").setContent(affirmation.content);

                let createdAt = new Date(affirmation.createdAt);
                let dateString = (createdAt.getMonth() + 1) + "/" + createdAt.getDate() + "/" + createdAt.getFullYear();
                let timeString = createdAt.getHours() + ":" + createdAt.getMinutes() + ":" + createdAt.getSeconds();
                $('#post-date').val(dateString);
                $('#post-time').val(timeString);

                if(affirmation.status || affirmation.status === 'pending'){
                    $('.btn-schedule').attr("disabled", true);
                    $('.btn-post').attr("disabled", true);
                }
            });

        }
        $('#affirmation_title').keydown(function(value){
            if(affirmation_id !== '0'){
                $('.btn-schedule').html('Save Affirmation');
            }
        })
        $('.btn-schedule').click(function(e){
            e.preventDefault();
            let title = $('#affirmation_title').val();
            let content = tinymce.get("affirmation_content").getContent();
            if(title.length && content.length) {
                $('#dlg_modal').modal('show');
            }
        });

        $('.btn-post').click(function(e){
            e.preventDefault();
            let title = $('#affirmation_title').val();
            let content = tinymce.get("affirmation_content").getContent();
            if(title.length && content.length) {
                let datetime = new Date().getTime();
                postAffirmation(title, content, datetime);
            }
        });

        $('#btn_schedule_save').click(function (e){
            e.preventDefault();
            let date = $('#post-date').val();
            let time = $('#post-time').val();
            console.log('date, time: ', date, time);
            let datetime = new Date(`${date} ${time}`).getTime();
            if(datetime){
                let title = $('#affirmation_title').val();
                let content = tinymce.get("affirmation_content").getContent();
                postAffirmation(title, content, datetime);
            }
        })

        function postAffirmation(title, content, datetime) {
            let affirmation = {
                title: title,
                content: content,
                ownerId: '{{ Session::get('user_id') }}',
                ownerName: '{{ Session::get('user_name') }}',
                createdAt: datetime
            };

            showProgress();
            if (affirmation_id !== '0') {
                update_fb_doc('affirmations', affirmation_id, affirmation, function (success) {
                    console.log(success);
                    if (!success) return alert('Save affirmation info error');
                    hideProgress();
                    location.href = '/affirmations';
                })
            } else {
                add_fb_doc('affirmations', affirmation, function (res) {
                    if (!res) return alert('Add affirmation info error1');
                    affirmation_id = res;
                    hideProgress();
                    location.href = '/affirmations';
                })
            }
        }
    </script>
@endsection

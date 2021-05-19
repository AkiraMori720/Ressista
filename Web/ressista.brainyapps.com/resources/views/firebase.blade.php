
<script src="https://www.gstatic.com/firebasejs/7.16.1/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/7.16.1/firebase-analytics.js"></script>
<script src="https://www.gstatic.com/firebasejs/7.16.1/firebase-auth.js"></script>
<script src="https://www.gstatic.com/firebasejs/7.16.1/firebase-firestore.js"></script>
<script src="https://www.gstatic.com/firebasejs/7.16.1/firebase-storage.js"></script>

<script>
    var firebaseConfig = {
        apiKey: "AIzaSyDV_JYjx9EgjwK5PXDBkuQvwRmjgPqCU-Y",
        authDomain: "ressista-c9fd2.firebaseapp.com",
        databaseURL: "https://ressista-c9fd2.firebaseio.com",
        projectId: "ressista-c9fd2",
        storageBucket: "ressista-c9fd2.appspot.com",
        messagingSenderId: "1087913190565",
        appId: "1:1087913190565:ios:7cad161fe5baf202ee194c"
    };
    firebase.initializeApp(firebaseConfig);
    var db = firebase.firestore();

    function get_fb_collection(collection_id, callback = null) {
        db.collection(collection_id).get().then((querySnapshot) => {
            var data = [];
            querySnapshot.forEach((doc) => {
                var item = doc.data();
                item.id = doc.id;
                data.push(item);
            });
            callback && callback(data);
        });
    }

    function get_fb_doc(collection_id, doc_id, callback = null) {
        var docRef = db.collection(collection_id).doc(doc_id);
        var res = {success:false}
        docRef.get().then(function(doc) {
            if (doc.exists) {
                res.success = true;
                res.data = doc.data()
                callback && callback(res);
            } else {
                callback && callback(res);
            }
        }).catch(function(error) {
            callback && callback(res);
        });
    }

    function update_fb_doc(collection_id, doc_id, data, callback = null) {
        var docRef = db.collection(collection_id).doc(doc_id);
        var res = {success:false}
        docRef.update(data).then(function(doc) {
            callback && callback(true);
        }).catch(function(error) {
            console.log(error);
            callback && callback(false);
        });
    }

    function delete_fb_doc(collection_id, doc_id, callback = null) {
        var docRef = db.collection(collection_id).doc(doc_id);
        var res = {success:false}
        docRef.delete().then(function(doc) {
            callback && callback(true);
        }).catch(function(error) {
            callback && callback(false);
        });
    }

    function add_fb_doc(collection_id, data, callback = null) {
        var collectionRef = db.collection(collection_id);
        var res = {success:false}
        collectionRef.add(data).then(function(doc) {
            console.log(doc);
            callback && callback(doc.id);
        }).catch(function(error) {
            console.log(error);
            callback && callback(null);
        });
    }


</script>

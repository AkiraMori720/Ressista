import messaging from "@react-native-firebase/messaging";
import firestore from "@react-native-firebase/firestore";
const SERVER_KEY = 'AAAA_Uyt5KU:APA91bGqAh7eJuwW0DD1eh66SPSsmIRu9eQkh5mkEKq-tsCfvSH9M8QT5AUdc7BmicNjUkGWci5Ani-W8_PianCms8P8AUhudaYM5tDGstO6LfiF-YGHA4qLBp8LOdFYsAcGLDSZNi-F';

export const setFcmToken = async (userid) => {
    const authStatus = await messaging().requestPermission();
    const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
        try{
            const fcmToken = await messaging().getToken();
            if (fcmToken) {
                console.log("Your Firebase Token is:", fcmToken);

                let userRef = await firestore().collection('users').doc(userid);
                await userRef.set({
                    fcmToken: fcmToken
                }, { merge: true});
                return fcmToken;
            }
        } catch (e){
        }
    }
    console.log("Failed", "No token received");
    return null
}

export const sendNotifications = (tokens, title, content, data) => {
    for(let i=0; i<tokens.length; i++){
        let params = {
            to:tokens[i],
            data,
            notification:{
                body:content,
                title:title
            }
        };

        let options = {
            method: 'POST',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
                'Authorization': `key=${SERVER_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        };
        console.log('send notification: ', options);
        try{
            fetch('https://fcm.googleapis.com/fcm/send', options);
        } catch (e) {
            console.log('Send Notification Error:', e);
        }
    }
    return true;
}

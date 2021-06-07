import React from 'react';
import messaging from "@react-native-firebase/messaging";
import Toast from './SourceCode/Components/Toast';
import { Provider } from 'react-redux';
import store from './SourceCode/Lib/createStore';
import {appInit} from './SourceCode/Actions/app';
import AppContainer from './SourceCode/AppContainer';
import EventEmitter from './SourceCode/Lib/events';
import InAppNotification, {INAPP_NOTIFICATION_EMITTER} from "./SourceCode/Components/InAppNotification";
import Navigation from './SourceCode/Lib/Navigation';
import FirebaseStore from "./SourceCode/Lib/fireStore";
import reduxStore from "./SourceCode/Lib/createStore";
import AsyncStorage from "@react-native-community/async-storage";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.init();
    }

    init = async() => {
        messaging().onMessage(remoteMessage => {
            console.log(
                'Notification caused app to open from foreground state:',
                remoteMessage,
            );
            EventEmitter.emit(INAPP_NOTIFICATION_EMITTER, remoteMessage);
        });

        messaging().onNotificationOpenedApp(async (remoteMessage) => {
            console.log(
                'Notification caused app to open from background state:',
                remoteMessage.data,
            );
            const store = reduxStore.getState();
            const isAuthenticated = store.login.isAuthenticated;
            if(isAuthenticated){
                const {  action, userId, toId } = remoteMessage.data;

                switch (action){
                    case 'message':
                        if(userId && toId){
                            const room = await FirebaseStore.getRoom(userId, toId);
                            if(room){
                                setTimeout(() => Navigation.navigate("InsideStack", { screen: 'UserChat', params: { room: room }}, 1000));
                            }
                        }
                        break;
                }
            }
        });

        // Check whether an initial notification is available
        const remoteMessage = await messaging().getInitialNotification();

        if (remoteMessage) {
            console.log(
                'Notification caused app to open from quit state:',
                remoteMessage.data,
            );
            await AsyncStorage.setItem('notification', JSON.stringify(remoteMessage.data));
        }
        store.dispatch(appInit());
    }
    render() {
        return (
            <Provider store={store}>
                <AppContainer />
                <Toast />
                <InAppNotification/>
            </Provider>
        )
    }
}

export default App

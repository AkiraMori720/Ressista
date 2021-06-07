import React from 'react';
import { StatusBar, Image, View } from 'react-native';
import PropTypes from 'prop-types';
import auth from '@react-native-firebase/auth';
import styles from './Styles';
import Colors from '../../Assets/Colors/colors';
import images from '../../Assets/Images/images';
import {appStart as appStartAction, ROOT_ONBOARD} from '../../Actions/app';
import {loginSuccess as loginSuccessAction, setUser as setUserAction } from '../../Actions/login';
import {connect} from 'react-redux';
import FirebaseStore from '../../Lib/fireStore';
import {showToast} from '../../Lib/info';
import AsyncStorage from '@react-native-community/async-storage';


class SplashScreen extends React.Component {

    static propTypes = {
        navigation: PropTypes.object,
        appStart: PropTypes.func,
        loginSuccess: PropTypes.func,
    };

    constructor() {
        super();
        this.initialize = false;
    }

    //================================ component Did Mount ======================================//

    componentDidMount() {
        const { appStart, loginSuccess } = this.props;
        setTimeout(async () => {
            const provider = await AsyncStorage.getItem('provider');
            const token = await AsyncStorage.getItem('token');

            switch (provider){
                case 'google':
                case 'facebook':
                case 'apple':
                case 'email':
                {
                    if(token){
                        auth()
                            .onAuthStateChanged(async (user) => {
                                if (!this.initialize) {
                                    this.initialize = true;

                                    if (user) {
                                        console.log("-----user:", user._user);
                                        let profile = await FirebaseStore.getUserProfile(user.uid);
                                        if (profile) {
                                            if (profile.isBanned) {
                                                showToast("You are blocked!");
                                                await auth().signOut();
                                                appStart({root: ROOT_ONBOARD});
                                            } else {
                                                loginSuccess({...user._user, profile});
                                            }
                                            return;
                                        }
                                    }
                                    appStart({root: ROOT_ONBOARD});
                                }
                            });
                        return;
                    }
                    break;
                }
                default:
                    break;
            }
            appStart({root:ROOT_ONBOARD});
        }, 1500)
    }

    render() {
        return (
            <View style={styles.mainContainer} >
                {/* //================================ StatusBar ======================================// */}
                <StatusBar barStyle="dark-content" hidden={false} backgroundColor={Colors.app_background} translucent={false} />
                <Image style={styles.image} source={images.splash} />
            </View>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    appStart: params => dispatch(appStartAction(params)),
    setUser: params => dispatch(setUserAction(params)),
    loginSuccess: params => dispatch(loginSuccessAction(params))
});


export default connect(null, mapDispatchToProps)(SplashScreen);

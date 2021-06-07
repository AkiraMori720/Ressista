import {
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {View, Text, Image, TouchableOpacity, StatusBar, ImageBackground, Alert} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-community/google-signin';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import Button from '../../../../Components/Button/Button';
import colors from '../../../../Assets/Colors/colors';
import images from '../../../../Assets/Images/images';
import styles from './Styles';
import {appStart as appStartAction} from '../../../../Actions/app';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {now} from 'moment';
import FirebaseStore from '../../../../Lib/fireStore';
import { loginSuccess as loginSuccessAction } from '../../../../Actions/login';
import AsyncStorage from "@react-native-community/async-storage";

GoogleSignin.configure({
    webClientId: '1087913190565-jo8826aq3e8i6eicpsuqlplrdmieflmr.apps.googleusercontent.com',
});

class SignupWith extends React.Component {

    static propTypes = {
        navigation: PropTypes.object,
        appStart: PropTypes.func,
        loginSuccess: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    onFaceBookButtonPress = async () => {
        const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
        if (result.isCancelled){
            throw 'User cancelled the login';
        }

        const data = await AccessToken.getCurrentAccessToken();
        if(!data){
            throw 'Something went wrong obtaining access token';
        }

        const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

        auth().signInWithCredential(facebookCredential).then(async (res) =>{
            await this.authLogin(res);
            await this.cacheAuthToken('google', data.accessToken);
        }).catch((err) => {
            Alert.alert('Error', 'Facebook Sign up failed!');
        });
    }

    onGoogleButtonPress = async () => {
        // Get the users ID token
        const {idToken} = await GoogleSignin.signIn();

        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        // Sign-in the user with the credential
        auth().signInWithCredential(googleCredential).then(async (res) => {
            await this.authLogin(res);
            await this.cacheAuthToken('google', idToken);
        }).catch((err) => {
            Alert.alert('Error', 'Google Sign up failed!');
        });
    };

    onAppleButtonPress = async () => {
        // Start the sign-in request
        const appleAuthRequestResponse = await appleAuth.performRequest({
            requestedOperation: appleAuth.Operation.LOGIN,
            requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
        });

        // Ensure Apple returned a user identityToken
        if (!appleAuthRequestResponse.identityToken) {
            throw 'Apple Sign-In failed - no identify token returned';
        }

        // Create a Firebase credential from the response
        const {identityToken, nonce} = appleAuthRequestResponse;
        const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);

        // Sign the user in with the credential
        auth().signInWithCredential(appleCredential).then(async (res) => {
            await this.authLogin(res);
            await this.cacheAuthToken('apple', JSON.stringify({identityToken, nonce}));
        }).catch((err) => {
            console.log('error', err);
            Alert.alert('Error', 'Apple Sign up failed!');
        });
    };

    cacheAuthToken = async (provider, token) => {
        try{
            await AsyncStorage.setItem('provider', provider);
            await AsyncStorage.setItem('token', token);
        } catch (e) {
        }
    }

    authLogin = async (userCredential) => {
        const {loginSuccess} = this.props;
        console.log('userCredential', userCredential);
        if (userCredential && userCredential.user && userCredential.user._user) {
            const providerData = userCredential.user._user.providerData && userCredential.user._user.providerData.length > 0 ? userCredential.user._user.providerData[0] : {};
            const user_profile = {createdAt: now(), lastVisit: now(), ...providerData};

            try {
                await FirebaseStore.registerUserProfile(userCredential.user._user.uid, user_profile);
                console.log('User account created & signed in!', user_profile);
                return loginSuccess({...userCredential.user._user, profile: user_profile});
            } catch (err) {
            }
        }
        this.setState({spinner: false});
        Alert.alert('Error', 'failed adding user data!');
    }

    render() {
        const {appStart, navigation} = this.props;

        return (
            <ImageBackground style={styles.mainContainer} source={images.bgImage}>
                {/* //================================ StatusBar ======================================// */}
                <StatusBar
                    barStyle="dark-content"
                    hidden={false}
                    backgroundColor={colors.appDarkBlue}
                    translucent={false}
                />

                {/* //================================ Header ======================================// */}
                <View style={styles.headerView}>
                </View>
                {/* //================================ Logo ======================================// */}
                <View style={styles.upperView}>
                    <Image style={styles.imageStyles} source={images.ressista}/>
                    <Text style={styles.ressistaText}>A safe place for people to discuss, address and improve as well as help others with their Mental health</Text>
                    <Text style={styles.headingText}>SIGN UP WITH</Text>
                </View>
                {/* //================================ Sign up Buttons ======================================// */}
                <View style={styles.midView}>
                    <View style={styles.buttonsView}>
                        <Button
                            style={styles.buttonStyles}
                            title={'Sign up with Facebook'}
                            iconPlace={'left'}
                            icon={images.ic_fb}
                            bgColor={colors.fb_color}
                            titleColor={colors.white}
                            iconWidth={wp(3)}
                            onPress={() => this.onFaceBookButtonPress().then(() => console.log('Signed in with Facebook!'))}
                        />
                        <Button
                            style={[styles.buttonStyles, {borderWidth: 1, borderColor: colors.app_light_yellow}]}
                            title={'Sign up with Google'}
                            iconPlace={'left'}
                            bgColor={colors.white}
                            icon={images.googleIcon}
                            titleStyle={styles.titleStyles}
                            iconStyle={styles.iconStyles}
                            onPress={() => this.onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
                        />
                        <Button
                            style={[styles.buttonStyles, {borderWidth: 1, borderColor: colors.app_light_yellow}]}
                            title={'Sign up with Apple'}
                            iconPlace={'left'}
                            bgColor={colors.white}
                            icon={images.appleIcon}
                            iconTintColor={colors.black}
                            iconWidth={wp(5)}
                            titleStyle={styles.titleStyles}
                            onPress={() => this.onAppleButtonPress().then(() => console.log('Apple sign-in complete!'))}
                        />
                        <Button
                            style={styles.buttonStyles}
                            title={'Sign up with Email'}
                            iconPlace={'left'}
                            bgColor={colors.app_blue}
                            icon={images.ic_email}
                            iconTintColor={colors.white}
                            titleStyle={[styles.titleStylesEmail]}
                            onPress={() => navigation.navigate('SignUpScreen')}
                        />
                    </View>

                </View>

                <View style={styles.lowerView}>
                    {/* //================================ Login Button ======================================// */}
                    <TouchableOpacity
                        onPress={() => navigation.navigate('LoginScreen')}>
                        <Text style={styles.textStyle}>Already have an account?</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    appStart: params => dispatch(appStartAction(params)),
    loginSuccess: params => dispatch(loginSuccessAction(params))
});

export default connect(null, mapDispatchToProps)(SignupWith);

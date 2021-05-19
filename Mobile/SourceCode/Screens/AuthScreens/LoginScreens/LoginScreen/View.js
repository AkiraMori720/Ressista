
import {View, Text, StatusBar, Image, TouchableOpacity, ImageBackground, Alert, ScrollView} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import React from 'react';
import auth from '@react-native-firebase/auth';
import Spinner from 'react-native-loading-spinner-overlay';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';
import AppHeader from '../../../../Components/AppHeader/AppHeader';
import AppInput from '../../../../Components/AppInput/AppInput';
import Button from '../../../../Components/Button/Button';
import colors from '../../../../Assets/Colors/colors';
import images from '../../../../Assets/Images/images';
import CheckBox from '../../../../Components/CheckBox/CheckBox';
import styles from "./Styles";
import {appStart as appStartAction} from '../../../../Actions/app';
import {loginSuccess as loginSuccessAction} from '../../../../Actions/login';
import connect from 'react-redux/lib/connect/connect';
import PropTypes from 'prop-types';
import {showToast} from '../../../../Lib/info';
import isValidEmail from '../../../../Lib/isValidEmail';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import {now} from 'moment';
import FirebaseStore from '../../../../Lib/fireStore';


class LoginScreen extends React.Component {

    static propTypes = {
        navigation: PropTypes.object,
        appStart: PropTypes.func,
        loginSuccess: PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.state = {
            showPassword: true,
            email: null,
            password: null,
            remember: false,
            spinner: false,
        }
        this.unsubscribeFocus = props.navigation.addListener('focus', () => {
            this.setState({email: '', password: '', remember: false});
        });
    }

    async componentDidMount() {
        try {
            const value = await AsyncStorage.getItem('storage_remember');
            if (value !== null) {
                const email = await AsyncStorage.getItem('email')
                const password = await AsyncStorage.getItem('password')
                this.setState({ remember: true, email, password })
            }
        } catch (e) {
            // error reading value
        }
    }

    componentWillUnmount() {
        if(this.unsubscribeFocus){
            this.unsubscribeFocus();
        }
    }

    togglePassword() {
        this.setState({ showPassword: !this.state.showPassword })
    }

    onAppleLogin = async() => {
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
        }).catch((err) => {
            console.log('error', err);
            Alert.alert('Error', 'Apple Sign up failed!');
        });
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

    onLoginEmailAndPassword() {
        const { email, password } = this.state;
        const { appStart, loginSuccess } = this.props;

        if (!email || !email.trim().length || !isValidEmail(email.trim())) {
            Alert.alert('Info', 'Please enter a valid email address!');
        } else if (!password || !password.trim().length) {
            Alert.alert('Info', 'Please enter password!');
        } else {
            this.setState({ spinner: true })
            auth()
                .signInWithEmailAndPassword(this.state.email, this.state.password)
                .then(async (res) => {
                    if (res && res.user && res.user._user) {
                        try {
                            await AsyncStorage.setItem('email', this.state.remember ? this.state.email : null)
                            await AsyncStorage.setItem('password', this.state.remember ? this.state.password : null)
                        } catch (e) {
                            console.log(e)
                        }
                        console.log('User account created & signed in!', res);
                        firestore()
                            .collection(`users`)
                            .doc(`${res.user._user.uid}`)
                            .get()
                            .then((doc) => {
                                if (doc) {
                                    console.log('fetch user profile!', doc.data());
                                    const profile = doc.data()
                                    if (profile) {
                                        if(profile.isBanned){
                                            showToast("This user are blocked!");
                                            this.setState({ spinner: false });
                                        } else {
                                            loginSuccess({...res.user._user, profile});
                                        }
                                    }
                                }
                            })
                    }
                    else {
                        this.setState({ spinner: false });
                        setTimeout(() => { Alert.alert('Error', 'Login failed!');}, 100);
                    }
                })
                .catch(error => {
                    this.setState({ spinner: false });
                    setTimeout(() => {
                        if (error.code === 'auth/user-not-found') {
                            Alert.alert('Error', 'There is no user record corresponding to this identifier.');
                        } else if (error.code === 'auth/wrong-password') {
                            Alert.alert('Error', 'The password is invalid.');
                        } else if (error.code === 'auth/too-many-requests') {
                            Alert.alert('Error', 'Access has been temporarily disabled due to many failed attempts. You can immediately restore it by resetting your password or you can try again later.');
                        } else if (error.code === 'auth/invalid-email') {
                            Alert.alert('Error', 'The email address is badly formatted.');
                        } else if (error.code === 'auth/user-disabled') {
                            Alert.alert('Error', 'The user corresponding to the given email has been disabled.');
                        } else {
                            Alert.alert('Error', 'The user is invalid.');
                        }
                    }, 100);
                });
        }
    }

    render() {
        const { password, email, spinner } = this.state;

        return (
            <ImageBackground style={styles.mainContainer} source={images.bgImage}>
                <View style={styles.headerView}>

                    {/* //================================ StatusBar ======================================// */}
                    <StatusBar barStyle="dark-content" hidden={false} backgroundColor={colors.appDarkBlue} translucent={false} />

                    {/* //================================ Header ======================================// */}
                    <AppHeader
                        bgColor={'transparent'}
                        titleFontSize={wp(5)}
                        leftIconPath={images.headerLeftBack}
                        iconWidth={wp(5)}
                        onLeftIconPress={() => this.props.navigation.goBack()}
                        lefticonSize={wp(5)}
                        borderBottomWidth={0.001}
                        tintColor={colors.white}
                    />
                </View>
                {/* //================================ Logo ======================================// */}
                <View style={{ flex: 1 }}>
                    <View style={styles.upperView}>
                        <Image
                            style={styles.imageStyles}
                            source={images.ressista} />
                        <Text style={styles.ressistaText}>A safe place for people to discuss, address and improve as well as help others with their Mental health</Text>

                        <Text style={styles.headingText}>LOGIN</Text>

                        <TouchableOpacity style={styles.appleView} onPress={this.onAppleLogin}>
                            <Text style={styles.loginText}>Login with your <Text style={styles.appleID}>Apple ID</Text></Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.midView}>
                        <View style={styles.inputsView}>
                            {/* //================================ Email Input ======================================// */}

                            <AppInput
                                height={hp(6)}
                                placeholder={'Email'}
                                colortextInput={colors.black}
                                paddingLeft={wp(2)}
                                marginBottom={wp(2)}
                                marginTop={15}
                                backgroundColor={colors.white}
                                placeholderTextColor={colors.placeholder_text_color}
                                borderBottomWidth={1}
                                borderColor={colors.app_light_yellow}
                                value={email}
                                onChangeText={value => this.setState({ email: value })}
                                keyboardType="email-address"
                            />
                            {/* //================================ Password Input ======================================// */}
                            <AppInput
                                height={hp(6)}
                                placeholder={'Password'}
                                secureEntry={this.state.showPassword}
                                onRightIconPress={() => this.togglePassword()}
                                colortextInput={colors.black}
                                paddingLeft={wp(2)}
                                marginBottom={wp(2)}
                                backgroundColor={colors.white}
                                placeholderTextColor={colors.placeholder_text_color}
                                borderBottomWidth={1}
                                rightIconPath={images.ic_eye}
                                borderColor={colors.app_light_yellow}
                                value={password}
                                onChangeText={value => this.setState({ password: value })}
                            />
                            {/* //================================ Remember Me ======================================// */}
                            <View style={styles.checkBoxContainer}>
                                <CheckBox
                                    bgColor={'none'}
                                    checkTitle={'Remember Me'}
                                    value={this.state.remember}
                                    onChange={async value => {
                                        this.setState({ remember: value });
                                        if (value) {
                                            try {
                                                await AsyncStorage.setItem('storage_remember', 'true')
                                            } catch (e) {
                                                console.log(e)
                                            }
                                        } else {
                                            try {
                                                await AsyncStorage.removeItem('storage_remember')
                                                await AsyncStorage.removeItem('email')
                                                await AsyncStorage.removeItem('password')
                                            } catch (e) {
                                                console.log(e)
                                            }
                                        }
                                    }}
                                />
                            </View>
                            <Button
                                width={'100%'}
                                style={styles.buttonStyles}
                                title={'Login'}
                                bgColor={colors.app_button_color}
                                titleStyle={[styles.titleStyles]}
                                onPress={() => this.onLoginEmailAndPassword()}
                            />

                        </View>
                    </View>
                    {/* //================================ Buttons ======================================// */}
                    <View style={styles.lowerView}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('ResetPassword')} >
                            <Text style={styles.textStyle}>Forgot Password?</Text>
                        </TouchableOpacity>
                    </View>
                    <Spinner
                        visible={spinner}
                        textContent={''}
                    />
                </View>
            </ImageBackground>
        )
    }
}


const mapDispatchToProps = dispatch => ({
    appStart: params => dispatch(appStartAction(params)),
    loginSuccess: params => dispatch(loginSuccessAction(params)),
});

export default connect(null, mapDispatchToProps)(LoginScreen);

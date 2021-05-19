//================================ React Native Imported Files ======================================//

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
    View,
    Text,
    StatusBar,
    Image,
    TouchableOpacity,
    Modal, ImageBackground, Alert, ScrollView,
} from 'react-native';
import React from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import moment, {now} from 'moment';
import Toast from 'react-native-toast-message';

//================================ Local Imported Files ======================================//

import AppHeader from '../../../../Components/AppHeader/AppHeader';
import AppInput from '../../../../Components/AppInput/AppInput';
import Button from '../../../../Components/Button/Button';
import MyModel from '../../../../Components/Model/Model';
import colors from '../../../../Assets/Colors/colors';
import images from '../../../../Assets/Images/images';
import styles from './Styles';
import {appStart as appStartAction, ROOT_INSIDE} from '../../../../Actions/app';
import {loginSuccess as loginSuccessAction} from '../../../../Actions/login';
import connect from 'react-redux/lib/connect/connect';
import PropTypes from 'prop-types';
import fireStore from '../../../../Lib/fireStore';
import FirebaseStore from '../../../../Lib/fireStore';

class SignUpScreen extends React.Component {
    static propTypes = {
        navigation: PropTypes.object,
        appStart: PropTypes.func,
        loginSuccess: PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            showPassword: true,
            password: '',
            showAlert: false,
            email: null,
            spinner: false,
            isValidEmail: false,
            isLeast6Char: false,
            isContainLetter: false,
            isContainNum: false,
            isContainSpecial: false,
        };
    }

    validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    hasNumber(password) {
        return /\d/.test(password);
    }

    hasLetter(password) {
        return password.search(/[a-z]/i) < 0 ? false : true;
    }

    hasSpecial(password) {
        const re = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        return re.test(String(password));
    }

    //================================ Navigation Functions ======================================//

    setModalVisible = (visible) => {
        this.setState({modalVisible: visible});
    };

    navigateScreen() {
        this.props.navigation.navigate('TermsConditions'),
            this.setModalVisible(!this.state.modalVisible);
    }

    Privacy() {
        this.props.navigation.navigate('PrivacyScreen'),
            this.setModalVisible(!this.state.modalVisible);
    }

    togglePassword() {
        this.setState({showPassword: !this.state.showPassword});
    }

    validateSubmit() {
        const {
            isValidEmail,
            isLeast6Char,
            isContainLetter,
            isContainNum,
            isContainSpecial,
        } = this.state;

        if (!isValidEmail) {
            Alert.alert('Info', 'Please enter a valid email address!');
            return;
        }

        if (!isLeast6Char) {
            Alert.alert('Info', 'Password must be at least 6 characters long!');
            return;
        }

        if (!isContainLetter) {
            Alert.alert('Info', 'The password must contains a letter!');
            return;
        }

        if (!isContainNum) {
            Alert.alert('Info', 'The password must contains a number!');
            return;
        }

        if (!isContainSpecial) {
            Alert.alert('Info', 'The password must contains a special character!');
            return;
        }

        if (isValidEmail && isLeast6Char && isContainLetter && isContainNum && isContainSpecial) {
            this.setModalVisible(true);
        }
    }

    onCreateWithEmailAndPassword() {
        const {appStart, loginSuccess} = this.props;
        this.setModalVisible(!this.state.modalVisible);
        this.setState({spinner: true});
        auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(async (res) => {
                if (res && res.user && res.user._user) {
                    console.log('User account created & signed in!', res);

                    const providerData = res.user._user.providerData && res.user._user.providerData.length > 0 ? res.user._user.providerData[0] : {};
                    const user_profile = {createdAt: now(), lastVisit: now(), ...providerData};

                    try {
                        await FirebaseStore.registerUserProfile(res.user._user.uid, user_profile);
                        console.log('User added!', user_profile);
                        // this.props.updateUserProfile(user_profile)
                        // this.setState({spinner: false});
                        // this.props.updateFCMToken()
                        loginSuccess({...res.user._user, profile: user_profile});

                    } catch (err) {
                        this.setState({spinner: false});
                        setTimeout(() => {Alert.alert('Error', 'failed adding user data!');}, 100);
                    }
                } else {
                    this.setState({spinner: false});
                    setTimeout(() => {Alert.alert('Error', 'Signup failed!');}, 100);
                }
            })
            .catch(error => {
                this.setState({spinner: false});
                setTimeout(() => {
                    if (error.code === 'auth/email-already-in-use') {
                        Alert.alert('Error', 'This email address is already in use by another account.');
                    } else if (error.code === 'auth/invalid-email') {
                        Alert.alert('Error', 'The email address is badly formatted.');
                    } else {
                        Alert.alert('Error', 'Signup failed.');
                    }
                }, 100);
            });
    }

    render() {
        const {
            modalVisible,
            password,
            email,
            spinner,
            isValidEmail,
            isLeast6Char,
            isContainLetter,
            isContainNum,
            isContainSpecial,
        } = this.state;

        return (

            <ImageBackground style={styles.mainContainer} source={images.bgImage}>
                {/* //================================ StatusBar ======================================// */}
                <StatusBar
                    barStyle="dark-content"
                    hidden={false}
                    backgroundColor={colors.app_background}
                    translucent={false}
                />
                {/* //================================ Header ======================================// */}
                <View style={styles.headerView}>
                    <AppHeader
                        headerHeight="100%"
                        titleFontSize={wp(5)}
                        leftIconPath={images.headerLeftBack}
                        iconWidth={wp(5)}
                        lefticonSize={wp(5)}
                        bgColor={'transparent'}
                        borderBottomWidth={0.001}
                        tintColor={colors.white}
                        onLeftIconPress={() => this.props.navigation.goBack()}
                    />
                </View>
                <View style={{flex: 1}}>
                    {/* //================================ Logo ======================================// */}
                    <View style={styles.upperView}>
                        <Image style={styles.imageStyles} source={images.ressista}/>
                        <Text style={styles.ressistaText}>A safe place for people to discuss, address and improve as
                            well help others with their Mental health</Text>
                        <Text style={styles.headingText}>SIGN UP</Text>
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
                                onChangeText={value => this.setState({
                                    email: value,
                                    isValidEmail: this.validateEmail(value),
                                })}
                                keyboardType="email-address"
                            />
                            <View style={styles.checkBoxContainer}>
                                <View style={styles.checkBoxIcon}>
                                    <Image
                                        style={styles.checkBoxIconStyle}
                                        source={isValidEmail ? images.ic_check_active : images.ic_check_inactive}
                                    />
                                </View>
                                <View style={styles.checkBoxText}>
                                    <Text style={styles.checkBoxTextStyle}>Valid email</Text>
                                </View>
                            </View>
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
                                onChangeText={value => this.setState({
                                    password: value,
                                    isLeast6Char: value && value.length >= 6 ? true : false,
                                    isContainLetter: this.hasLetter(value),
                                    isContainNum: this.hasNumber(value),
                                    isContainSpecial: this.hasSpecial(value),
                                })}
                            />
                            {/* //================================ CheckBoxs ======================================// */}
                            <View style={styles.checkBoxContainer}>
                                <View style={styles.checkBoxIcon}>
                                    <Image
                                        style={styles.checkBoxIconStyle}
                                        source={isLeast6Char ? images.ic_check_active : images.ic_check_inactive}
                                    />
                                </View>
                                <View style={styles.checkBoxText}>
                                    <Text
                                        style={[
                                            styles.checkBoxTextStyle,
                                        ]}>
                                        At least 6 characters long
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.checkBoxContainer}>
                                <View style={styles.checkBoxIcon}>
                                    <Image
                                        style={styles.checkBoxIconStyle}
                                        source={isContainLetter ? images.ic_check_active : images.ic_check_inactive}
                                    />
                                </View>
                                <View style={styles.checkBoxText}>
                                    <Text
                                        style={[
                                            styles.checkBoxTextStyle,
                                        ]}>
                                        Contains a letter
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.checkBoxContainer}>
                                <View style={styles.checkBoxIcon}>
                                    <Image
                                        style={styles.checkBoxIconStyle}
                                        source={isContainNum ? images.ic_check_active : images.ic_check_inactive}
                                    />
                                </View>
                                <View style={styles.checkBoxText}>
                                    <Text
                                        style={[
                                            styles.checkBoxTextStyle,
                                        ]}>
                                        Contains a number
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.checkBoxContainer}>
                                <View style={styles.checkBoxIcon}>
                                    <Image
                                        style={styles.checkBoxIconStyle}
                                        source={isContainSpecial ? images.ic_check_active : images.ic_check_inactive}
                                    />
                                </View>
                                <View style={styles.checkBoxText}>
                                    <Text
                                        style={[
                                            styles.checkBoxTextStyle,
                                        ]}>
                                        Contains a special character
                                    </Text>
                                </View>
                            </View>
                            <Button
                                width={'100%'}
                                style={styles.buttonStyles}
                                title={'Sign Up'}
                                titleStyle={[styles.titleStyles]}
                                onPress={() => this.validateSubmit()}
                            />
                        </View>
                    </View>
                    {/* //================================ Buttons ======================================// */}
                    {/*<View style={styles.buttonView}>*/}
                    {/*<Button*/}
                    {/*  height={hp(8)}*/}
                    {/*  width={'80%'}*/}
                    {/*  style={styles.buttonStyles}*/}
                    {/*  title={'Sign Up'}*/}
                    {/*  titleColor={colors.appBlue}*/}
                    {/*  titleStyle={[styles.titleStyles]}*/}
                    {/*  onPress={() => this.setModalVisible(true)}*/}
                    {/*/>*/}
                    {/*</View>*/}
                    <View style={styles.lowerView}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('LoginScreen')}>
                            <Text style={styles.textStyle}>Already have an account?</Text>
                        </TouchableOpacity>
                    </View>
                    {/* //================================ modal ======================================// */}
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            this.setModalVisible(!modalVisible);
                        }}>
                        <MyModel
                            onPressPrivacy={() => this.Privacy()}
                            onPressTerm={() => this.navigateScreen()}
                            onPressCondition={() => this.navigateScreen()}
                            onPressAgree={() => this.onCreateWithEmailAndPassword()}
                            onPressCancel={() => {
                                this.setModalVisible(!modalVisible);
                            }}
                        />
                    </Modal>

                    <Spinner
                        visible={spinner}
                        textContent={'Creating...'}
                        textStyle={styles.spinnerTextStyle}
                    />
                </View>
            </ImageBackground>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    appStart: params => dispatch(appStartAction(params)),
    loginSuccess: params => dispatch(loginSuccessAction(params)),
});

export default connect(null, mapDispatchToProps)(SignUpScreen);

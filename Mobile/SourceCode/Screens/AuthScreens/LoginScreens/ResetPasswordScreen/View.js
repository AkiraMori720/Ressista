//================================ React Native Imported Files ======================================//

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {View, Text, Alert, Image, StatusBar, ImageBackground, ScrollView} from 'react-native';
import React from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';

//================================ Local Imported Files ======================================//

import AppHeader from '../../../../Components/AppHeader/AppHeader';
import AppInput from '../../../../Components/AppInput/AppInput';
import Button from '../../../../Components/Button/Button';
import colors from '../../../../Assets/Colors/colors';
import images from '../../../../Assets/Images/images';
import styles from './Styles';

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: true,
      email: '',
      password: null,
      remember: false,
      spinner: false,
    }
  }

  ShowAlert = (title, message) => {
    Alert.alert(title, message, [{ text: 'OK', onPress: () => this.props.navigation.navigate('LoginScreen') }]);
  };

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  sendResetMail = () => {
    const { email } = this.state;
    if (email.trim().length && this.validateEmail(email.trim())) {
      this.setState({ spinner: true });
      auth().sendPasswordResetEmail(this.state.email)
        .then(res => {
          console.log(res)
          this.setState({ spinner: false });
          setTimeout(() => {
            if (res == null)
              this.ShowAlert('Reset Password', 'We have sent a password reset link to your email')
          }, 100)
        })
        .catch(error => {
          this.setState({ spinner: false });
          setTimeout(() => {
            if (error.code === 'auth/invalid-email') {
              Alert.alert('Error', 'The email address is badly formatted.');
            } else if (error.code === 'auth/user-not-found') {
              Alert.alert('Error', 'There is no user record corresponding to this email.');
            } else {
              Alert.alert('Error', 'Sending Mail is failed');
            }
          }, 100);
        })
    } else {
      Alert.alert('Info', 'Please enter valid email address!');
    }
  };

  render() {
    const { email, spinner } = this.state;

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
          <AppHeader
            headerHeight="100%"
            bgColor={'transparent'}
            titleFontSize={wp(5)}
            leftIconPath={images.headerLeftBack}
            iconWidth={wp(5)}
            lefticonSize={wp(5)}
            borderBottomWidth={0.001}
            tintColor={colors.white}
            onLeftIconPress={() => this.props.navigation.goBack()}
          />
        </View>

          <View style={{ flex: 1 }}>
            {/* //================================ Logo ======================================// */}
            <View style={styles.upperView}>
              <Image style={styles.imageStyles} source={images.ressista} />
              <Text style={styles.ressistaText}>A safe place for people to discuss, address and improve as well as help others with their Mental health</Text>
              <Text style={styles.headingText}>RESET PASSWORD</Text>

            </View>
            {/* //================================ Password Input ======================================// */}
            <View style={styles.midView}>
              <View style={styles.inputView}>
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
                <View style={styles.textContainer}>
                  <Text style={styles.textStyle}>
                    Input the email used to create your account. We will send you a
                    link to reset your password.
                </Text>
                </View>
                <Button
                  width={'100%'}
                  style={styles.buttonStyles}
                  title={'RESET PASSWORD'}
                  bgColor={colors.app_button_color}
                  titleColor={colors.dark_red}
                  titleStyle={[styles.titleStyles]}
                  onPress={() => this.sendResetMail()}
                //   Alert.alert(
                //     'Reset Password',
                //     'We have sent a password reset link to your email',
                //     [{ text: 'OKAY', onPress: () => this.props.navigation.navigate('NewPassword') },],
                //   )
                // }
                />
              </View>
            </View>

            <Spinner
              visible={spinner}
              textContent={''}
            />
          </View>
      </ImageBackground>
    );
  }
}

export default ResetPassword;

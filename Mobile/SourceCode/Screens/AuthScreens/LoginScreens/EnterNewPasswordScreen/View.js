//================================ React Native Imported Files ======================================//
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {View, Text, StatusBar, Image, ScrollView, ImageBackground} from 'react-native';
import React from 'react';

//================================ Local Imported Files ======================================//

import AppHeader from '../../../../Components/AppHeader/AppHeader';
import CheckBox from '../../../../Components/CheckBox/CheckBox';
import AppInput from '../../../../Components/AppInput/AppInput';
import Button from '../../../../Components/Button/Button';
import images from '../../../../Assets/Images/images';
import colors from '../../../../Assets/Colors/colors';
import styles from './Styles';

class NewPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: true,
      showConfirmPassword: true,
    };
  }


  togglePassword() {
    this.setState({ showPassword: !this.state.showPassword });
  }
  toggleConfirmPassword() {
    this.setState({ showConfirmPassword: !this.state.showConfirmPassword });
  }

  render() {
    return (
      <ImageBackground style={styles.mainContainer} source={images.bgImage}>
        <View style={styles.headerView}>
          {/* //================================ StatusBar ======================================// */}
          <StatusBar
            barStyle="dark-content"
            hidden={false}
            backgroundColor={colors.dark_red}
            translucent={false}
          />

          {/* //================================ Header ======================================// */}
          <AppHeader
            titleFontSize={wp(5)}
            leftIconPath={images.headerLeftBack}
            iconWidth={wp(3)}
            lefticonSize={wp(5)}
            bgColor={'transparent'}
            borderBottomWidth={0.001}
            tintColor={colors.white}
            onLeftIconPress={() => this.props.navigation.goBack()}
          />
        </View>

        {/*<ScrollView style={{flex:1,}}>*/}
        <View style={styles.container}>

          {/* //================================ Logo ======================================// */}
          <View style={styles.upperView}>
            <Image style={styles.imageStyles} source={images.ressista}/>
            <Text style={styles.ressistaText}>A safe place for people to discuss, address and improve as well as help others with their Mental health</Text>
            <Text style={styles.headingText}>ENTER NEW PASSWORD</Text>
          </View>
          {/* //================================ Input Fields ======================================// */}
          <View style={styles.midView}>
            <View style={styles.inputsView}>
            <AppInput
              height={hp(6)}
              placeholder={'John'}
              width={'100%'}
              colortextInput={colors.black}
              paddingLeft={wp(5)}
              placeholderTextColor={colors.placeholder_text_color}
              marginBottom={wp(3)}
              marginTop={5}
              borderRadius={wp(7)}
              backgroundColor={colors.white}
              borderBottomWidth={1}
              borderColor={colors.app_light_yellow}
            />
              <AppInput
                  height={hp(6)}
                  placeholder={'Smith'}
                  width={'100%'}
                  colortextInput={colors.black}
                  paddingLeft={wp(5)}
                  placeholderTextColor={colors.placeholder_text_color}
                  marginBottom={wp(3)}
                  marginTop={5}
                  borderRadius={wp(7)}
                  backgroundColor={colors.white}
                  borderBottomWidth={1}
                  borderColor={colors.app_light_yellow}
              />
              <AppInput
                  height={hp(6)}
                  placeholder={'sample@email.com'}
                  width={'100%'}
                  colortextInput={colors.black}
                  paddingLeft={wp(5)}
                  placeholderTextColor={colors.placeholder_text_color}
                  marginBottom={wp(3)}
                  marginTop={5}
                  borderRadius={wp(7)}
                  backgroundColor={colors.white}
                  borderBottomWidth={1}
                  borderColor={colors.app_light_yellow}
              />
            <AppInput
              height={hp(6)}
              borderRadius={wp(7)}
              placeholder={'New Password'}
              width={'100%'}
              marginTop={5}
              secureEntry={this.state.showPassword}
              onRightIconPress={() => this.togglePassword()}
              colortextInput={colors.black}
              paddingLeft={wp(5)}
              placeholderTextColor={colors.placeholder_text_color}
              rightIconSize={wp(5)}
              marginBottom={wp(3)}
              backgroundColor={colors.white}
              borderBottomWidth={1}
              borderColor={colors.app_light_yellow}
            />
            <AppInput
              height={hp(6)}
              borderRadius={wp(7)}
              placeholder={'Confirm New Password'}
              width={'100%'}
              marginTop={5}
              secureEntry={this.state.showPassword}
              onRightIconPress={() => this.togglePassword()}
              colortextInput={colors.black}
              paddingLeft={wp(5)}
              placeholderTextColor={colors.placeholder_text_color}
              rightIconSize={wp(5)}
              marginBottom={wp(3)}
              backgroundColor={colors.white}
              borderBottomWidth={1}
              borderColor={colors.app_light_yellow}
            />
            <View style={styles.checkBoxContainer}>
              <CheckBox bgColor={'none'} checkTitle={'Remember Me'}/>

            </View>
              <Button
                  height={hp(8)}
                  width={'100%'}
                  style={styles.buttonStyles}
                  title={'Save Changes'}
                  titleStyle={styles.titleStyles}
                  onPress={() => this.props.navigation.navigate('LoginScreen')}
              />
            </View>

          </View>
          <View style={{flex:0.05,backgroundColor:'rgba(0,0,0,0.4)'}}>

          </View>

        </View>

        {/*</ScrollView>*/}
      </ImageBackground>
    );
  }
}

export default NewPassword;

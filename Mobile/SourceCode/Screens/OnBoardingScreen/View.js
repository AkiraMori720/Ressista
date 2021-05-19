
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {View, Text, StatusBar, Image, TouchableOpacity, ImageBackground} from 'react-native';
import React from 'react';
import Button from '../../Components/Button/Button';
import images from '../../Assets/Images/images';
import colors from '../../Assets/Colors/colors';
import Swiper from 'react-native-swiper';
import styles from './Styles';
import {ROOT_ONBOARD, ROOT_OUTSIDE} from '../../Actions/app';
import { appStart as appStartAction } from '../../Actions/app';
import { connect } from 'react-redux';
import PropsType from 'prop-types';

class OnBoarding extends React.Component {
  static propTypes = {
    appStart: PropsType.func
  }

  constructor(props) {
    super(props);
    this.state = {
      newIndex: 1,
      currentIndex: 0,
    };
  }

  onIndexChanged(index) {
    this.setState({ currentIndex: index });
  }

  scrollItem() {
    const { appStart } = this.props;
    if (this.state.currentIndex === 4) {
      appStart({ root: ROOT_OUTSIDE });
    } else {
      this.refs.swiper.scrollBy(1);
    }
  }
  render() {
    return (
      <ImageBackground  style={styles.mainContainer} source={images.bgImage}>
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor={colors.app_background}
          translucent={false}
        />
        <View style={styles.upperView}>
          <Swiper
            showsButtons={false}
            loop={false}
            ref={'swiper'}
            onIndexChanged={this.onIndexChanged.bind(this)}
            activeDotColor={colors.white}
            dotColor={colors.white}
            activeDot={
              <View
                style={{
                  backgroundColor: colors.app_button_color,
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  marginLeft: 3,
                  marginRight: 3,
                  marginTop: 3,
                  marginBottom: 3
                }}
              />
            }>
            <View style={styles.slides}>
              <View style={styles.imageView}>
                <Image
                  style={styles.imageStyles}
                  source={images.ressista}
                />
                <Text style={styles.textStyleWelcome}>The app allows users to help others with their mental health and choose several categories that are right for them to find proper guidance.</Text>
              </View>
              <View style={styles.midView}>
                <Image
                    style={styles.boardStyles}
                    source={images.onboard_1}
                />
              </View>
            </View>
            <View style={styles.slides}>
              <View style={styles.imageView}>
                <Image
                    style={styles.imageStyles}
                    source={images.ressista}
                />
                <Text style={styles.textStyleWelcome2}>The app's forum page enables users to vent out and ask for advice.</Text>
              </View>
              <View style={styles.midView}>
                <Image
                    style={styles.boardStyles}
                    source={images.onboard_2}
                />
              </View>
            </View>
            <View style={styles.slides}>
              <View style={styles.imageView}>
                <Image
                    style={styles.imageStyles}
                    source={images.ressista}
                />
                <Text style={styles.textStyleWelcome}>Search and comment, create a forum topics and use the Live Chat with other users for discussion.</Text>
              </View>
              <View style={styles.midView}>
                <Image
                    style={styles.boardStyles}
                    source={images.onboard_3}
                />
              </View>
            </View>
            <View style={styles.slides}>
              <View style={styles.imageView}>
                <Image
                    style={styles.imageStyles}
                    source={images.ressista}
                />
                <Text style={styles.textStyleWelcome}>User will have direct access to daily affirmation quotes and physical health tips within the app.</Text>
              </View>
              <View style={styles.midView}>
                <Image
                    style={styles.boardStyles}
                    source={images.onboard_4}
                />
              </View>
            </View>
            <View style={styles.lastSlides}>
              <View style={styles.imageView}>
                <Image
                    style={styles.imageStyles}
                    source={images.ressista}
                />
                <Text style={styles.textStyleWelcome}><Text style={styles.textStyleTitle}>RESSISTA</Text> is a community forum help app that is a safe place for users to discuss, address or improve mental health.</Text>
              </View>
            </View>
          </Swiper>
        </View>

        <View style={styles.lowerView}>
          <Button
            height={hp(8)}
            width={'80%'}
            style={styles.buttonStyles}
            title={'Continue'}
            titleColor={colors.dark_red}
            titleStyle={[styles.titleStyles]}
            onPress={() => this.scrollItem()}
          />
          {
            <TouchableOpacity
              style={{
                width: wp('70%'),
                marginTop: wp(3),
                height: hp('7%'),
                alignItems: 'center',
              }}
              onPress={() => {
                const { appStart } = this.props;
                appStart({ root: ROOT_OUTSIDE });
              }}>
              <Text
                style={{
                  color: colors.white,
                  fontWeight:'bold',
                  fontSize: wp(4.3),
                  textDecorationLine: 'underline',
                }}>
                Skip
              </Text>
            </TouchableOpacity>
          }
        </View>
      </ImageBackground>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  appStart: params => dispatch(appStartAction(params)),
});

export default connect(null, mapDispatchToProps)(OnBoarding);

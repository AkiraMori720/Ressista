//================================ React Native Imported Files ======================================//

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { StyleSheet } from 'react-native';

//================================ Local Imported Files ======================================//

import colors from '../../Assets/Colors/colors';

const Styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  upperView: {
    flex: 1,
    paddingTop: '6%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor:'rgba(0,0,0,0.4)'
  },
  imageView: {
    paddingTop: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  midView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: wp(4)
  },
  lowerView: {
    paddingTop: wp(5),
    alignItems: 'center',
    backgroundColor:'rgba(0,0,0,0.4)'

  },
  imageStyles: {
    height: wp(30),
    width: wp(50),
    resizeMode: 'contain',
  },
  boardStyles: {
    height: wp(100),
    width: wp(90),
    borderRadius: 12,
    resizeMode: 'contain',
  },
  textStyle: {
    fontSize: wp(5),
    color: colors.white,
    textAlign: 'center',
  },
  textStyleWelcome: {
    fontSize: wp(5.5),
    color: colors.white,
    textAlign: 'center',
    lineHeight: wp(8),
    paddingHorizontal: '3%',
  },
  textStyleWelcome2: {
    fontSize: wp(5.5),
    color: colors.white,
    textAlign: 'center',
    lineHeight: wp(8),
    paddingHorizontal: '3%',
    paddingBottom: 20
  },
  textStyleTitle: {
    fontSize: wp(5.5),
    marginBottom: wp(2),
    color: colors.white,
    textAlign: 'center',
    paddingHorizontal: '3%',
    lineHeight:wp(10),
    fontWeight: 'bold'
  },
  textStyleNetwork: {
    fontSize: wp(5),
    marginBottom: wp(2),
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonStyles: {
    borderRadius: wp(7),
    height: hp(8),
    width: '80%',
  },
  titleStyles: {
    color: colors.black,
    fontSize:16,
    fontWeight: 'bold'
  },
  slides: {
    flex: 1
  },
  lastSlides: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Styles;

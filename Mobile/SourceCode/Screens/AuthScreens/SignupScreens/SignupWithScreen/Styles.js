//================================ React Native Imported Files ======================================//

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {StyleSheet} from 'react-native';

//================================ Local Imported Files ======================================//

import colors from '../../../../Assets/Colors/colors';

const Styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // backgroundColor: colors.app_background,
  },
  headerView: {
    flex: 0.09,
    backgroundColor: 'rgba(0,0,0,0.4)'
  },
  upperView: {
    flex: 0.35,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)'

  },
  headingText:{
    fontSize: wp(6),
    color: colors.white,
    fontWeight:'bold',
    paddingTop: '7%'
  },
  ressistaText:{
    fontSize: wp(4.1),
    color: colors.white,
    fontWeight:'500',
    width:'85%',
    lineHeight:wp(6),
    textAlign:'center'
  },
  textStyle1: {
    fontSize: wp(4.5),
    color: colors.appYellow,
    textAlign: 'center',
    marginBottom: wp(8),
  },
  midView: {
    flex: 0.46,
    width:wp(100),
    // width:wp(92),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'center',
    paddingTop: wp(2),
    // paddingHorizontal: wp(5),
    // backgroundColor: colors.white,
    backgroundColor: 'rgba(0,0,0,0.4)'
    // borderRadius: wp(3),
  },
  buttonsView:{
    height:'85%',
    width:'90%',
    backgroundColor:colors.white,
    justifyContent:'center',
    alignItems:'center',
    borderRadius: wp(4)
  },
  lowerView: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)'
  },
  imageStyles: {
    height: '40%',
    width: '50%',
    resizeMode: 'contain',
  },
  textStyle: {
    fontSize: wp(4),
    color: colors.app_button_color,
    textAlign: 'center',
    fontWeight:'bold',
    textDecorationLine: 'underline',
  },
  buttonStyles: {
    borderRadius: wp(7),
    height: hp(8),
    width: '90%',
    paddingLeft: wp(5),
    marginBottom: wp(2),
  },
  titleStyles: {
    color: colors.black,
    fontSize: wp(4),
    fontWeight: 'bold',
  },
  titleStylesEmail: {
    color: colors.white,
    fontSize: wp(4),
    fontWeight: 'bold',
  },
  iconStyles: {
    height: wp(4),
    width: wp(4),
    marginLeft: wp(3),
  },
});
export default Styles;

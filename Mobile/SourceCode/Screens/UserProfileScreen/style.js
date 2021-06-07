//================================ React Native Imported Files ======================================//

import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {StyleSheet,Platform} from 'react-native';

//================================ Local Imported Files ======================================//

import colors from '../../Assets/Colors/colors';

const Styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor:colors.app_background,
    },
    headerContainer: {
        flex: 0.1,
    },
    container: {
        paddingTop: 24
    },
    imageView:{
        alignItems:'center',
        justifyContent:'center',
        // backgroundColor:'red',
    },
    image:{
        height:Platform.OS === 'ios' ?wp(30) :wp(25),
        width:Platform.OS === 'ios' ?wp(30) :wp(25),
        resizeMode:'contain',
        borderRadius: 64
    },
    name:{
        fontSize:wp(4.7),
        fontWeight:'bold',
        color:colors.black,
        paddingTop: '3%'
    },
    number:{
        fontSize:wp(3.8),
        color:colors.black,
    },
    noUser: {
        fontSize:wp(4),
    },
    iconMarker:{
        height: 18,
        width: 18,
        resizeMode: 'contain'
    },
    viewAddress:{
        flexDirection:'row',
        alignItems:'center',
        paddingTop:'1.5%'
    },
    buttonsView:{
        // backgroundColor:'orange',
        flexDirection: 'row',
        marginTop: 24,
        justifyContent: 'center'
    },

});
export default Styles;

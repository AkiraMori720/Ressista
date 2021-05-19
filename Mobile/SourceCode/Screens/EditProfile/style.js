//================================ React Native Imported Files ======================================//

import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {StyleSheet,Platform} from 'react-native';

//================================ Local Imported Files ======================================//

import colors from '../../Assets/Colors/colors';

const Styles = StyleSheet.create({
    loadingContainer: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
        opacity: 0.1,
        zIndex: 100,
        width: '100%',
        height: '100%'
    },
    loading:{
        zIndex: 100,
        position: 'absolute',
        width: '100%',
        height: '100%'
    },
    mainContainer: {
        flex: 1,
        backgroundColor:colors.app_background,
    },
    headerContainer: {
    },
    container: {

    },
    imageView:{
        height:hp(27),
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
    inputsView:{
        height:hp(90),
        // backgroundColor:"green"
    },
    textTitles:{
        fontSize:wp(3.8),
        fontWeight: '500',
        paddingLeft:'12%',
        paddingVertical:'3%'
    },
    errorMessage:{
        color: '#ff0000',
        paddingLeft:'12%'
    },
    dropdownView:
        {
            height:hp(6),
            width:'88%',
            alignSelf:'center',
            justifyContent:'center',
            alignItems:'center',
            // marginBottom:wp(2.5),
            paddingLeft:'5%',
            backgroundColor:colors.app_light_yellow,
            borderRadius:wp(7),
            paddingRight:'4%'

        },
    viewCheckBox:{
        alignSelf: 'flex-end',
        paddingRight: '12%',
        paddingTop:'3%'
    },
    locationView:{
        height:hp(6),
        width:'88%',
        flexDirection: 'row',
        alignSelf:'center',
        justifyContent:'space-between',
        alignItems:'center',
        // marginBottom:wp(2.5),
        paddingLeft:'5%',
        backgroundColor:colors.app_light_yellow,
        borderRadius:wp(7),
        paddingRight:'6%',

    },
    icon:{
        height: 14,
        width: 14,
        resizeMode: 'contain'
    },
    btnView:{
        height:hp(16),
        alignItems:'center',
        justifyContent:'center',
        // backgroundColor:'red'
    }


});
export default Styles;

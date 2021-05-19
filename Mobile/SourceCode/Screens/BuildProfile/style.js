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
    mainContainer:
    {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)'
    },
    upperView:
    {
        paddingTop: 32,
        justifyContent: 'center',
        alignItems: 'center'
    },
    midView:
    {
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageStyles:
    {
        width: '50%',
        resizeMode: 'contain'
    },
    headingText:{
        fontSize: wp(6),
        color: colors.white,
        fontWeight:'bold',
        paddingTop: 12
    },
    headerContainer: {
    },
    container: {
        flex:1,
        backgroundColor: 'rgba(0,0,0,0.4)',
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

    },
    textTitles:{
        fontSize:wp(3.8),
        fontWeight: '500',
        paddingLeft:'12%',
        paddingVertical:'3%',
        color: 'white'
    },
    errorMessage:{
        color: '#ff0000',
        paddingLeft:'12%'
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

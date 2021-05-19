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
    imageView:{
        paddingTop: 12,
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
    buttonsView:{
        marginVertical: 8,
        // backgroundColor:'orange',
        flexDirection: 'row',
        // alignItems:'center',
        justifyContent: 'center'
    },
    buttonForums:{
        height:hp(5),
        borderTopLeftRadius:wp(2),
        borderBottomLeftRadius:wp(2),
        borderTopWidth:2,
        borderLeftWidth:2,
        borderBottomWidth:2,
        borderColor:colors.app_light_yellow
    },
    buttonAffirmations:{
        height:hp(5),
        borderTopRightRadius:wp(2),
        borderBottomRightRadius:wp(2),
        borderTopWidth: 2,
        borderRightWidth:2,
        borderBottomWidth: 2,
        borderColor:colors.app_light_yellow
    },
    textStyleButtons:{
        fontSize:16,
        fontWeight: 'bold',
    },
    flatListView:{
        flex: 1,
    },
    loading: {
        zIndex: 100,
        position: 'absolute',
        width: '100%',
        height: '100%'
    }
});
export default Styles;

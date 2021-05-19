//================================ React Native Imported Files ======================================//

import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {StyleSheet,Platform} from 'react-native';

//================================ Local Imported Files ======================================//

import colors from '../../../Assets/Colors/colors';

const Styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor:colors.grey,
    },
    headerContainer: {
        flex: 0.1,
    },
    container: {
        flex: 0.9,
    },
    textView:{
        flex:0.8,
        // backgroundColor: 'red',
        alignItems:'center',
        justifyContent:'center'
    },
    title:{
        fontSize:wp(4.5),
        fontWeight:'bold'
    },
    buttonView:{
        flex:0.2,
        // backgroundColor:'green',
        alignItems:'center',
        justifyContent:'center'
    },
    img:{
        height:wp(20),
        width:wp(20),
        resizeMode:'contain',
        tintColor:colors.white
    }

});
export default Styles;

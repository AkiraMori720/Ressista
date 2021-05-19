//================================ React Native Imported Files ======================================//
import { StyleSheet } from "react-native";
import colors from '../../Assets/Colors/colors';

const Styles = StyleSheet.create({

    mainContainer:
    {
        flex: 1,
        alignItems:'center',
        justifyContent:'center',
        // backgroundColor:colors.app_background
    },
    image:{
        height:'100%',
        width:'100%',
        resizeMode:'cover'
    }
});
export default Styles;

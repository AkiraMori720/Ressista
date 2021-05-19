import { StyleSheet } from "react-native";
import colors from "../../Assets/Colors/colors";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const Styles = StyleSheet.create({

    mainContainer:
    {
        flex: 1,
        // flexDirection: "row"
        // backgroundColor: "red",

    },
    ImageContainer: {
        height: hp(25),
        width: "100%",
        // flexDirection: "row",
        // backgroundColor: 'red',


    },
    imageStylesAvatar: {
        height: hp(10),
        width: wp(20),
        // tintColor:colors.white,
        resizeMode: 'contain'
    },

});
export default Styles;
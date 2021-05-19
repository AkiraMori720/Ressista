//================================ React Native Imported Files ======================================//

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { StyleSheet } from "react-native";

//================================ Local Imported Files ======================================//

import colors from "../../../Assets/Colors/colors";

const Styles = StyleSheet.create({

    mainContainer:
    {
        flex: 1,
        backgroundColor: colors.app_background,
    },

    headerView:
    {
        backgroundColor: colors.appDarkBlue
    },
    container:
    {
        borderTopColor: colors.white,
        paddingHorizontal: wp(4),
    },
    logout:
    {
        backgroundColor: colors.AppRedColor,
        marginHorizontal: wp(4),
        paddingLeft: wp(9),
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: wp(1)

    },
    textStyle:
    {
        fontSize: wp(4.5),
        paddingLeft: wp(5),
        color: colors.dark_red
    },
    logoutIcon:
    {
        height: wp(5),
        width: wp(5),
        resizeMode: 'contain',
        tintColor: colors.white
    },

});
export default Styles;

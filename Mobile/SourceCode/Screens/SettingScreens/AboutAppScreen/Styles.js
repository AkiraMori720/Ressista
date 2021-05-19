
//================================ React Native Imported Files ======================================//

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { StyleSheet } from "react-native";

//================================ Local Imported Files ======================================//

import colors from "../../../Assets/Colors/colors";

const Styles = StyleSheet.create({

    mainContainer:
    {
        flex: 1,
        backgroundColor: colors.app_background
    },

    headerView:
    {
        backgroundColor: colors.appDarkBlue,
        flex: 0.09
    },
    uperView: {
        flex: 0.5,
        backgroundColor: colors.appDarkBlue,

    },
    uperImageView: {
        flex: 0.7,
        backgroundColor: colors.white,
        justifyContent: "center",
        alignItems: "center"
    },
    imageStyles:
    {
        height: wp(50),
        width: wp(50),
        resizeMode: 'contain'
    },
    uperImageTextView: {
        flex: 0.1,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: wp(4),
        backgroundColor: colors.appDarkBlue

    },
    CompagainTextStyle: {
        fontSize: wp(4.5),
        color: colors.black
    },
    CopyrightTextStyle: {
        fontSize: wp(3.5),
        color: colors.black
    },
    DeveloperTextStyle: {
        fontSize: wp(3.5),
        color: colors.black
    },
    VersionTextStyle: {
        fontSize: wp(3.5),
        color: colors.black
    },
    uperText1View: {
        flex: 0.06,
        backgroundColor: colors.white,
        justifyContent: "center",
        alignItems: "center",

    },
    uperText2View: {
        flex: 0.06,
        backgroundColor: colors.white,
        justifyContent: "center",
        alignItems: "center",

    },
    uperText3View: {
        flex: 0.08,
        backgroundColor: colors.white,
        justifyContent: "center",
        alignItems: "center",

    },
    BottomTextView: {
        flex: 0.3,
        backgroundColor: colors.white,
        paddingHorizontal: wp(8),
        paddingTop: wp(4)

    },
    titleStyles: {
        color: colors.white,
        fontSize: wp(4),
        fontWeight: "bold"
    },
    BottonView: {
        flex: 0.11,
        marginHorizontal: wp(3),
        justifyContent: "center",
        alignItems: "center"
    },
    buttonStyles:
    {
        borderRadius: wp(7),
        height: hp(8),
        width: '100%',
    },
    MainTextStyle: {
        fontSize: wp(3.5),
        color: colors.black
    },
});
export default Styles;

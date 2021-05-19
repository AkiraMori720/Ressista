import { StyleSheet,Platform } from "react-native";
import colors from "../../Assets/Colors/colors";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({

    mainContainer:
    {
        flex: 1,
        // backgroundColor: "red",


    },
    MainFlatListContainer: {
        height: hp(30),
        // backgroundColor: colors.AppBlueColor,
        // paddingHorizontal: wp(4),
        marginTop: wp(2),
        borderWidth:Platform.OS === 'ios' ? 0.3 : 0.5,
        borderColor:colors.placeholder_text_color
    },
    bottomContainer: {
        height: hp(20.9),
        backgroundColor: colors.white,
        paddingTop: wp(3)
    },
    datetimeContainer: {
        height: hp(4),
        // backgroundColor: 'red',
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",

    },
    addressContainer: {
        height: hp(4),
        // backgroundColor: 'green',
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },
    mapContainer: {
        height: hp(4),
        // backgroundColor: 'blue',
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },
    reportedContainer: {
        height: hp(4),
        // backgroundColor: 'green',
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"

    },
    titleContainer: {
        height: hp(9),
        width: '100%',
        backgroundColor: colors.AppPinkColor,
        // justifyContent: "center",
        // alignItems: "center",
        flexDirection: "row",

    },
    titleViewContainer: {
        height: hp(9),
        width: '90%',
        // backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: "center",
    },
    markerImageStyles: {
        height: wp(4),
        width: wp(4),
        // tintColor: colors.AppRedColor,
        resizeMode: 'contain'
    },
    imageViewContainer: {
        height: hp(9),
        width: '10%',
        // backgroundColor: 'yellow',
        justifyContent: "center",
        alignItems: 'center',
        paddingRight: wp(2)
    },
    titleTextStyleContainer: {
        fontSize: wp(4),
        fontWeight: "bold"

    },
    textStyleContainer: {
        fontWeight: "bold",

    },
    textStyleLightContainer: {
        color: colors.grey1


    },
    UsertextStyleContainer: {
        color: colors.AppGreyColor,
    },
    mapStyleContainer: {
        color: colors.AppBlueColor,
        textDecorationLine: 'underline',
    },
});
export default styles;


//================================ React Native Imported Files ======================================//

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { StyleSheet } from "react-native";

//================================ Local Imported Files ======================================//

import colors from '../../Assets/Colors/colors';

const Styles = StyleSheet.create({

    mainContainer:
    {
        flex: 1,
    },

    headerView:
    {
        flex: 0.09,
        backgroundColor: 'rgba(0,0,0,0.4)'

    },
    upperView:
    {
        flex: 0.35,
        // width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)'

    },
    headingText: {
        fontSize: wp(6),
        color: colors.white,
        fontWeight: 'bold',
        paddingTop: '5%'
    },
    ressistaText: {
        fontSize: wp(4.1),
        color: colors.white,
        fontWeight: '500',
        width: '85%',
        lineHeight: wp(6),
        textAlign: 'center'
    },
    midView:
    {
        flex: 0.56,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: hp(2),
        paddingBottom: hp(5),
        backgroundColor: 'rgba(0,0,0,0.4)'
    },
    inputsView: {
        height: '100%',
        width: '90%',
        backgroundColor: colors.white,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: wp(4)
    },

    imageStyles:
    {
        height: '40%',
        width: '50%',
        resizeMode: 'contain'
    },
    textStyle:
    {
        fontSize: wp(4),
        color: colors.bright_red,
        textAlign: 'center',
        textDecorationLine: "underline",
    },
    buttonStyles:
    {
        borderBottomLeftRadius: wp(4),
        borderBottomRightRadius: wp(4),
        marginTop: 15
    },
    titleStyles: {
        color: colors.black,
        fontSize: wp(4),
        fontWeight: "bold"
    },
    addButtonContainer: {
        width: '87%',
        alignItems: 'flex-end',
    },
    textAddMore: {
        fontSize: wp(4),
        color: colors.black,
        fontWeight: '500'
    },
    checkBoxContainer:
    {
        justifyContent: 'center',
        flexDirection: 'row',
        paddingHorizontal: wp(4)
    },
    checkBoxIcon:
    {
        flex: 0.1,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    checkBoxIconStyle:
    {
        height: wp(4),
        width: wp(4),
        resizeMode: 'contain',
    },
    checkBoxText:
    {
        flex: 0.9,
        paddingHorizontal: wp(2),
        justifyContent: 'center',
    },
    checkBoxTextStyle:
    {
        fontSize: wp(3.5),
        color: colors.black,
    },
});
export default Styles;

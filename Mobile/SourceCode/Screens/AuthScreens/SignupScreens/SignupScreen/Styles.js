
//================================ React Native Imported Files ======================================//

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { StyleSheet } from "react-native";

//================================ Local Imported Files ======================================//

import colors from '../../../../Assets/Colors/colors';


const Styles = StyleSheet.create({
    mainContainer:
    {
        flex: 1,
        backgroundColor: colors.app_background,
    },
    headerView:
    {
        backgroundColor: 'rgba(0,0,0,0.4)'
    },
    upperView:
    {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)'

    },
    headingText: {
        fontSize: wp(6),
        color: colors.white,
        fontWeight: 'bold',
        marginVertical: 8
    },
    ressistaText: {
        fontSize: wp(4.1),
        color: colors.white,
        fontWeight: '500',
        width: '85%',
        lineHeight: wp(6),
        textAlign: 'center'
    },
    inputsView: {
        width: '90%',
        backgroundColor: colors.white,
        borderRadius: wp(4)
    },
    textStyle1:
    {
        fontSize: wp(5),
        color: colors.appYellow,
        textAlign: 'center',
        marginBottom: wp(3)
    },
    midView:
    {
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonView:
    {
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingTop: wp(2),
        backgroundColor: 'rgba(0,0,0,0.4)'

    },
    lowerView:
    {
        marginTop: 16,
        paddingVertical:4,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)'
    },
    imageStyles:
    {
        width: '50%',
        resizeMode: 'contain'
    },
    textStyle:
    {
        fontSize: wp(4),
        color: colors.app_button_color,
        textAlign: 'center',
        fontWeight: 'bold',
        textDecorationLine: "underline",
    },
    buttonStyles:
    {
        width: '100%',
        marginTop: 25,
        // marginBottom: wp(4),
        borderBottomLeftRadius: wp(4),
        borderBottomRightRadius: wp(4),

    },
    titleStyles: {
        color: colors.black,
        fontSize: wp(4.5),
        fontWeight: "bold"
    },
    checkBoxContainer:
    {
        marginLeft: 16,
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: wp(4)
    },
    checkBoxIcon:
    {
        alignItems: 'flex-end',
    },
    checkBoxText:
    {
        paddingHorizontal: wp(2),
    },
    checkBoxIconStyle:
    {
        height: wp(4),
        width: wp(4),
        resizeMode: 'contain',
    },
    checkBoxTextStyle:
    {
        fontSize: wp(3.5),
        color: colors.black,
    },
    spinnerTextStyle: {
        color: '#FFF'
    }

});
export default Styles;

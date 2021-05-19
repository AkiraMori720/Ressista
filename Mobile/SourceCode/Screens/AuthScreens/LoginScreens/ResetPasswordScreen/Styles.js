
//================================ React Native Imported Files ======================================//

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { StyleSheet } from "react-native";

//================================ Local Imported Files ======================================//

import colors from '../../../../Assets/Colors/colors';

const Styles = StyleSheet.create({

    mainContainer:
    {
        flex: 1,
        backgroundColor: colors.appDarkBlue
    },

    headerView:
    {
        backgroundColor: 'rgba(0,0,0,0.4)'

    },
    textStyle1:
    {
        fontSize: wp(5),
        color: colors.appYellow,
        textAlign: 'center',
        marginBottom: wp(8)
    },
    upperView:
    {
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ressistaText: {
        fontSize: wp(4.1),
        color: colors.white,
        fontWeight: '500',
        width: '85%',
        lineHeight: wp(6),
        textAlign: 'center'
    },
    titleStyles: {
        color: colors.black,
        fontSize: wp(4),
        fontWeight: "bold"
    },
    midView:
    {
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: wp(2),
    },
    inputView: {
        width: '90%',
        minHeight: hp(100) * 0.25,
        backgroundColor: colors.white,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: wp(4)
    },
    lowerView:
    {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',

    },
    imageStyles:
    {
        width: '50%',
        resizeMode: 'contain'
    },
    headingText: {
        fontSize: wp(6),
        color: colors.white,
        fontWeight: 'bold',
        paddingTop: '8%'
    },
    textStyle:
    {
        fontSize: wp(4),
        color: colors.black,
        textAlign: 'center'
    },
    buttonStyles:
    {
        backgroundColor: 'rgba(0,0,0,0.4)',
        width: '85%',
        // backgroundColor: colors.white,
        // marginBottom: wp(4),
        borderBottomRightRadius: wp(4),
        borderBottomLeftRadius: wp(4),
    },
    textContainer:
    {
        paddingHorizontal: wp(10),
        marginBottom: 8,
        justifyContent: 'center',
        alignItems: 'center',
    }

});
export default Styles;

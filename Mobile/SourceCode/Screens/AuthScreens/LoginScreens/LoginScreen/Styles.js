//================================ React Native Imported Files ======================================//

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { StyleSheet,Platform } from "react-native";

//================================ Local Imported Files ======================================//

import colors from '../../../../Assets/Colors/colors';


const Styles = StyleSheet.create({

    mainContainer:
    {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)'
    },
    headerView:
    {
        backgroundColor: 'rgba(0,0,0,0.4)'
    },
    upperView:
    {
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    ressistaText:{
        fontSize: wp(4.1),
        color: colors.white,
        fontWeight:'500',
        width:'85%',
        lineHeight:wp(6),
        textAlign:'center',

    },
    appleView:{
        paddingVertical: 8,
        width:'88%',
        borderWidth:1.5,
        borderColor:colors.white,
        borderRadius: wp(2),
        alignItems:'center',
        justifyContent:'center',
        marginTop: wp(5)
    },
    loginText:{
        fontSize: wp(4),
        color: colors.white,
        textAlign: 'center',
        textDecorationLine: 'underline',
        fontWeight:'500'
    },
    appleID:{
        fontSize: wp(4.3),
        color: colors.yellow,
        textAlign: 'center',
        fontWeight:'bold'
    },
    textStyle1:
    {
        fontSize: wp(5),
        color: colors.appYellow,
        textAlign: 'center',
    },
    midView:
    {
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16
    },
    inputsView:{
        width:'90%',
        minHeight: hp(100) * 0.3,
        backgroundColor:colors.white,
        justifyContent:'space-between',
        alignItems:'center',
        borderRadius: wp(4)
    },
    lowerView:
    {
        marginTop: 16,
        paddingVertical: 4,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageStyles:
    {
        width: '50%',
        resizeMode: 'contain'
    },
    headingText:{
        fontSize: wp(6),
        color: colors.white,
        fontWeight:'bold',
        paddingTop: '6%'
    },
    textStyle:
    {
        fontSize: wp(4),
        color: colors.app_button_color,
        textAlign: 'center',
        fontWeight:'bold',
        textDecorationLine: "underline",
    },
    buttonStyles:
    {
        height: hp(8),
        marginTop:25,
        borderBottomLeftRadius:wp(4),
        borderBottomRightRadius:wp(4),
        // width: '85%',
        // marginBottom: wp(4),

    },
    titleStyles: {
        color: colors.black,
        fontSize: wp(4.5),
        fontWeight: "bold"
    },
    checkBoxContainer:
    {
        width:'80%',
        alignItems:'flex-start',
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
    checkBoxIcon:
    {
        justifyContent: 'center',
        alignItems: 'flex-end',

    },
    checkBoxText:
    {
        paddingHorizontal: wp(2),
        justifyContent: 'center',
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
        color: colors.grey1,
    }

});

export default Styles;

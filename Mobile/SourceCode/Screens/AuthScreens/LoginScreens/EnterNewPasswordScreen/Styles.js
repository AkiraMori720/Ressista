
//================================ React Native Imported Files ======================================//

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { StyleSheet,Platform } from "react-native";

//================================ Local Imported Files ======================================//

import colors from '../../../../Assets/Colors/colors';

const Styles = StyleSheet.create({

    mainContainer:
    {
        flex: 1,

    },

    headerView:
    {
        flex:0.1,
        backgroundColor:'rgba(0,0,0,0.4)'

    },
    container:{
        flex:0.9,
    },
    upperView:
    {
        flex:0.35,
        // width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'rgba(0,0,0,0.4)'

    },
    headingText:{
        fontSize: wp(6),
        color: colors.white,
        fontWeight:'bold',
        paddingTop: '5%'
    },
    ressistaText:{
        fontSize: wp(4.1),
        color: colors.white,
        fontWeight:'500',
        width:'85%',
        lineHeight:wp(6),
        textAlign:'center'
    },
    midView:
    {
        flex:0.6,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: wp(2),
        backgroundColor:'rgba(0,0,0,0.4)'
        // backgroundColor: 'green'

    },
    inputsView:{
        height:'100%',
        width:'90%',
        backgroundColor:colors.white,
        justifyContent:'space-between',
        alignItems:'center',
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
        // borderRadius: wp(7),
        height: hp(8),
        width: '85%',
        backgroundColor: colors.white,
        borderBottomLeftRadius:wp(4),
        borderBottomRightRadius:wp(4),
        marginTop:15
        // marginBottom: wp(4),

    },
    titleStyles: {
        color: colors.black,
        fontSize: wp(4),
        fontWeight: "bold"
    },
    checkBoxContainer:
    {
        flex: Platform.OS === 'ios' ? 0.4 : 1,
        width:'100%',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        marginTop: wp(1),
        // paddingHorizontal: wp(12)
        paddingLeft:wp(6)
    },
    checkBoxIcon:
    {
        flex: 0.1,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    checkBoxText:
    {
        flex: 0.9,
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
        color: colors.black,
    }

});
export default Styles;

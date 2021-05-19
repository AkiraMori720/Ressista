
import { StyleSheet } from 'react-native';
import colors from '../../Assets/Colors/colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

const styles = StyleSheet.create({
    MainContainer:
    {
        flex: 1,
        justifyContent: 'center',
    },
    container:
    {
        height: hp(6.5),
        width: '100%',
        flexDirection: 'row',
        // backgroundColor: "red"

    },
    innerContainer:
    {
        height: hp(13),
        marginVertical: wp(1),
        width: '94%',
        marginHorizontal: '3%',
        backgroundColor: colors.white,
        borderBottomWidth: wp(0.5),
        borderBottomColor: colors.grey1,
    },
    leftImageContainer:
    {
        height: hp(7),
        width: '18%',
        // backgroundColor:colors.red,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageStyle:
    {
        height: wp(10),
        width: wp(10),
        resizeMode: 'contain',
        borderRadius: wp(5),
        overflow: 'hidden',
    },
    centerTextConrainer:
    {
        height: hp(7),
        width: '44%',
        // backgroundColor: 'red'

    },
    nameContainer:
    {
        flex: 0.5,
        justifyContent: 'flex-end',
        marginBottom: wp(1),
    },
    nameMessageTestStyle:
    {
        fontSize: wp(3),
    },
    messageContainer:
    {
        flex: 0.5,
        justifyContent: 'flex-start',
        marginTop: wp(1),

    },

    rightViewContainer:
    {
        height: hp(7),
        width: '38%',
        // backgroundColor: 'yellow',
    },
    rightTimeCounterContainer:
    {
        flexDirection: 'row',
        marginTop: wp(3),
        justifyContent: 'flex-end',
        paddingRight: wp(1)
    },
    counter:
    {
        height: wp(4.5),
        width: wp(4.5),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: wp(2.75),
        backgroundColor: colors.bright_red,
        marginLeft: wp(2)
    },
    buttonContainer:
    {
        height: hp(6),
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        // backgroundColor: "green"
    },
    iconStyle:
    {
        height: wp(3.5),
        width: wp(3.5),
        resizeMode: 'contain',
        tintColor: colors.white,
    },
    titleStyle:
    {
        fontSize: 16,
        color: colors.white,
        // fontWeight: 'bold'
    },
    style:
    {
        height: hp(5),
        borderRadius: wp(7),
        width: '40%',
        // paddingLeft: wp(2),
        backgroundColor: colors.AppGreyColor,
        marginHorizontal: '1%',
        alignItems:'center',
        justifyContent:'center'
    },
    deleteView:
    {
        height: hp(7),
        width: '50%',
        backgroundColor: colors.AppRedColor,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rightViewContainerDelete:
    {
        height: hp(7),
        width: '38%',
        // backgroundColor: "grey"
    },
    rightTimeCounterContainerdelete:
    {

        flexDirection: 'row',
        justifyContent: 'flex-end',
        // paddingRight: wp(1)
    },
    iconDelet:
    {
        height: wp(6),
        width: wp(6),
        resizeMode: 'contain',
        tintColor: colors.white,
    }

});

export default styles;


import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import colors from "../../Assets/Colors/colors";


const styles = StyleSheet.create({

    mainContainer:
    {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'rgba(153, 153, 153, 0.3)'
        // backgroundColor:colors.black
    },

    container:
    {
        height: wp(70),
        width: '90%',
        padding: wp(5),
        backgroundColor: colors.white,
        borderRadius: wp(1.5),
        shadowOpacity: 0.3,
        shadowRadius: 2,
        shadowOffset: {
            height: 4,
            // width: 1
        },
        elevation: 8
    },
    topTitle:
    {
        height: '20%',
        width: '100%',
        // alignItems:'center',
        // justifyContent:'center',
        // backgroundColor:colors.grey,
    },
    textDescriptionContainer:
    {
        height: '40%',
        width: '100%',
        // alignItems:'center',
        // paddingHorizontal:'5%',
        // justifyContent:'center',
        // backgroundColor:colors.blue,
    },
    textRateApp:
    {
        fontSize: wp(5),
        color: colors.black,
        fontWeight: 'bold',
    },
    textDescription:
    {
        fontSize: wp(4.5),
        color: colors.black,
        // textAlign:'center',
        // fontWeight:'bold'
    },
    textContainer:
    {
        fontSize: wp(4.2),
        color: colors.black,
        // textAlign:'center'
    },
    ratingContainer:
    {
        height: '25%',
        width: '100%',
        alignItems: 'center',
        // backgroundColor:colors.white,
    },
    line:
    {
        height: '0.5%',
        marginTop: '10%',
        backgroundColor: colors.grey,
    },
    bottomButtons:
    {
        height: '15%',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        // backgroundColor:colors.grey
    },
    rateNowContainer:
    {
        // flex:1,
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    laterContainer:
    {
        // flex:1,
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitButton:
    {
        fontSize: wp(4.5),
        color: colors.app_blue,
        fontWeight: 'bold',
    },
    closeButton: {
        fontSize: wp(4.5),
        color: colors.app_red,
        fontWeight: 'bold',
    }

});
export default styles;

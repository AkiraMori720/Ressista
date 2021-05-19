import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import colors from '../../Assets/Colors/colors';

let Styles = {
    drawerMainContainer: {
        width: "100%", height: hp(100),
        backgroundColor: 'red',
    },
    backgroundImageContainer: {
        width: "100%", height: hp(100),
    },
    userInfoContainer: {
        width: "100%",
        height: "20%",
        paddingTop: wp(5),
        backgroundColor: colors.appDarkBlue,
        flexDirection: "row"
    },
    userImageContainer: {
        width: "40%",
        justifyContent: "center",
        alignItems: "center"
    },

    userProfileImage: {
        width: wp(23),
        height: wp(23),
        resizeMode: 'cover',
        borderRadius: wp(11.5),
    },
    userTextContainer: {
        width: "60%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingLeft: wp(5)
    },
    userNameText: {
        textAlign: "center",
        color: colors.appYellow,
        fontSize: 17,
        fontWeight: "bold"
    },
    emailText: {
        marginTop: 5,
        textAlign: "center",
        color: "white",
        fontSize: 13
    },
    drawerItemsContainer: {
        width: "100%",
        height: "70%",
        marginTop: 10,

    },
    drawerItemLabelText: {
        fontWeight: "500",
        fontSize: wp(4),
        color: colors.black
    },
    drawerItemImage: {
        width: 17,
        height: 17,
        tintColor: colors.AppRedColor,
        resizeMode: "contain"
    }
    ,
    drawerItemStyles:
    {
        height: wp(15),
        // width:wp(100),
        marginVertical: wp(0.5),
        backgroundColor: colors.white,
        justifyContent: 'center',

    }

};
export default Styles;

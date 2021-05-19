
//================================ React Native Imported Files ======================================//

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { StyleSheet } from "react-native";

//================================ Local Imported Files ======================================//

import colors from "../../../Assets/Colors/colors";

const Styles = StyleSheet.create({

    mainContainer:
    {
        flex: 1,
        backgroundColor:colors.app_background
    },
    headerView:
    {
        backgroundColor: colors.appDarkBlue,
    },
    middleView: {
        backgroundColor:colors.app_background,
        // marginHorizontal: wp(3),
        marginTop:wp(4)
    },
    headingText:{
       fontSize: wp(4.1),
       fontWeight:'600',
       color:colors.black,
        paddingLeft:'10%',
        paddingTop:8,
        paddingBottom: 4
    },
    LastView: {

    },
    uploadButtonView: {
        width: '100%',
        height: '50%',
        justifyContent: "flex-end",
        alignItems: "center",

    },
    saveButtonView: {
        width: '100%',
        marginTop: 48,
        justifyContent: "center",
        alignItems: "center",
    },
    titleStyles: {
        color: colors.white,
        fontSize: wp(4),

    },
    NameView: {
        marginTop: wp(2),
        height: hp(11),

    },
    EmailView: {
        marginTop: wp(2),
        height: hp(11),

    },
    SubjectView: {
        marginTop: wp(2),
        height: hp(11),

    },
    MessageView: {
        marginTop: wp(2),
        height: hp(30),
    },
    textareaContainer:{
        width:'90%',
        height: '100%',
        alignSelf: 'center',
        borderRadius: wp(5),
        backgroundColor: colors.app_light_yellow,
    },
    CharacterView: {
        height: hp(5),
        backgroundColor: colors.app_light_yellow,
        alignItems: "flex-end",
        width:'90%',
        alignSelf:'center'

    },
    CharacterStyle: {
        color: colors.dark_grey,
        paddingRight:'4%',
    },
    buttonStyles:
    {
        borderRadius: wp(7),
        width: '100%',
    },
});
export default Styles;


//================================ React Native Imported Files ======================================//

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { StyleSheet } from "react-native";

//================================ Local Imported Files ======================================//

import colors from "../../../Assets/Colors/colors";

const Styles = StyleSheet.create({

    mainContainer:
    {
        flex: 1,
        backgroundColor: colors.app_background
    },
    headerView:
    {
        backgroundColor: colors.appDarkBlue,
        flex: 0.09
    },
    middleView: {
        flex: 0.91,
        backgroundColor: colors.app_background,
        marginHorizontal: wp(5),
        marginTop: wp(4)
    },
    mainText: {
        fontSize: wp(8),
        textAlign: 'center',
        fontWeight: 'bold',
        color: colors.black,
    },
    captionText: {
        fontSize: wp(5),
        textAlign: 'center',
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: colors.black,
    },
    sub1Text: {
        fontSize: wp(6),
        fontWeight: 'bold',
        marginBottom: 4,
        color: colors.black,
    },
    sub2Text: {
        fontSize: wp(5),
        fontWeight: 'bold',
        marginBottom: 4,
        color: colors.black,
    },
    bodyText: {
        fontSize: wp(4.3),
        color: colors.black,
    }
});
export default Styles;

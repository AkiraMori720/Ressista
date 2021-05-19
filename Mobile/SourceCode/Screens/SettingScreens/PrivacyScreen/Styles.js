
//================================ React Native Imported Files ======================================//

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Platform, StyleSheet } from 'react-native';

//================================ Local Imported Files ======================================//

import colors from "../../../Assets/Colors/colors";

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
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)'
    },
    imageView: {
        marginTop: 10,
        alignItems: 'center'
    },
    ressistaText: {
        fontSize: wp(4.1),
        color: colors.white,
        fontWeight: '500',
        width: '85%',
        lineHeight: wp(6),
        textAlign: 'center'
    },
    headingText: {
        fontSize: wp(6),
        color: colors.white,
        fontWeight: 'bold',
        paddingTop: Platform.OS === 'ios' ? '7%' : '4%',
    },
    imageStyles: {
        width: '55%',
        resizeMode: 'contain',
    },
    textContainer: {
        flexGrow: 1,
        alignItems: 'center',
        padding: wp(5),
        backgroundColor: colors.white,
        marginHorizontal: wp(4),
        borderRadius: wp(4),
        marginVertical: wp(7)
    },
    mainText: {
        fontSize: wp(8),
        textAlign: 'center',
        fontWeight: 'bold',
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

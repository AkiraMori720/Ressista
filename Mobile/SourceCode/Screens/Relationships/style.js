//================================ React Native Imported Files ======================================//

import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {StyleSheet} from 'react-native';

//================================ Local Imported Files ======================================//

import colors from '../../Assets/Colors/colors';

const Styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor:colors.app_background
    },
    headerContainer: {
    },
    container: {
        flex: 1,
    },
    inputView:{
        paddingVertical: 8,
        alignItems:'center',
        borderColor: colors.border_color,
        borderWidth: 1,
        justifyContent:'center'
    },
    flatListView:{
        flexGrow: 1
    },
    loading: {
        zIndex: 100,
        position: 'absolute',
        width: '100%',
        height: '100%'
    }
});
export default Styles;

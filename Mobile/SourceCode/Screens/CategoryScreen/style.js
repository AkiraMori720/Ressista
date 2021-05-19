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
    },
    inputView:{
        paddingVertical: 8,
        alignItems:'center',
        borderColor: colors.border_color,
        borderWidth: 1,
        justifyContent:'center'
    },
    flatListView:{
        flex: 1
    }
});
export default Styles;

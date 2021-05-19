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
        flex: 1
    },
    inputView:{
        paddingVertical: 8,
        flexDirection:'row',
        alignItems:'center',
        borderBottomWidth: 1,
        borderBottomColor: colors.border_color,
        justifyContent:'center',
    },
    contentView:{
    },
    sortIcon:{
        height:wp(5),
        width:wp(5),
        resizeMode:'contain',
    },
    dropdownContainerHeader: {
        height: 41,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: colors.separator,
        alignItems: 'center',
        backgroundColor: '#fff',
        flexDirection: 'row'
    },
    sortToggleContainerClose: {
        position: 'absolute',
        top: 0,
        width: '100%'
    },
    sortToggleText: {
        color: '#9EA2A8',
        fontSize: 15,
        fontWeight: 'normal',
        flex: 1,
        marginLeft: 15
    },
    dropdownContainer: {
        backgroundColor: colors.app_light_yellow,
        width: '100%',
        position: 'absolute',
        top: 58
    },
    sortItemButton: {
        height: 57,
        justifyContent: 'center'
    },
    sortItemContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    sortItemText: {
        color: '#54585E',
        fontSize: 18,
        fontWeight: 'normal',
        flex: 1,
        paddingLeft: 8
    },
    backdrop: {
        ...StyleSheet.absoluteFill,
        backgroundColor: '#000000'
    },
    sortSeparator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: colors.separator,
        marginHorizontal: 15,
        flex: 1
    },
    loading:{
        zIndex: 100,
        position: 'absolute',
        width: '100%',
        height: '100%'
    },
});
export default Styles;

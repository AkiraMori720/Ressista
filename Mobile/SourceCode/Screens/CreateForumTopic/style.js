//================================ React Native Imported Files ======================================//

import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {StyleSheet,Platform} from 'react-native';

//================================ Local Imported Files ======================================//

import colors from '../../Assets/Colors/colors';

const Styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor:colors.app_background,
    },
    headerContainer: {
    },
    container: {
        flex: 1,
    },
    textTitles:{
        fontSize:wp(3.8),
        fontWeight: '500',
        paddingLeft:'12%',
        paddingVertical:'3%'
    },
    postingTopicText:{
        fontSize:wp(3.8),
        fontWeight: 'bold',
        paddingLeft:'8%',
        paddingTop:'6%',
        paddingBottom:'2%'
    },
    textareaContainer:{
        width:'90%',
        alignSelf:'center',
        backgroundColor:colors.app_light_yellow,
        borderRadius:wp(5),
        paddingBottom: 18,
        height: 350
    },
    richTextToolBar:{
        backgroundColor:colors.app_dark_background,
        borderTopLeftRadius: wp(5),
        borderTopRightRadius: wp(5),
    },
    richTextEditor: {
        backgroundColor:colors.app_light_yellow,
    },
    buttonView:{
        alignItems:'center',
        marginTop: 24
    }


});
export default Styles;

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
    },
    flatListView:{
        flex: 1
    },
    buttonsView:{
        marginTop: 8
    },
    viewPagination:{
        // backgroundColor:'green',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:'4%'
    },
    numberView:{
        flexDirection:'row'
    },
    prevText:{
        fontSize:wp(4.3),
        fontWeight:'bold',
        color:colors.black,
        textDecorationLine:'underline'
    },
    numberText:{
        fontSize:wp(4.1),
        fontWeight:'bold',
        color:colors.black,
        textDecorationLine:'underline',
        paddingRight:'2.5%'
    },
    viewBtn:{
        // backgroundColor:'orange',
        alignItems: 'center',
        justifyContent: 'center'
    },
    viewInput:{
        marginTop: 24,
        alignItems:'center',
        borderBottomWidth: 1,
        borderBottomColor: colors.separator
    },
    textareaContainer:{
        width:'90%',
        alignSelf:'center',
        backgroundColor:colors.app_light_yellow,
        borderRadius:wp(5),
        paddingBottom: 18,
        height: 200,
    },
    richTextToolBar:{
        backgroundColor:colors.app_dark_background,
        borderTopLeftRadius: wp(5),
        borderTopRightRadius: wp(5),
    },
    richTextEditor: {
        backgroundColor:colors.app_light_yellow,
    },
    replyBtn:{
        marginTop:wp(5)
    },
});
export default Styles;

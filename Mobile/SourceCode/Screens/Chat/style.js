import {StyleSheet} from 'react-native';
import colors from "../../Assets/Colors/colors";


const styles = StyleSheet.create({

    mainContainer:
        {
            flex:1,
            backgroundColor:colors.app_background
        },

    headerView:
        {
        },
    container:
        {
            backgroundColor: colors.app_background
        },
    inputContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderTopWidth: 1,
        borderTopColor: colors.app_dark_background,
        backgroundColor: colors.app_background
    },
    input:{
        flexGrow: 1,
        paddingVertical: 6,
        paddingHorizontal: 12,
        fontSize: 14,
        borderRadius:16,
        backgroundColor: 'white'
    },
    sendBtn: {
        padding: 4,
        marginHorizontal: 8
    }

});
export default styles;

import React from 'react';
import {
    Text,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    View,
    Image,
    Platform,
    ActivityIndicator,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../../Assets/Colors/colors';

const detaultButtonTitle = 'Button';

class Button extends React.Component {

    // onPressDefault = () => {
    //     console.log('Button is pressed');
    // };

    renderIcon() {
        const { icon, iconStyle } = this.props;
        let styleIcon = iconStyle !== undefined ? iconStyle : styles.icon;
        return (
            <Image source={icon} style={[styleIcon, { tintColor: this.props.iconTintColor }]} resizeMode={'contain'} />

        )
    }

    renderTitleText() {
        let { titleStyle, title, icon, iconPlace, } = this.props;

        let btnTitleStyle = titleStyle !== undefined ? titleStyle : styles.textStyle;
        let btnTitle = title !== undefined ? title : detaultButtonTitle;
        let isIcon = icon !== undefined;

        let width = '100%';
        if (isIcon && (iconPlace === 'left' || iconPlace === 'right')) {
            width = '80%'
        }

        return (
            <View style={[styles.textContainer, { borderWidth: 0, borderColor: 'green', width: width }]}>
                {isIcon && iconPlace === 'leftCenter' ? this.renderIcon() : null}
                <Text style={btnTitleStyle}>{btnTitle}</Text>
                {isIcon && iconPlace === 'rightCenter' ? this.renderIcon() : null}

            </View>

        )
    }

    onPressDefault = () => {

    }

    render() {
        const { style, BackgroundImage, title, icon, iconPlace = 'left', onPress, loading } = this.props;

        // Setting Button Style
        let touchableStyle = style !== undefined ? style : styles.container;
        let isIcon = icon !== undefined;
        let bgColor = this.props.bgColor || colors.app_button_color;
        let height = this.props.height || Platform.OS === 'ios' ? hp(6) : hp(7);
        let width = this.props.width || '90%';


        return (
            <TouchableOpacity onPress={onPress !== undefined ? onPress : this.onPressDefault} style={[touchableStyle, { backgroundColor: bgColor, height: height, width: width }]}>
                <ImageBackground source={BackgroundImage} resizeMode={"stretch"} style={styles.imgBackground}>

                    {loading ? <ActivityIndicator color={'white'}/> :
                        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center',}}>

                            {isIcon && iconPlace === 'left' ? this.renderIcon() : null}

                            {(title === undefined || title.length > 0) && this.renderTitleText()}

                            {isIcon && iconPlace === 'right' ? this.renderIcon() : null}
                        </View>
                    }

                </ImageBackground>
            </TouchableOpacity>
        );
    }
}

export default Button;



const styles = StyleSheet.create({
    container: {
        height: Platform.OS === 'ios' ? hp(5) : hp(8),
        width: '90%',
        paddingLeft: 5,
        paddingRight: 5,
        // borderWidth: 0.5,
        borderRadius: wp(6),
        // top:0,
        // bottom:5,
        // backgroundColor:colors.gold,
        marginBottom: 7
    },
    imgBackground: {
        width: "100%",
        height: "100%",
        justifyContent: 'center',
    },

    icon: {
        width: 17,
        height: 17,
        borderWidth: 0,
        marginLeft: wp(3),
        tintColor: colors.white,
        resizeMode: 'contain'
        // borderColor:'red',
    },

    textContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        // paddingLeft:'7%'

    },

    textStyle: {
        color: colors.white,
        fontSize: wp(4),
        fontWeight: 'bold',
        // fontFamily:'Montserrat-Bold',
    },


});





import React from 'react';
import { Image, StyleSheet, TextInput, TouchableWithoutFeedback, View } from "react-native";
import colors from '../../Assets/Colors/colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

class AppInput extends React.Component {


    render() {

        let style = this.props.style;
        let shadow = this.props.shadow;

        let height = this.props.height || hp(6);
        let width = this.props.width || '90%';

        let marginTop = this.props.marginTop || 0;
        let marginBottom = this.props.marginBottom;
        let marginLeft = this.props.marginLeft;
        let marginRight = this.props.marginRight;

        let paddingLeft = this.props.paddingLeft || '0%';
        let paddingRight = this.props.paddingRight;
        let paddingTop = this.props.paddingTop;
        let paddingBottom = this.props.paddingBottom;

        let borderColor = this.props.borderColor || '#9ec600';
        let borderWidth = this.props.borderWidth;
        let borderBottomWidth = this.props.borderBottomWidth;
        let borderRadius = this.props.borderRadius || wp(7);

        let backgroundColor = this.props.backgroundColor || colors.app_light_yellow;

        let rightIconSize = this.props.rightIconSize || 25;
        let leftImageHeight = this.props.leftImageHeight || 20;
        let leftImageWidth = this.props.leftImageWidth || 20;


        return (
            <View style={[styles.inputFieldTextView, shadow, style, {
                height: height
                , width: width, marginTop: marginTop, paddingBottom: paddingBottom, marginBottom: marginBottom,
                paddingTop: paddingTop, backgroundColor: backgroundColor,
                paddingLeft: paddingLeft, borderWidth: borderWidth
                , borderColor: borderColor, borderRadius: borderRadius, borderBottomWidth: borderBottomWidth
            }]}>
                {this.props.leftIconPath !== undefined &&

                    <View style={styles.leftImageViewStyle}>
                        <Image style={this.props.imageStyle !== undefined ? this.props.imageStyle :
                            { height: leftImageHeight, width: leftImageWidth, resizeMode: 'contain', marginLeft: '3%', tintColor: colors.grey }}
                            source={this.props.leftIconPath} /></View>
                }
                <TextInput
                    value={this.props.value}
                    secureTextEntry={this.props.secureEntry}
                    style={[styles.inputFieldText, this.props.textInputStyle, { color: this.props.colortextInput??'black', paddingLeft: this.props.paddingLeft || '5%' }]}
                    onChangeText={this.props.onChangeText}
                    autoCapitalize={this.props.autoCapitalize??'none'}
                    justifyContent={this.props.justifyContent}
                    placeholder={this.props.placeholder}
                    placeholderTextColor={this.props.placeholderTextColor}
                    onSubmitEditing={this.props.onSubmitEditing}
                    onFocus={this.props.onFocus}
                    onBlur={this.props.onBlur}
                    ref={this.props.ref}
                    multiline={this.props.multiline}
                    maxHeight={this.props.maxHeight}
                    autoGrow={this.props.autoGrow}
                    onContentSizeChange={this.props.onContentSizeChange}
                    onEndEditing={this.props.onEndEditing}
                    keyboardType={this.props.keyboardType}
                    blurOnSubmit
                />
                {this.props.rightIconPath !== undefined &&
                    <TouchableWithoutFeedback onPress={this.props.onRightIconPress}>
                        <Image
                            source={this.props.rightIconPath}
                            style={{ height: rightIconSize, width: rightIconSize, resizeMode: 'contain', tintColor: this.props.tintColor, }} />
                    </TouchableWithoutFeedback>}
            </View>
        )
    }


}

const styles = StyleSheet.create({

    inputFieldTextView: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        // height:wp(7),
        alignSelf: 'center',
    },
    inputFieldText: {
        paddingLeft: '5%',
        height: '125%',
        width: '85%',
        fontSize: 16.5,
        // textAlignVertical:'center',
        // marginVertical:'5%',
        // borderLeftColor:colors.deep_grey,
        // borderLeftWidth:wp(0.1),
        color: colors.black,


    },
    leftImageViewStyle:
    {
        height: '100%',
        // backgroundColor:'red',
        width: '15%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: wp(2),
        // borderRightColor:colors.grey,
        // borderRightWidth:wp(0.1),
    }


});
export default AppInput;

import React from 'react';
import { Image, StyleSheet, TextInput, TouchableWithoutFeedback, View, } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from 'react-native-responsive-screen';
import colors from '../../Assets/Colors/colors';
import images from '../../Assets/Images/images';

class Search extends React.Component {
  render() {
    let style = this.props.style;
    let shadow = this.props.shadow;
    let height = this.props.height || hp(5);
    let width = this.props.width || '88%';
    // let marginTop = this.props.marginTop || 5;
    let marginBottom = this.props.marginBottom;
    let marginLeft = this.props.marginLeft;
    let marginRight = this.props.marginRight;
    let paddingLeft = this.props.paddingLeft || '0%';
    let paddingRight = this.props.paddingRight;
    let paddingTop = this.props.paddingTop;
    let paddingBottom = this.props.paddingBottom;
    let borderColor = this.props.borderColor || colors.gray;
    let borderWidth = this.props.borderWidth || wp(0.05);
    let borderRadius = this.props.borderRadius || wp(1);
    let backgroundColor = this.props.backgroundColor || colors.grey1;
    let rightIconSize = this.props.rightIconSize || 20;

    return (
      <View
        style={[
          styles.inputFieldTextView,
          shadow,
          style,
          {
            height: height,
            width: width,
            paddingBottom: paddingBottom,
            marginBottom: marginBottom,
            paddingTop: paddingTop,
            backgroundColor: backgroundColor,
            paddingLeft: paddingLeft,
            borderWidth: borderWidth,
            borderColor: borderColor,
            borderRadius: borderRadius,
          },
        ]}>
        {this.props.leftIconPath !== undefined && (
          <View style={styles.leftImageViewStyle}>
            <Image
              style={
                this.props.imageStyle !== undefined
                  ? this.props.imageStyle
                  : {
                    height: 20,
                    width: 20,
                    resizeMode: 'contain',
                    marginLeft: '3%',
                    tintColor: '#bfbfbf',
                  }
              }
              source={this.props.leftIconPath}
            />
          </View>
        )}
        <TextInput
          value={this.props.value}
          secureTextEntry={this.props.secureEntry}
          style={[
            styles.inputFieldText,
            this.props.textInputStyle,
            { color: 'black' },
          ]}
          onChangeText={this.props.onChangeText}
          autoCapitalize="none"
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
        />
        {this.props.rightIconPath !== undefined && (
          <TouchableWithoutFeedback
            style={styles.rightImageStyle}
            onPress={this.props.onRightIconPress}>
            <Image
              source={this.props.rightIconPath}
              style={{
                height: rightIconSize,
                width: rightIconSize,
                resizeMode: 'contain',
                tintColor: colors.grey,
              }}
            />
          </TouchableWithoutFeedback>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputFieldTextView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
  },
  inputFieldText: {
    paddingLeft: '3%',
    height: '100%',
    width: '76%',
    fontSize: 15,
    color: 'black',
  },
  leftImageViewStyle: {
    height: '100%',
    width: '12%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    // paddingLeft: wp(2),
    // backgroundColor:colors.red,
  },
  rightImageStyle:
  {
    height: '100%',
    width: '10%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    // paddingHorizontal: wp(2),
    backgroundColor: colors.red,

  }
});
export default Search;

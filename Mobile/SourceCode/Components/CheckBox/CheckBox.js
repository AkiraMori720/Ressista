import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from "../../Assets/Colors/colors";
import images from "../../Assets/Images/images";


export default class CheckBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            radioButtonChecked: false
        }
    }

    UNSAFE_componentWillReceiveProps(nextprops) {
        if (this.props.value != nextprops.value) {
            this.setState({ radioButtonChecked: nextprops.value })
        }
    }

    onRadioPress() {
        const { onChange } = this.props
        if (this.state.radioButtonChecked) {
            this.setState({ radioButtonChecked: false });
            onChange && onChange(false);
        } else {
            this.setState({ radioButtonChecked: true });
            onChange && onChange(true);
        }
    }

    render() {
        return (
            <View style={styles.mainContainer} >
                <View style={[styles.container, { marginTop: this.props.marginTop, marginLeft: this.props.marginLeft }]}>

                    <TouchableOpacity onPress={() => this.onRadioPress()} style={[styles.touchViewRadio, { backgroundColor: this.props.bgColor || colors.app_background }]}>
                        {this.state.radioButtonChecked && <Image style={styles.img} source={images.icn_check_box} />}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.onRadioPress()}>
                        <Text style={styles.text}>{this.props.checkTitle}</Text>
                    </TouchableOpacity>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        // justifyContent: 'center',
        // alignItems:'center',
        // backgroundColor:'green',
        // flex:1,

    },
    text: {
        // fontFamily:'Montserrat-Regular',
        fontSize: 14,
        color: colors.black,
        fontWeight: '500'

    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: '#fff',
        // height:hp(10),
        // width:wp(10),
    },
    touchViewRadio: {
        height: wp(3.7),
        width: wp(3.7),
        backgroundColor: colors.app_background,
        // borderRadius:wp(10),
        borderWidth: wp(0.5),
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: wp(2),
        borderColor: colors.app_dim_grey,
    },
    innerTouchViewRadio: {
        backgroundColor: 'red',
        width: '80%',
        height: '80%',
        borderRadius: wp(5),
        margin: 1,
    },
    img: {
        resizeMode: 'contain',
        height: hp(4),
        width: wp(4),
        // tintColor:colors.app_button_color,
    }



});



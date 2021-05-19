import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../../../Assets/Colors/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';


export default class MessageComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            viewShow: true,
        }

    }


    render() {
        const { unread, isBlocked } = this.props;
        return (

            <View style={styles.mainContainer}>

                <TouchableOpacity style={[styles.itemList]} onPress={this.props.onPressItem}>
                    <View style={styles.imageView}>
                        <Image style={[styles.img]} source={this.props.avatar} />
                    </View>
                    <View style={[styles.textView]}>
                        <Text numberOfLines={1} style={[styles.title, {color: isBlocked?colors.app_red:colors.black}]}>{this.props.title}</Text>
                        <Text numberOfLines={1} style={styles.text}>{this.props.text}</Text>
                    </View>
                    <View style={styles.iconView}>
                        {
                            isBlocked
                                ?
                                <AntDesign name={'minuscircleo'} size={24} color={colors.app_red}/>
                            : null
                        }
                        {
                            !isBlocked && unread > 0?
                                <View style={{ backgroundColor: colors.app_dark_background, borderRadius: 10, width: 20, height: 20, alignItems: 'center', justifyContent: 'center'}}>
                                    <Text style={{color: 'white', fontSize: 12}}>{unread}</Text>
                                </View>
                                : null
                        }
                    </View>
                </TouchableOpacity>


            </View>
        )
    }
}

const styles = StyleSheet.create({

    mainContainer:
    {
        // flex: 1,
        // justifyContent:'center',
        // backgroundColor: colors.app_light_color,
        // marginTop:50
    },
    itemList: {
        minHeight: hp(11),
        // maxHeight:hp(21),
        // height:Platform.OS === 'ios' ? hp(21) : hp(27),
        width: wp(100),
        // backgroundColor: 'grey',
        alignSelf: 'center',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: colors.app_light_yellow,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    imageView: {
        width: '20%',
        // backgroundColor:'green',
        alignItems: 'center'
    },
    textView: {
        width: '60%',
        // height:'45%',
        // backgroundColor:'orange',
        // paddingHorizontal:'4%'
        // paddingBottom:'3%',
        // paddingLeft: '2.5%',
    },
    icon: {
        height: 25,
        width: 25,
        resizeMode: 'contain',
    },
    img: {
        height: wp(12),
        width: wp(12),
        resizeMode: 'contain',
        borderRadius: 24
    },
    title: {
        fontSize: wp(4.4),
        fontWeight: 'bold',
        color: colors.black,
        // paddingTop:'2%',
    },
    text: {
        fontSize: wp(3.6),
        fontWeight: '400',
        color: colors.grey1,
        width: '100%',
        paddingTop: '2%',

    },
    iconView: {
        width: '20%',
        alignItems: 'center',
        // backgroundColor: 'red'
    }




});


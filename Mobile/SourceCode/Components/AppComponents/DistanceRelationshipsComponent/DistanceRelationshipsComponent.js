import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, Linking} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../../../Assets/Colors/colors';
import {formatTimeStamp} from '../../../Lib/helper';
import HTML from "react-native-render-html";
import {showToast} from '../../../Lib/info';


export default class DistanceRelationshipsComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            viewShow: true,
        }

    }

    onPressLink = async (event, href, htmlAttributes) => {
        console.log('href', event, href, htmlAttributes);
        Linking.canOpenURL(href).then(supported => {
            if (supported) {
                Linking.openURL(href);
            } else {
                showToast("Can not open URI: " + href);
            }
        });
    }

    render() {
        const { replies } = this.props;
        return (

            <View style={styles.mainContainer}>

                <View style={[styles.itemList, { borderWidth: this.props.borderWidth, borderRadius: this.props.borderRadius, borderColor: this.props.borderColor || colors.app_light_yellow }]} onPress={this.props.onPressItem}>

                    <View style={[styles.infoView]}>
                        <TouchableOpacity onPress={this.props.onPressUser}>
                            <Text style={styles.title}>{this.props.title}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.props.onPressReply}>
                            <Image style={[styles.icon, { tintColor: this.props.iconTintColor || 'transparent' }]} source={this.props.icon} />
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.textView]}>
                        <HTML source={{ html: this.props.text }} onLinkPress={(event, href, htmlAttribs) => this.onPressLink(event, href, htmlAttribs)}/>
                    </View>
                    <View style={styles.timeView}>
                        <Text style={styles.timeText}>{this.props.time}</Text>
                    </View>

                    {
                        replies.map(reply => (
                            <View style={ styles.innerRply}>
                                <View style={[styles.infoView]}>
                                    <Text style={styles.title}>{reply.ownerName?`@${reply.ownerName}`:''}</Text>
                                    <Image style={[styles.icon, { tintColor: this.props.iconTintColor || 'transparent' }]} source={this.props.icon} />
                                </View>
                                <View style={[styles.textView]}>
                                    <HTML source={{ html: reply.text }} onLinkPress={(event, href, htmlAttribs) => this.onPressLink(event, href, htmlAttribs)}/>
                                </View>
                                <View style={styles.timeView}>
                                    <Text style={styles.timeText}>{formatTimeStamp(reply.createdAt)}</Text>
                                </View>
                            </View>
                        ))
                    }
                </View>


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
        minHeight: hp(18),
        // maxHeight:hp(21),
        // height:Platform.OS === 'ios' ? hp(21) : hp(27),
        width: wp(100),
        // backgroundColor: 'grey',
        alignSelf: 'center',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: colors.app_light_yellow
    },
    innerRply:{
        width: wp(80),
        alignSelf: 'center',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.app_light_yellow,
        marginBottom: 4,
    },
    infoView: {
        // height:'35%',
        width: '100%',
        // backgroundColor:'green',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: '4%',
        paddingTop: '3%'
    },
    textView: {
        marginTop: 8,
        width: '100%',
        // backgroundColor:'orange',
        paddingHorizontal: '4%'
    },
    viewLikeComment: {
        // height:'20%',
        width: '100%',
        // backgroundColor:'green',
        paddingHorizontal: '4%',
        justifyContent: 'center'
    },
    icon: {
        height: 20,
        width: 20,
        resizeMode: 'contain',
        marginTop: '2%',
    },
    title: {
        fontSize: wp(4.4),
        fontWeight: 'bold',
        color: colors.black,
        paddingTop: '2%',
    },
    titleText: {
        fontSize: wp(4),
        fontWeight: 'bold',
        color: colors.black,
        // paddingTop:'1%'
    },
    timeText: {
        fontSize: wp(3.5),
        fontWeight: '400',
        color: colors.black,
        paddingTop: '3%',
        paddingLeft: '4%',
        paddingBottom: '6%'
    },
    text: {
        fontSize: wp(3.5),
        fontWeight: '400',
        color: colors.black,
        paddingTop: '2%'
    },



});


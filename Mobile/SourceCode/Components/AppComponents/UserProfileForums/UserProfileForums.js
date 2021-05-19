import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, Linking} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../../../Assets/Colors/colors';
import HTML from "react-native-render-html";
import {showToast} from '../../../Lib/info';



export default class UserProfileForums extends React.Component {

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

        return (

            <View style={styles.mainContainer}>

                <TouchableOpacity style={styles.itemList} onPress={this.props.onPressItem}>
                    <View style={styles.infoView}>
                        <View>
                            <Text style={styles.title}>{this.props.title}</Text>
                            {this.props.timeView ?
                                <View>
                                    <Text style={styles.postedText}>Posted by: {this.props.postedBy}</Text>
                                    <Text style={styles.timeText}>{this.props.time}</Text>
                                </View>
                                : null}
                        </View>
                        {this.props.iconView ?
                            <Image style={[styles.icon, { tintColor: this.props.iconTintColor || 'none' }]} source={this.props.icon} /> : null}
                    </View>
                    {this.props.textDetailView ?
                        <View style={styles.textView}>
                            <HTML source={{ html: this.props.text }} onLinkPress={(event, href, htmlAttribs) => this.onPressLink(event, href, htmlAttribs)}/>
                        </View> : null
                    }


                    {this.props.commentView ?
                        <View style={styles.viewLikeComment}>
                            <View style={styles.commentsView}>
                                <Text style={styles.likeText}>{this.props.likes} <Text>Likes</Text></Text>
                                <Text style={styles.commentText}>{this.props.comments} <Text>Comments</Text></Text>
                            </View>
                        </View>
                        : null}
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
        // minHeight:hp(10),
        // maxHeight:hp(21),
        // height:Platform.OS === 'ios' ? hp(21) : hp(27),
        width: wp(100),
        // backgroundColor: 'grey',
        alignSelf: 'center',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: colors.app_light_yellow
    },
    infoView: {
        width: '100%',
        // backgroundColor:'green',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: '4%'
    },
    textView: {
        paddingVertical: 12,
        width: '100%',
        paddingHorizontal: '4%',
    },
    viewLikeComment: {
        width: '100%',
        // backgroundColor:'green',
        paddingHorizontal: '4%',
        justifyContent: 'center'
    },
    commentsView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        height: 15,
        width: 15,
        resizeMode: 'contain',
        marginTop: '2%',
    },
    title: {
        fontSize: wp(5),
        fontWeight: 'bold',
        color: colors.black,
        paddingTop: '2%',
    },
    postedText: {
        fontSize: wp(3.2),
        fontWeight: '400',
        color: colors.black,
        paddingTop: '1%'
    },
    timeText: {
        fontSize: wp(3.2),
        fontWeight: '400',
        color: colors.app_dim_grey,
    },
    text: {
        fontSize: wp(3.4),
        fontWeight: '400',
        color: colors.black,
        paddingTop: '2%',
    },
    likeText: {
        fontSize: wp(3.5),
        fontWeight: '600',
        color: colors.black,
    },
    commentText: {
        fontSize: wp(3.5),
        fontWeight: '600',
        color: colors.black,
        paddingLeft: '4%'
    },



});


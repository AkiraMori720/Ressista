import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from '../../../Assets/Colors/colors';


export default class RelationshipsComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            viewShow: true,
        }

    }



    render() {
        const { title, postedBy, time, iconTintColor, likes, comments, commentView, onPressItem, onPressUser, onPressBookmark, isBookmarked } = this.props;
        return (

            <View style={styles.mainContainer}>

                <View style={[styles.itemList,]} >
                    <View style={[styles.infoView,]}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between"}}>
                            <View>
                                <TouchableOpacity onPress={onPressItem}>
                                    <Text style={styles.title}>{title}</Text>
                                </TouchableOpacity>
                                    <View>
                                        <View style={styles.startedByView}>
                                            <Text style={styles.postedText}>Started by: </Text>
                                            <TouchableOpacity onPress={onPressUser}>
                                                <Text style={styles.postedByText}>{postedBy}</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <Text style={styles.timeText}>{time}</Text>
                                    </View>

                            </View>
                            <TouchableOpacity onPress={() => onPressBookmark(!isBookmarked)}>
                                {isBookmarked ?
                                    <FontAwesome style={[styles.icon,{tintColor: iconTintColor || 'gray'}]}  size={24} name={'bookmark'} />
                                    :
                                    <FontAwesome style={[styles.icon,{tintColor: iconTintColor || 'gray'}]} size={24} name={'bookmark-o'} />
                                }
                            </TouchableOpacity>
                        </View>
                        {commentView ?
                            <View style={styles.viewLikeComment}>
                                <View style={styles.commentsView}>
                                    <Text style={styles.likeText}>{likes} <Text> Likes</Text></Text>
                                    <Text style={styles.commentText}>{comments} <Text>Comments</Text></Text>
                                </View>
                            </View>
                            :
                            null
                        }
                    </View>
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
    itemList:{
        minHeight:hp(10),
        // maxHeight:hp(21),
        // height:Platform.OS === 'ios' ? hp(21) : hp(27),
        width:wp(100),
        // backgroundColor: 'grey',
        alignSelf:'center',
        borderTopWidth:1,
        borderBottomWidth:1,
        borderColor:colors.app_light_yellow,
        paddingVertical:'5%'
    },
    infoView:{
        paddingHorizontal:'4%'
    },
    viewLikeComment:{
        justifyContent:'center',
        paddingTop:'3%'
    },
    commentsView:{
        flexDirection: 'row',
        alignItems:'center',
    },
    icon:{
        width: 24,
        marginTop: '1.5%',
    },
    title:{
        fontSize:wp(4.3),
        fontWeight:'bold',
        color:colors.black,
    },
    postedText:{
        fontSize:wp(3.7),
        fontWeight:'400',
        color:colors.black,
        paddingTop:'2%'
    },
    timeText:{
        fontSize:wp(3.7),
        fontWeight:'400',
        color:colors.app_dim_grey,
        paddingTop:'2%'
    },
    likeText:{
        fontSize:wp(3.7),
        fontWeight:'bold',
        color:colors.black,
    },
    commentText:{
        fontSize:wp(3.7),
        fontWeight:'bold',
        color:colors.black,
        paddingLeft:'4%'
    },
    startedByView:{
        flexDirection:'row',
        alignItems: "center"
    },
    postedByText:{
        fontSize:wp(3.7),
        fontWeight:'400',
        color:colors.black,
        paddingTop:'2%'
    },




});


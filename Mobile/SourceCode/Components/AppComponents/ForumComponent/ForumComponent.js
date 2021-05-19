import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../../../Assets/Colors/colors';
import images from '../../../Assets/Images/images';
import RelationshipsComponent from '../RelationshipsComponent/RelationshipsComponent';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {formatTimeStamp} from '../../../Lib/helper';


export default class ForumComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            viewShow: true,
        }

    }

    render() {
        const { user, title, forums, openForums, onPressUser, onPressItem, onPressDropDown, onPressBookmark } = this.props;
        return (

            <View style={styles.mainContainer}>

                <View style={[styles.itemList]} >
                    <TouchableOpacity style={[styles.textView]} onPress={onPressItem}>
                        <Text numberOfLines={1} style={[styles.title]}>{title}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.iconView]} onPress={onPressDropDown}>
                        <FontAwesome5 size={18} name={openForums?'chevron-down':'chevron-up'} />
                    </TouchableOpacity>
                </View>
                {openForums ?
                    <View>
                        {
                            forums.map(forum => (
                                <RelationshipsComponent
                                    title={forum.title}
                                    postedBy={ `@${forum.ownerName??''}`}
                                    time={formatTimeStamp(forum.createdAt)}
                                    isBookmarked={forum.bookmarked && forum.bookmarked.includes(user.uid)}
                                    onPressBookmark={(value)=>onPressBookmark(forum.id, value)}
                                    onPressUser={() => onPressUser(forum.ownerId)}
                                    onPressItem={onPressItem}
                                />
                            ))
                        }
                    </View>
                    : null
                }
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
            // marginTop:100
        },
    itemList:{
        minHeight:hp(8.5),
        width:wp(100),
        alignSelf:'center',
        borderTopWidth:1,
        borderBottomWidth:1,
        borderColor:colors.app_light_yellow,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    textView:{
        width:'80%',
        paddingLeft:'4%'
    },
    icon:{
        height:15,
        width: 15,
        resizeMode:'contain',
    },
    title:{
        fontSize:wp(4.3),
        fontWeight:'bold',
        color:colors.black,
        // paddingTop:'2%',
    },
    iconView:{
        width:'20%',
        alignItems:'flex-end',
        // backgroundColor: 'blue',
        paddingRight:'6%'
    }




});


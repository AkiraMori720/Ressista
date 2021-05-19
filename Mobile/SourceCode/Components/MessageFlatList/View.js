import React from 'react';
import { View, Text, TextInput, StyleSheet, Image, ImageBackground, TouchableOpacity, ScrollView,Platform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../../Assets/Colors/colors';
import images from '../../Assets/Images/images';


class MessagesFlatList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            viewShow: true,
        }

    }

    render() {





        return (

            <View style={styles.mainContainer}>

                <TouchableOpacity style={styles.container}
                    onPress={this.props.chatScreen}

                >

                    <View style={styles.leftIconContainer}>
                        <Image
                            // source={images.ic_play}
                            style={styles.leftIconStyle}

                            source={this.props.leftImage}
                        />
                    </View>
                    <View style={styles.uperViewContainer}>
                        <View style={styles.uperTextContainer}>
                                <Text style={styles.uperTextRightStyle}>{this.props.titleName}</Text>
                                <Text style={styles.lowerTextStyle}>{this.props.postedText}</Text>
                                <Text style={{fontSize:11,fontWeight: 'bold',color:colors.AppRedColor}}>{this.props.subTitle}</Text>
                        </View>

                        <View style={styles.lowTextContainer}>
                            <Text style={styles.uperLeftRightStyle}>{this.props.date}</Text>
                            <Text style={[styles.uperLeftRightStyle,{paddingTop:'3%'}]}>{this.props.timeZone}</Text>
                        </View>
                    </View>


                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    mainContainer:
    {
        flex: 1,
        // justifyContent:'center',
        backgroundColor: colors.white
    },
    uperViewContainer: {
        height: hp(12),
        width: '78%',
        // // borderRadius:wp(2),
        // backgroundColor: "red",
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'space-between',
        // paddingBottom:'5%',

    },
    imageStyles:
    {
        height: wp(4),
        width: wp(4),
        resizeMode: 'contain',
        tintColor: colors.grey
    },
    uperTextRightStyle: {
        fontSize: wp(4),
        fontWeight: "bold",


    },
    uperLeftRightStyle: {
        fontSize: wp(3),
        // fontWeight:"bold",
        color: colors.black,


    },
    lowerTextStyle: {
        fontSize: wp(2.9),
        // fontWeight:"bold",
        color: colors.black,
        paddingVertical:'3%',

    },
    uperTextContainer: {
        // height: hp(5),
        // width: '100%',
        // borderRadius:wp(2),
        // backgroundColor:"green",
        // flexDirection: "row"

    },
    uperTextRightContainer: {
        height: hp(6),
        width: '50%',
        // borderRadius:wp(2),
        // backgroundColor:"pink",
        justifyContent: 'center',
        paddingLeft: wp(4)


    },
    uperTextLeftContainer: {
        height: hp(6),
        width: '45%',
        // borderRadius:wp(2),
        // backgroundColor: "yellow",
        justifyContent: "center",
        alignItems: "flex-end",
        paddingRight: wp(4)

    },
    // uperLeftImageContainer: {
    //     height: hp(6),
    //     width: '5%',
    //     // borderRadius:wp(2),
    //     // backgroundColor:"red",
    //     justifyContent: "center",
    //     alignItems: "center"

    // },
    lowTextContainer: {
        // height: hp(6),
        // width: '95%',
        // borderRadius:wp(2),
        // backgroundColor: "green",
        // paddingLeft: wp(4),
        // flexDirection: "row",
        // justifyContent: "space-between",
        // paddingRight: Platform.OS === 'ios' ? wp(14) : wp(13)
        paddingBottom:'7%'

    },

    container:
    {
        height: hp(12),
        width: '100%',
        // borderRadius: wp(2),
        backgroundColor: colors.white,
        flexDirection: 'row',
        // paddingHorizontal:wp(2),
        // marginVertical: wp(0.8),
        marginTop: wp(2)
    },
    leftIconContainer:
    {
        justifyContent: 'center',
        alignItems: 'center',
        height: hp(12),
        width: '20%',
        // backgroundColor: colors.gold,

    },
    leftIconStyle:
    {
        height: wp(14),
        width: wp(14),
        resizeMode: 'contain',
    },

});

export default MessagesFlatList;

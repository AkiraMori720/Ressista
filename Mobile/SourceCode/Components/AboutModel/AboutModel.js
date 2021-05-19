import React from 'react';
import {View, Text, Image, ImageBackground, StatusBar, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import { Divider, SocialIcon } from 'react-native-elements';

import Modal from 'react-native-modal';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../../Assets/Colors/colors';
import images from '../../Assets/Images/images';



class AboutModel extends React.Component {



    render() {
        return (
            <View style={styles.mainContainer}>


                <View style={styles.mainModelContainer}>
                    <View style={styles.imgView}>
                        <Image style={styles.img} source={images.ressista} />
                    </View>
                    <View style={styles.textView}>
                        <Text>Version: 1.0</Text>
                        <Text>Copyright 2020</Text>
                        <Text>Ressista.com</Text>
                        <Text>Developer Name Inc.</Text>
                    </View>

                    <View style={styles.btnView}>
                        <TouchableOpacity onPress={this.props.onPressContact}>
                            <Text style={styles.contactText}>Contact Us</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.props.onPressClose}>
                            <Text style={styles.closeText}>Close</Text>
                        </TouchableOpacity>
                    </View>



                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({

    mainContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        alignItems: 'center',
        justifyContent:'center'

    },
    modelText:
        {
            fontSize: wp(3.8)
        },
    mainModelContainer: {
        height: wp(75),
        width: '75%',
        backgroundColor: "white",
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius:wp(4)
    },
    imgView:{
        height: '40%',
        // backgroundColor:'green',
        width: '100%',
        alignItems:'center',
        justifyContent: 'center'
    },
    img:{
        height:'55%',
        width:'55%',
        resizeMode:'contain',
        tintColor:'grey'
    },
    textView:{
        height: '30%',
        // backgroundColor:'orange',
        width: '100%',
        alignItems:'center',
    },
    btnView:{
        height: '30%',
        // backgroundColor:'green',
        width: '100%',
        alignItems:'center',
        justifyContent:'space-around',
        paddingVertical:'2%'
    },
    contactText:{
        fontSize: wp(4),
        color:colors.app_blue,
        fontWeight:'bold'
    },
    closeText:{
        fontSize: wp(4),
        color:colors.app_red,
        fontWeight:'bold'
    },




});

export default AboutModel;

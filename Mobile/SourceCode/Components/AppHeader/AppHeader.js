//================================ React Native Imported Files ======================================//

import { Image, TouchableOpacity, View, StyleSheet, Text, Platform, SafeAreaView, } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import React, { Component } from 'react';

//================================ Local Imported Files ======================================//

import colors from '../../Assets/Colors/colors';


export default class AppHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerProps: this.props.nav,
        };
    }

    render() {
        const nav = this.state.drawerProps;
        return (

            <SafeAreaView style={[styles.container, { backgroundColor: this.props.bgColor || colors.app_background,borderBottomWidth: this.props.borderBottomWidth || 1 }]}>
                <TouchableOpacity style={styles.headerProfile} onPress={this.props.onLeftIconPress}>
                    {this.props.leftText !== undefined &&
                        <Text style={styles.text}>{this.props.leftText}</Text>}

                    {this.props.leftIconPath !== undefined &&
                        <Image resizeMode="contain" style={[styles.img, this.props.lefticonSize
                            !== undefined ? { height: this.props.lefticonSize, width: this.props.lefticonSize,tintColor: this.props.tintColor } : { height: 20, width: 20,  }]}
                            source={this.props.leftIconPath} />}
                </TouchableOpacity>
                <View style={styles.headerLogo}>
                    {this.props.titleLogoPath !== undefined && <Image style={this.props.titleLogosize !== undefined ?
                        { height: this.props.titleLogosize, width: this.props.titleLogosize } : { width: 30, heig7ht: 30 }}
                        source={this.props.titleLogoPath} />}
                    {this.props.title &&
                        <Text style={[styles.title, { color: this.props.textColor || colors.black }]}>{this.props.title !== undefined ? this.props.title : 'Header'}</Text>}
                </View>
                <View style={styles.headerMenu} >
                    <TouchableOpacity style={[styles.headerMenu, { marginLeft: wp(7) }]} onPress={this.props.onRightIconTwoPress}>
                        {this.props.rightIconTwoPath !== undefined &&
                            <Image resizeMode="contain" style={[styles.img, this.props.rightIconSize !== undefined ? { height: this.props.rightIconSize, width: this.props.rightIconSize } : { height: 19, width: 19, tintColor: this.props.tintColor }]}
                                source={this.props.rightIconTwoPath} />}

                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.props.onRightIconPress}>
                        {this.props.rightIconOnePath !== undefined &&
                            <Image resizeMode="contain" style={[styles.img, this.props.rightIconSizeTwo !== undefined ? { height: this.props.rightIconSizeTwo, width: this.props.rightIconSizeTwo } : { height: 19, width: 19, tintColor: this.props.tintColor }]}
                                source={this.props.rightIconOnePath} />
                        }
                    </TouchableOpacity>
                </View>


            </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth:1,
        borderColor:colors.app_light_yellow,
        paddingVertical: 16
    },
    headerProfile: {
        flex: Platform.OS === 'ios' ? 0.35 : 0.3,
        paddingLeft: 10,
        justifyContent: 'flex-start',
        alignSelf: 'center',

    }
    ,
    headerLogo: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    }
    ,
    headerMenu: {
        flex: 0.3,
        flexDirection: "row",
        paddingRight: 13,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'flex-end',
    },
    title: {
        fontSize: wp(4.5),
        color: colors.white,
        fontWeight: 'bold',
    },
    text: {
        fontSize: wp(3),
        color: colors.black,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginLeft: wp(2),
        paddingHorizontal: wp(1),
        paddingVertical: wp(0.5),
        borderRadius: wp(0.5),

    },
    img: {
        // tintColor: colors.white
    }

});


import React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import images from '../../Assets/Images/images';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import colors from '../../Assets/Colors/colors';
import Button from '../../Components/Button/Button';


class MessageRequestComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        let containerHeight = hp(7);
        let { buttonView, deleteView, counter, withoutDelete, name } = this.props;
        if (buttonView === true) {
            containerHeight = hp(13);
        }
        else {
            containerHeight = hp(7);
        }



        return (
            // <View style={styles.MainContainer}>
            <View style={[styles.innerContainer, { height: containerHeight }]}>
                <View style={styles.container}>
                    <View style={styles.leftImageContainer}>
                        <Image style={styles.imageStyle}
                            source={images.profile_icon}
                        />
                    </View>
                    <View style={styles.centerTextConrainer}>
                        <View style={styles.nameContainer}>
                            <Text style={[styles.nameMessageTestStyle, { fontSize: wp(4) }]}>{name}</Text>
                        </View>
                        <View style={styles.messageContainer}>
                            <Text style={styles.nameMessageTestStyle}>Incident: Jewelry Robby</Text>
                        </View>
                    </View>

                    {
                        withoutDelete &&
                        <View style={styles.rightViewContainer}>
                            <View style={styles.rightTimeCounterContainer}>
                                <Text style={styles.nameMessageTestStyle}>34 minutes ago</Text>

                                {
                                    counter &&
                                    <View style={styles.counter}>
                                        <Text style={[styles.nameMessageTestStyle, { color: colors.white, fontWeight: 'bold' }]}>2</Text>

                                    </View>
                                }

                            </View>
                        </View>

                    }
                    {
                        deleteView &&
                        <View style={styles.rightViewContainerDelete}>
                            <View style={styles.rightTimeCounterContainerdelete}>
                                <Text style={[styles.nameMessageTestStyle, { marginTop: wp(3), marginRight: wp(2) }]}>3 hours ago</Text>
                                <View style={styles.deleteView}>
                                    <Image style={styles.iconDelet}
                                        source={images.ic_trash}
                                    />
                                </View>
                            </View>
                        </View>
                    }





                </View>
                {
                    buttonView &&
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={[styles.style,{backgroundColor:colors.AppRedColor}]} onPress={this.props.onPressAccept}>
                            <Text style={styles.titleStyle}>ACCEPT</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.style}>
                            <Text style={styles.titleStyle}>DECLINE</Text>
                        </TouchableOpacity>

                    </View>

                }


            </View>

            // </View>
        )
    }
}

export default MessageRequestComponent;

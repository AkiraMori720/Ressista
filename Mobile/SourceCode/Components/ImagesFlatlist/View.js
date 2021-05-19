import React from 'react';
import { TouchableOpacity, Image, View } from 'react-native';

import styles from './Styles';
import Colors from '../../Assets/Colors/colors';
import images from '../../Assets/Images/images';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import AppHeader from '../../Components/AppHeader/AppHeader';
import colors from '../../Assets/Colors/colors';


class ImageFlatlist extends React.Component {



    render() {
        return (

            <View style={styles.mainContainer}>
                <View style={styles.ImageContainer}>
                    <Image source={this.props.reportImage}
                        style={styles.imageStylesAvatar}
                    />

                </View>

            </View>
        )
    }
}



export default ImageFlatlist;
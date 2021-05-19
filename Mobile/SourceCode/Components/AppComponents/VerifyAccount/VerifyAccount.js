//================================ React Native Imported Files ======================================//
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Text, Image, StatusBar, View, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';

//================================ Local Imported Files ======================================//
import AppHeader from '../../AppHeader/AppHeader';
import images from '../../../Assets/Images/images';
import colors from '../../../Assets/Colors/colors';
import styles from './style';


export default class VerifyAccount extends React.Component {

    constructor(props) {
        super(props);
        this.state = {


        };
    }



    render() {
        return (
            <View style={styles.mainContainer}>
                <StatusBar
                    barStyle="dark-content"
                    hidden={false}
                    backgroundColor={colors.app_background}
                    translucent={false}
                />

                <View style={styles.headerContainer}>
                    <AppHeader
                        title={'Verify Account'}
                        leftIconPath={images.headerLeftBack}
                        onLeftIconPress={() => this.props.navigation.goBack()}

                    />

                </View>
                <View style={styles.container}>
                    <View style={styles.textView}>
                        <Text style={styles.title}>IMAGE</Text>
                    </View>
                    <TouchableOpacity style={styles.buttonView}>
                        <Image source={images.tap} style={styles.img}/>
                    </TouchableOpacity>



                </View>
            </View>
        );
    }
}


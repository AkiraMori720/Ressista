import React from 'react';
import { TouchableOpacity, Text, View, Image } from 'react-native';

import styles from './styles';
import Colors from '../../Assets/Colors/colors';
import images from '../../Assets/Images/images';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import AppHeader from '../../Components/AppHeader/AppHeader';
import colors from '../../Assets/Colors/colors';


class CommanFlatList extends React.Component {

    render() {
        return (

            <View style={styles.mainContainer}>
                <View style={styles.MainFlatListContainer}>
                    <View style={styles.titleContainer}>
                        <TouchableOpacity style={styles.titleViewContainer} onPress={this.props.onPressReport}>
                            <Text style={styles.titleTextStyleContainer}>{this.props.title}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.imageViewContainer}>
                            <Image source={this.props.closeIcon}
                                style={styles.markerImageStyles}
                            />

                        </TouchableOpacity>


                    </View>
                    <View style={styles.bottomContainer}>
                        <View style={styles.datetimeContainer}>
                            <Text style={styles.textStyleContainer}>{this.props.Datetime}</Text>
                            <Text style={styles.UsertextStyleContainer}>{this.props.realTime}</Text>
                        </View>
                        <View style={styles.addressContainer}>
                            <Text style={styles.textStyleContainer}>{this.props.address}</Text>
                            <Text style={styles.textStyleLightContainer}> {this.props.realAddress}</Text>

                        </View>

                        {
                            this.props.isMap ?
                                null :
                                <TouchableOpacity style={styles.mapContainer}
                                                  onPress={this.props.mapScreen}>
                                    <Text style={styles.mapStyleContainer}>{this.props.map}</Text>

                                </TouchableOpacity>
                        }

                        <View style={styles.reportedContainer}>
                            <Text style={styles.textStyleContainer}>{this.props.reportText}</Text>

                            <Text style={styles.UsertextStyleContainer}>{this.props.userText}</Text>
                        </View>

                    </View>

                </View>

            </View>
        )
    }
}



export default CommanFlatList;

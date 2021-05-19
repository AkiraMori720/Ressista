
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, Text, StatusBar, Image, ImageBackground } from 'react-native';
import React from 'react';
import AppHeader from '../../../Components/AppHeader/AppHeader';
import images from '../../../Assets/Images/images';
import colors from '../../../Assets/Colors/colors';
import styles from './Styles'
import { ScrollView } from 'react-native-gesture-handler';
import {termText} from '../../../Constants/license';

class TermsConditions extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            termText: termText
        }
    }

    render() {
        const { termText } = this.state;
        return (

            <ImageBackground style={styles.mainContainer} source={images.bgImage}>

                {/* //================================ StatusBar ======================================// */}

                <StatusBar barStyle="dark-content" hidden={false} backgroundColor={colors.app_background} translucent={false} />

                {/* //================================ Header ======================================// */}

                <View style={styles.headerView}>
                    <AppHeader
                        headerHeight='100%'
                        leftIconPath={images.headerLeftBack}
                        lefticonSize={wp(5)}
                        // title={''} lji
                        titleFontSize={wp(5)}
                        bgColor={'transparent'}
                        borderBottomWidth={0.001}
                        tintColor={colors.white}
                        onLeftIconPress={() => this.props.navigation.goBack()}

                    />
                </View>

                <View style={styles.container}>
                    <View style={styles.imageView}>
                        <Image style={styles.imageStyles} source={images.ressista} />
                        <Text style={styles.ressistaText}>A safe place for people to discuss, address and improve as well as help others with their Mental health</Text>
                        <Text style={styles.headingText}>TERMS AND CONDITIONS</Text>
                    </View>
                    <View style={styles.textContainer}>
                        <ScrollView>
                            {
                                termText.map(p => {
                                    switch (p.type){
                                        case ('main_title'):
                                            return <Text style={styles.mainText}>{p.text}</Text>;
                                        case ('caption'):
                                            return <Text style={styles.captionText}>{p.text}</Text>;
                                        case ('sub1_title'):
                                            return <Text style={styles.sub1Text}>{p.text}</Text>;
                                        case ('sub2_title'):
                                            return <Text style={styles.sub2Text}>{p.text}</Text>;
                                        case ('body'):
                                            return <Text style={styles.bodyText}>{p.text}</Text>;
                                        default:
                                            return null;
                                    }
                                })
                            }
                        </ScrollView>
                    </View>
                </View>

            </ImageBackground>
        )
    }
}
export default TermsConditions;

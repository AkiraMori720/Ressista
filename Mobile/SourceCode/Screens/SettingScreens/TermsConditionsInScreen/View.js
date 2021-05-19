
import { View, Text, StatusBar, ScrollView } from 'react-native';
import React from 'react';
import colors from '../../../Assets/Colors/colors';
import styles from './Styles'
import {termText} from '../../../Constants/license';

class TermsConditionsIn extends React.Component {
    static navigationOptions = {
        title: 'Terms and Conditions'
    };

    constructor(props) {
        super(props);
        this.state = {
            termText: termText
        }
    }
    render() {
        const { termText } = this.state;
        return (
            <View style={styles.mainContainer}>

                <StatusBar barStyle="dark-content" hidden={false} backgroundColor={colors.app_background} translucent={false} />

                <View style={styles.middleView}>
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
            </View >
        )
    }
}
export default TermsConditionsIn;

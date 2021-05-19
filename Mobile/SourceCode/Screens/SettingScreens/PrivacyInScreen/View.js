
import { View, Text, StatusBar, ScrollView } from 'react-native';
import React from 'react';
import colors from '../../../Assets/Colors/colors';

import styles from './Styles'
import {privacyText} from '../../../Constants/license';

class PrivacyIn extends React.Component {
    static navigationOptions = {
        title: 'Privacy Policy'
    };

    constructor(props) {
        super(props);
        this.state = {
            privacyText: privacyText
        }
    }
    render() {
        const { privacyText} = this.state;
        return (
            <View style={styles.mainContainer}>
                <StatusBar barStyle="dark-content" hidden={false} backgroundColor={colors.app_background} translucent={false} />
                <View style={styles.middleView}>
                    <ScrollView style={{ flex: 1 }}>
                        {
                            privacyText.map(p => {
                                switch (p.type){
                                    case ('main_title'):
                                        return <Text style={styles.mainText}>{p.text}</Text>;
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
export default PrivacyIn;

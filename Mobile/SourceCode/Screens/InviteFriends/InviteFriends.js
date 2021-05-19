//================================ React Native Imported Files ======================================//
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
    View,
    Text,
    StatusBar,
    Image,
    ScrollView,
    ImageBackground,
    TouchableOpacity,
    Linking,
    Alert,
} from 'react-native';
import React from 'react';
import Toast from 'react-native-toast-message';

//================================ Local Imported Files ======================================//

import AppHeader from '../../Components/AppHeader/AppHeader';
import CheckBox from '../../Components/CheckBox/CheckBox';
import AppInput from '../../Components/AppInput/AppInput';
import Button from '../../Components/Button/Button';
import images from '../../Assets/Images/images';
import colors from '../../Assets/Colors/colors';
import styles from './style';
import {appStart as appStartAction, ROOT_INSIDE} from '../../Actions/app';
import connect from 'react-redux/lib/connect/connect';
import PropTypes from 'prop-types';

class InviteFriends extends React.Component {

    static propTypes = {
        navigation: PropTypes.object,
        appStart: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            emails: ['', '', '', '', ''],
            isValidEmail: [false, false, false, false, false]
        };
    }

    validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    inviteFriends() {
        const { appStart } = this.props;
        let check = true;
        this.state.isValidEmail.map(value => {
            if (!value) {
                Alert.alert('Info', 'Please enter a valid email address!');
                check = false;
            }
        })
        if (check) {
            Linking.openURL(`mailto:${this.state.emails}?subject=Invite to Ressista&body=Hello,\n\n We invite you to the following amazing app. \n\n Android Link and iOS Link`)
                .catch(err => {
                    console.log('email error:', err)
                })

            appStart({ root: ROOT_INSIDE });
        }
    }

    render() {
        const { isValidEmail } = this.state;
        const { navigation } = this.props;

        return (
            <ImageBackground style={styles.mainContainer} source={images.bgImage}>
                <View style={styles.headerView}>
                    {/* //================================ StatusBar ======================================// */}
                    <StatusBar
                        barStyle="dark-content"
                        hidden={false}
                        backgroundColor={colors.app_background}
                        translucent={false}
                    />

                    {/* //================================ Header ======================================// */}
                    <AppHeader
                        titleFontSize={wp(5)}
                        leftIconPath={images.headerLeftBack}
                        iconWidth={wp(3)}
                        lefticonSize={wp(5)}
                        bgColor={'transparent'}
                        borderBottomWidth={0.001}
                        tintColor={colors.white}
                        onLeftIconPress={() => navigation.goBack()}
                    />
                </View>

                {/* //================================ Logo ======================================// */}
                <View style={styles.upperView}>
                    <Image style={styles.imageStyles} source={images.ressista} />
                    <Text style={styles.ressistaText}>A safe place for people to discuss, address and improve as well as help others with their Mental health</Text>
                    <Text style={styles.headingText}>INVITE FRIENDS</Text>
                </View>
                {/* //================================ Input Fields ======================================// */}
                <View style={styles.midView}>
                    <View style={styles.inputsView}>
                        <ScrollView style={{ width: '100%' }}>
                            {
                                this.state.emails.map((email, index) => (
                                    <View key={index}>
                                        <AppInput
                                            height={hp(6)}
                                            width={'90%'}
                                            placeholder={'Email Address'}
                                            colortextInput={colors.black}
                                            paddingLeft={wp(2)}
                                            placeholderTextColor={colors.placeholder_text_color}
                                            marginTop={index === 0 && 15}
                                            backgroundColor={colors.white}
                                            borderBottomWidth={1}
                                            borderColor={colors.app_light_yellow}
                                            value={email}
                                            onChangeText={
                                                value => {
                                                    let emails = this.state.emails;
                                                    emails[index] = value;
                                                    let isValidEmail = this.state.isValidEmail;
                                                    isValidEmail[index] = this.validateEmail(value);

                                                    this.setState({ emails, isValidEmail })
                                                }
                                            }
                                            keyboardType="email-address"
                                        />
                                        <View style={styles.checkBoxContainer}>
                                            <View style={styles.checkBoxIcon}>
                                                <Image
                                                    style={styles.checkBoxIconStyle}
                                                    source={isValidEmail[index] ? images.ic_check_active : images.ic_check_inactive}
                                                />
                                            </View>
                                            <View style={styles.checkBoxText}>
                                                <Text style={styles.checkBoxTextStyle}>Valid email</Text>
                                            </View>
                                        </View>
                                    </View>
                                ))
                            }
                        </ScrollView>
                        <TouchableOpacity
                            style={styles.addButtonContainer}
                            onPress={() => {
                                let emails = this.state.emails;
                                emails.push('');
                                let isValidEmail = this.state.isValidEmail;
                                isValidEmail.push(false);
                                this.setState({ emails, isValidEmail });
                            }}
                        >
                            <Text style={styles.textAddMore}>Add More</Text>
                        </TouchableOpacity>
                        <Button
                            height={hp(8)}
                            width={'100%'}
                            style={styles.buttonStyles}
                            title={'Continue'}
                            titleStyle={styles.titleStyles}
                            onPress={() => this.inviteFriends()}
                        />
                    </View>
                </View>

            </ImageBackground>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    appStart: params => dispatch(appStartAction(params)),
});

export default connect(null, mapDispatchToProps)(InviteFriends);

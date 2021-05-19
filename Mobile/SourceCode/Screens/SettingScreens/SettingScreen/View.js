
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {View, FlatList, StatusBar, Modal, Alert} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import SettingsItem from '../../../Components/SettingsItem/SettingItem';
import RateApp from "../../../Components/RateModel/RateApp";
import images from '../../../Assets/Images/images';
import colors from '../../../Assets/Colors/colors';
import styles from "./Styles";
import AboutModel from '../../../Components/AboutModel/AboutModel';
import { appStart as appStartAction, ROOT_OUTSIDE } from '../../../Actions/app';
import { setUser as setUserAction, logout as logoutAction } from '../../../Actions/login';
import connect from 'react-redux/lib/connect/connect';
import PropTypes from 'prop-types';
import FirebaseStore from '../../../Lib/fireStore';

class SettingsScreen extends React.Component {
    static navigationOptions = {
        title: 'SETTINGS'
    }

    static propTypes = {
        navigation: PropTypes.object,
        appStart: PropTypes.func,
        logout: PropTypes.func,
        setUser: PropTypes.func,
        user: PropTypes.object
    };

    constructor(props) {
        super(props);
        let notification_enable = !!(props.user.profile.enableNotification);
        this.state = {
            modalVisible: false,
            aboutModalVisible: false,
            //================================ Data array ======================================//
            data: [
                {
                    id: 1,
                    title: 'Notifications',
                    firstIcon: images.ic_bell_blue,
                    toggleSwitchButton: true,
                    leftIconColor: colors.AppRedColor,
                    toggleEnable: notification_enable,
                },
                {
                    id: 2,
                    title: 'Rate App',
                    firstIcon: images.ic_rate_app_settings,
                    leftIconColor: colors.AppRedColor,
                    secondIcon: images.ic_chevron_right,

                },
                {
                    id: 3,
                    title: 'Contact Us',
                    firstIcon: images.ic_contact,
                    secondIcon: images.ic_chevron_right,
                    leftIconColor: colors.AppRedColor,
                },
                {
                    id: 4,
                    title: 'About the App',
                    firstIcon: images.ic_about,
                    secondIcon: images.ic_chevron_right,
                    leftIconColor: colors.AppRedColor,

                },
                {
                    id: 5,
                    title: 'Privacy Policy',
                    firstIcon: images.ic_lock,
                    secondIcon: images.ic_chevron_right,
                    leftIconColor: colors.AppRedColor,

                },
                {
                    id: 6,
                    title: 'Terms And Conditions',
                    firstIcon: images.ic_terms,
                    secondIcon: images.ic_chevron_right,
                    leftIconColor: colors.AppRedColor,

                },
                {
                    id: 7,
                    title: 'Log Out',
                    firstIcon: images.ic_logout_settings,
                    leftIconColor: colors.AppRedColor,
                    color: colors.app_red
                },
            ]
        }
    }

    onLogout() {
        const { appStart, logout } = this.props;

        auth()
            .signOut()
            .then(() => {
                logout();
                appStart({ root: ROOT_OUTSIDE });
            }).catch(e => {
                console.log('error', e);
            });
    };

    //================================ Model Functions ======================================//

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    };
    setAboutModalVisible = (visible) => {
        this.setState({ aboutModalVisible: visible });
    };

    inVisible() {
        this.setState({ modalVisible: false })
    }

    onChangeToggle = async (value) => {
        const { user, setUser } = this.props;

        const { data } = this.state;
        let newData = data;
        newData[0].toggleEnable = value;
        this.setState({ data: newData });

        let userProfile = { enableNotification: value };
        try{
            await FirebaseStore.setUserProfile(user.uid, userProfile);
            setUser({...user, profile: {...user.profile, ...userProfile}});
        } catch (e) {
            console.log('error', e);
            Alert.alert('Oop', 'Setting notification failed.');
        }
    }

    onClickListItem(id) {
        const { user, navigation } = this.props;
        const { data } = this.state;
        switch (id) {
            case 1:
                break;

            case 2:
                this.setModalVisible(true);
                break;

            case 3:
                navigation.navigate('SendFeedback', { user: user });
                break;

            case 4:
                this.setAboutModalVisible(true);
                break;

            case 5:
                navigation.navigate('PrivacyInScreen');
                break;
            case 6:
                navigation.navigate('TermsConditionsIn');
                break;
            case 7:
                Alert.alert(
                    'Logout',
                    'Do you want to log out',
                    [
                        { text: 'Logout', onPress: () => this.onLogout(), style: 'destructive' },
                        { text: 'Cancel', onPress: () => {}, style: 'cancel' }
                    ],
                    { cancelable: false }
                );
                break;
        }
    }
    //================================ Setting Item Function ======================================//
    list(item) {
        return (
            <SettingsItem
                onPress={() => {
                    this.onClickListItem(item.id)
                }}
                upperText={item.title}
                leftIconImage={item.firstIcon}
                arrowImage={item.secondIcon}
                switchItem={item.switchItem}
                rightIconColor={colors.grey1}
                rightIconSize={wp(3.5)}
                leftIconSize={wp(4.5)}
                height={hp(8)}
                backgroundColor={'transparent'}
                leftIconColor={item.color}
                textColor={item.color}
                toggleSwitchButton={item.toggleSwitchButton}
                onChangeToggle={this.onChangeToggle}
                toggleEnable={item.toggleEnable}
            />
        )
    }
    render() {
        const { modalVisible, aboutModalVisible } = this.state;
        const { user, navigation } = this.props;

        return (
            <View style={styles.mainContainer}>
                {/* //================================ StatusBar ======================================// */}

                <StatusBar barStyle="dark-content" hidden={false} backgroundColor={colors.appDarkBlue} translucent={false} />
                {/* //================================ FlatList ======================================// */}
                <View style={styles.container}>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        data={this.state.data}
                        renderItem={({ item }) => this.list(item)}
                        keyExtractor={item => `${item.id}`}
                    />
                </View>
                {/* //================================ Model ======================================// */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        this.setModalVisible(!modalVisible);
                    }}>
                    <RateApp
                        onClose={() => {
                            this.setModalVisible(!modalVisible)
                        }}
                    />
                </Modal>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={aboutModalVisible}
                    onRequestClose={() => {
                        this.setAboutModalVisible(!aboutModalVisible);
                    }}>
                    <AboutModel
                        onPressContact={() => {
                            navigation.navigate('SendFeedback', {user: user});
                            this.setAboutModalVisible(!aboutModalVisible);
                        }}
                        onPressClose={() => {
                            this.setAboutModalVisible(!aboutModalVisible)
                        }}
                    />
                </Modal>
                {/* //================================ Logout ======================================// */}
                {/*<TouchableOpacity style={styles.logout}*/}
                {/*    onPress={() => this.props.navigation.navigate('LoginScreen')}*/}
                {/*>*/}
                {/*    <Image*/}
                {/*        style={styles.logoutIcon}*/}
                {/*        source={images.ic_logout_settings}*/}
                {/*    />*/}
                {/*    <Text style={[styles.textStyle, {*/}
                {/*        color: colors.white*/}
                {/*    }]}>Log Out</Text>*/}

                {/*</TouchableOpacity>*/}
            </View>
        )
    }
}

const mapStateToProps = state => ({
    user: state.login.user
});

const mapDispatchToProps = dispatch => ({
    appStart: params => dispatch(appStartAction(params)),
    logout: () => dispatch(logoutAction()),
    setUser: params => dispatch(setUserAction(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);

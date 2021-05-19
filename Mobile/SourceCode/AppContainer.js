import React from 'react';
import PropTypes from 'prop-types';
import {CardStyleInterpolators, createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import {connect} from 'react-redux';
import Navigation from './Lib/Navigation';
import {defaultHeader, getActiveRouteName} from './Lib/Navigation/utiles';
import {ROOT_INSIDE, ROOT_LOADING, ROOT_ONBOARD, ROOT_OUTSIDE, ROOT_SET_NAME} from './Actions/app';
import reduxStore from './Lib/createStore';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

//================================ Local Imported Files ======================================//
import NewPassword from './Screens/AuthScreens/LoginScreens/EnterNewPasswordScreen/View';
import ResetPassword from './Screens/AuthScreens/LoginScreens/ResetPasswordScreen/View';
import SignupWith from './Screens/AuthScreens/SignupScreens/SignupWithScreen/View';
import SignUpScreen from './Screens/AuthScreens/SignupScreens/SignupScreen/View';
import LoginScreen from './Screens/AuthScreens/LoginScreens/LoginScreen/View';
import SendFeedback from './Screens/SettingScreens/SendFeedBackScreen/View';
import PrivacyScreen from './Screens/SettingScreens/PrivacyScreen/View';
import PrivacyInScreen from './Screens/SettingScreens/PrivacyInScreen/View';
import AboutApp from './Screens/SettingScreens/AboutAppScreen/View';
import OnBoarding from './Screens/OnBoardingScreen/View';
import SplashScreen from './Screens/SplashScreen/View';
import images from './Assets/Images/images';
import colors from './Assets/Colors/colors';
import Chat from './Screens/Chat/Chat';
import ForumScreen from './Screens/ForumScreen/ForumScreen';
import UserProfileForums from './Components/AppComponents/UserProfileForums/UserProfileForums';
import EditProfile from './Screens/EditProfile/EditProfile';
import SetLocationScreen from './Screens/EditProfile/SetLocation';
import InviteFriends from './Screens/InviteFriends/InviteFriends';
import UserProfileScreen from './Screens/UserProfileScreen/UserProfileScreen';
import CreateForumTopic from './Screens/CreateForumTopic/CreateForumTopic';
import DistanceRelationshipsComponent from './Components/AppComponents/DistanceRelationshipsComponent/DistanceRelationshipsComponent';
import LongDistance from './Screens/LongDistance/LongDistance';
import MessageComponent from './Components/AppComponents/MessageComponent/MessageComponent';
import TermsConditions from './Screens/SettingScreens/TermConditionScreen/TermsConditions';
import TermsConditionsIn from './Screens/SettingScreens/TermsConditionsInScreen/View';
import RelationshipsComponent from './Components/AppComponents/RelationshipsComponent/RelationshipsComponent';
import VerifyAccount from './Components/AppComponents/VerifyAccount/VerifyAccount';

// OutSide Screens
import ForumComponent from './Components/AppComponents/ForumComponent/ForumComponent';
import Relationships from './Screens/Relationships/Relationships';
import UserProfile from './Screens/UserProfile/UserProfile';
import Messages from './Screens/Messages/Messages';
import SettingsScreen from './Screens/SettingScreens/SettingScreen/View';
import CategoryScreen from './Screens/CategoryScreen';

// BuildProfile Screen
import BuildProfile from './Screens/BuildProfile/BuildProfile';

const UserProfileNav = createStackNavigator();
const UserProfileStack = () => {
    return (
        <UserProfileNav.Navigator screenOptions={{...defaultHeader}}>
            <UserProfileNav.Screen
                name='UserProfile'
                component={UserProfile}
                options={UserProfile.navigationOptions}
            />
            <UserProfileNav.Screen
                name="SetLocationScreen"
                component={SetLocationScreen}
                options={SetLocationScreen.navigationOptions}
            />
        </UserProfileNav.Navigator>
    );
}

const ForumNav = createStackNavigator();
const ForumStack = () => {
    return (
        <ForumNav.Navigator screenOptions={{...defaultHeader}}>
            <ForumNav.Screen
                name='ForumScreen'
                component={ForumScreen}
                options={ForumScreen.navigationOptions}
            />
            <ForumNav.Screen
                name='CategoryScreen'
                component={CategoryScreen}
                options={CategoryScreen.navigationOptions}
            />
        </ForumNav.Navigator>
    );
}

const RelationshipsNav = createStackNavigator();
const RelationshipsStack = () => {
    return (
        <RelationshipsNav.Navigator screenOptions={{...defaultHeader}}>
            <RelationshipsNav.Screen
                name='Relationships'
                component={Relationships}
            />
        </RelationshipsNav.Navigator>
    );
}

const SettingsScreenNav = createStackNavigator();
const SettingsScreenStack = () => {
    return (
        <SettingsScreenNav.Navigator screenOptions={{...defaultHeader}}>
            <SettingsScreenNav.Screen
                name='SettingsScreen'
                component={SettingsScreen}
                options={SettingsScreen.navigationOptions}
            />
        </SettingsScreenNav.Navigator>
    );
}

const MessagesNav = createStackNavigator();
const MessagesStack = () => {
    return (
        <MessagesNav.Navigator screenOptions={{...defaultHeader}}>
            <MessagesNav.Screen
                name='Messages'
                component={Messages}
                options={Messages.navigationOptions}
            />
        </MessagesNav.Navigator>
    );
}

/*
    Navigation Bottom Tab
 */
const BottomTab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <BottomTab.Navigator
            initialRouteName={'ForumStack'}
            tabBarOptions={{
                showIcon: true,
                showLabel: false,
                style: { backgroundColor: colors.white }
            }}
        >
            <BottomTab.Screen
                name='ForumStack'
                component={ForumStack}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ focused }) => {
                        const { category } = reduxStore.getState();
                        return(<View>
                                { category.updateForums > 0 ?<View style={{ position: 'absolute', zIndex: 100, top: -4, left: -4 }}><FontAwesome color={colors.badge} size={10} name={'circle'}/></View>:null}
                                <Image
                                    source={images.ic_messages_inactive}
                                    style={{ height: 25, width: 25, resizeMode: 'contain', tintColor: focused ? 'gold' : colors.dropdownBg }}
                                />
                            </View>
                        )
                    }
                }}
            />
            <BottomTab.Screen
                name='RelationshipsStack'
                component={RelationshipsStack}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ focused }) => {
                        const { relationship } = reduxStore.getState();
                        return (<View>
                                { relationship.updateForums > 0 ?<View style={{ position: 'absolute', zIndex: 100, top: -4, left: -4 }}><FontAwesome color={colors.badge} size={10} name={'circle'}/></View>:null}
                                <Image
                                    source={images.ic_affirmatio_inactive}
                                    style={{ height: 22, width: 22, resizeMode: 'contain', tintColor: focused ? "gold" : colors.dropdownBg }}
                                />
                            </View>
                        )
                    }
                }}
            />
            <BottomTab.Screen
                name='UserProfileStack'
                component={UserProfileStack}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={images.ic_profile_inactive}
                            style={{ height: 25, width: 25, resizeMode: 'contain', tintColor: focused ? "gold" : colors.dropdownBg }}
                        />
                    )
                }}
            />
            <BottomTab.Screen
                name='MessagesStack'
                component={MessagesStack}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ focused }) => {
                        const { message } = reduxStore.getState();
                        return(<View>
                                { message.unread > 0 ?<View style={{ position: 'absolute', zIndex: 100, top: -4, left: -4 }}><FontAwesome color={colors.badge} size={10} name={'circle'}/></View>:null}
                                <Image
                                    source={images.ic_forums_inactive}
                                    style={{ height: 28, width: 28, resizeMode: 'contain', tintColor: focused ? "gold" : colors.dropdownBg }}
                                />
                            </View>
                        );
                    }
                }}
            />
            <BottomTab.Screen
                name='SettingsScreenStack'
                component={SettingsScreenStack}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={images.ic_settings_inactive}
                            style={{ height: 25, width: 25, resizeMode: 'contain', tintColor: focused ? "gold" : colors.dropdownBg }}
                        />
                    )
                }}
            />
        </BottomTab.Navigator>
    )
}

/*
    InsideStack
 */
const Inside = createStackNavigator();
const InsideStack = () => {
    return (
        <Inside.Navigator screenOptions={{ ...defaultHeader }}>
            <Inside.Screen
                name='TabHome'
                component={TabNavigator}
                options={{ headerShown: false }}
            />
            <Inside.Screen
                name="SendFeedback"
                component={SendFeedback}
                options={SendFeedback.navigationOptions}
            />
            <Inside.Screen
                name="PrivacyInScreen"
                component={PrivacyInScreen}
                options={PrivacyInScreen.navigationOptions}
            />
            <Inside.Screen
                name="TermsConditionsIn"
                component={TermsConditionsIn}
                options={TermsConditionsIn.navigationOptions}
            />
            <Inside.Screen
                name="EditProfile"
                component={EditProfile}
                options={EditProfile.navigationOptions}
            />
            <Inside.Screen
                name="InviteFriends"
                component={InviteFriends}
                options={{ headerShown: false }}
            />
            <Inside.Screen
                name="CreateForumTopic"
                component={CreateForumTopic}
                options={CreateForumTopic.navigationOptions}
            />
            <Inside.Screen
                name="LongDistance"
                component={LongDistance}
                options={{ headerShown: false }}
            />
            <Inside.Screen
                name="UserChat"
                component={Chat}
            />
            <Inside.Screen
                name="UserProfileScreen"
                component={UserProfileScreen}
                options={UserProfileScreen.navigationOptions}
            />
        </Inside.Navigator>
    );
};

/*
    OutSide Stack
 */
const OutSide = createStackNavigator();
const OutSideStack = () => {
    return (
        <OutSide.Navigator
            initialRouteName={'SignupWith'}
            headerMode={'none'}
            screenOptions={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }} >

            {/*Auth + Settings Screens*/}

            <OutSide.Screen name="ResetPassword" component={ResetPassword} />
            <OutSide.Screen name="TermsConditions" component={TermsConditions} />
            <OutSide.Screen name="PrivacyScreen" component={PrivacyScreen} />
            <OutSide.Screen name="SignUpScreen" component={SignUpScreen} />
            <OutSide.Screen name="LoginScreen" component={LoginScreen} />
            <OutSide.Screen name="NewPassword" component={NewPassword} />
            <OutSide.Screen name="SignupWith" component={SignupWith} />
            <OutSide.Screen name="AboutApp" component={AboutApp} />


            {/*Components*/}

            <OutSide.Screen name="UserProfileForums" component={UserProfileForums} />
            <OutSide.Screen name="DistanceRelationshipsComponent" component={DistanceRelationshipsComponent} />
            <OutSide.Screen name="MessageComponent" component={MessageComponent} />
            <OutSide.Screen name="RelationshipsComponent" component={RelationshipsComponent} />
            <OutSide.Screen name="ForumComponent" component={ForumComponent} />
            <OutSide.Screen name="VerifyAccount" component={VerifyAccount} />

        </OutSide.Navigator>
    );
}

const BuildProfileNav = createStackNavigator();
const BuildProfileStack = () => {
    return (
        <BuildProfileNav.Navigator
            headerMode={'none'}
            screenOptions={{cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}}>
            <BuildProfileNav.Screen name="BuildProfile" component={BuildProfile} />
        </BuildProfileNav.Navigator>
    );
}


// App
const Stack = createStackNavigator();
const App = React.memo(({ root }) => {
     console.log('app root', root);

    React.useEffect(() => {
        const state = Navigation.navigationRef.current?.getRootState();
        Navigation.routeNameRef.current = getActiveRouteName(state);
    }, []);

    return (
        <NavigationContainer
            ref={Navigation.navigationRef}
            onStateChange={(state) => {
                const previousRouteName = Navigation.routeNameRef.current;
                const currentRouteName = getActiveRouteName(state);
                if (previousRouteName !== currentRouteName) {
                }
                Navigation.routeNameRef.current = currentRouteName;
            }}
        >
            <Stack.Navigator screenOptions={{ headerShown: false, animationEnabled: false }}>
                <>
                    {root === ROOT_LOADING ? (
                        <Stack.Screen
                            name='SplashScreen'
                            component={SplashScreen}
                        />
                    ) : null}
                    {root === ROOT_ONBOARD ? (
                        <Stack.Screen
                            name='onboard'
                            component={OnBoarding}
                        />
                    ) : null}
                    {root === ROOT_OUTSIDE  ? (
                        <Stack.Screen
                            name='OutSideStack'
                            component={OutSideStack}
                        />
                    ) : null}
                    {root === ROOT_SET_NAME  ? (
                        <Stack.Screen
                            name='BuildProfileStack'
                            component={BuildProfileStack}
                        />
                    ) : null}
                    {root === ROOT_INSIDE ? (
                        <Stack.Screen
                            name='InsideStack'
                            component={InsideStack}
                        />
                    ) : null}
                </>
            </Stack.Navigator>
        </NavigationContainer>
    );
});

const mapStateToProps = state => ({
    root: state.app.root
});

App.propTypes = {
    root: PropTypes.string
};

const AppContainer = connect(mapStateToProps)(App);
export default AppContainer;





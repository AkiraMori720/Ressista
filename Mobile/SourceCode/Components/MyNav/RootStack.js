import React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator, DrawerItem} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import login from '../screens/login/view';
import ReserveRoom from '../screens/ReserveRoom/view';
import SubmitReserveRoom from "../screens/ReserveRoom/SubmitReserveRoom/view"
import MyReservations from "../screens/myReservations/view"
import Rooms from "../screens/Rooms/view"
import styles from './styles';
import ReservationDetails from "../screens/ReservationDetails/view"
import RoomDetails from "../screens/RoomDetails/view"
import {Image} from 'react-native-elements';
import commonDataManager from "../Services/Singleton";
import {getValueForFieldName} from "../UtilMethods/CommonMethods";
import ApiClient from "../Services/ApiClient";
const RootStack = createStackNavigator();
const Drawer = createDrawerNavigator();
let commonData = commonDataManager.getInstance();

import {CommonActions } from '@react-navigation/native';






function drawer() {
    return (
        <Drawer.Navigator
            drawerStyle={{backgroundColor:"#F4F4F4"}}
            initialRouteName="ReserveRoom"  drawerContent={props => CustomDrawerContent(props)}>
            <Drawer.Screen    name="ReserveRoom" component={ReserveRoom}/>
            <Drawer.Screen   name="MyReservations" component={MyReservations}/>
            <Drawer.Screen   name="Rooms" component={Rooms}/>
        </Drawer.Navigator>
    );
}

export default function MyStack() {
    return (
        <NavigationContainer>
            <RootStack.Navigator headerMode={"none"}  >
                <RootStack.Screen name="login" component={login}  />
                <RootStack.Screen name="drawer" component={drawer}  />
                <RootStack.Screen name="SubmitReserveRoom" component ={SubmitReserveRoom}  />
                <RootStack.Screen name="ReservationDetails" component ={ReservationDetails}  />
                <RootStack.Screen  name="RoomDetails" component ={RoomDetails}  />
            </RootStack.Navigator>
        </NavigationContainer>
    );
};

function CustomDrawerContent(props) {
    let userInfo = commonData.getUser().info.fields;
    const FullName = getValueForFieldName("FullName","",userInfo);
    const Email = getValueForFieldName("Email","",userInfo);
    const profilePicUrl = getValueForFieldName('Avatar', '', userInfo);

    return (
        <View {...props} style={styles.drawerMainContainer}  >
            <View style={styles.userInfoContainer}>
                <View style={styles.userImageContainer} >
                    <Image source={{uri:ApiClient.getAbsoluteImage(profilePicUrl)}}  style={styles.userProfileImage} resizeMode={"contain"}/>
                </View>
                <View style={styles.userTextContainer}>
                    <Text style={styles.userNameText}>{FullName}</Text>
                    <Text style={styles.emailText}>{Email}</Text>
                </View>
            </View>
            <View style={styles.drawerItemsContainer} >
                <DrawerItem
                    label={()=><Text style={styles.drawerItemLabelText} >{"Reserve Room"}</Text>}
                    onPress={()=>props.navigation.navigate("ReserveRoom")}
                    icon={()=> <Image source={require("../assets/images/Reserve-icon.png")} style={styles.drawerItemImage}
                    />}/>
                <DrawerItem
                    label={()=><Text style={styles.drawerItemLabelText} >{"My Reservations"}</Text>}
                    onPress={()=>props.navigation.navigate("MyReservations")}
                    icon={()=> <Image source={require("../assets/images/My-reservation-icon.png")} style={styles.drawerItemImage}
                    />}/>

                <DrawerItem
                    label={()=><Text style={styles.drawerItemLabelText} >{"Rooms"}</Text>}
                    onPress={()=>props.navigation.navigate("Rooms")}
                    icon={()=> <Image source={require("../assets/images/Room-icon.png")} style={styles.drawerItemImage}
                    />}/>
                <DrawerItem
                    label={()=><Text style={styles.drawerItemLabelText} >{"Log Out"}</Text>}
                    onPress={()=>onLogout(props.navigation)}
                    icon={()=> <Image source={require("../assets/images/Logout-icon.png")} style={styles.drawerItemImage}
                    />}/>

            </View>

        </View>
    );
}

            function onLogout(navigation){
                navigation.navigate("login");
                  ApiClient.logout((response)=>{
                      commonData.setUser({
                          token: '',
                          info: '',
                          encryptedData: ''
                      });

})
}





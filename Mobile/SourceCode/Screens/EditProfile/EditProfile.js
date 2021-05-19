
import {
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {StyleSheet, Text, Image, StatusBar, View, TouchableOpacity, ScrollView, Alert, Modal} from 'react-native';
import React from 'react';
import Button from '../../Components/Button/Button';
import images from '../../Assets/Images/images';
import colors from '../../Assets/Colors/colors';
import styles from './style';
import AppInput from '../../Components/AppInput/AppInput';
import Dropdown from '../../Components/ModelDropDown/ModelDropDown';
import CheckBox from '../../Components/CheckBox/CheckBox';
import {setUser as setUserAction} from '../../Actions/login';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import FirebaseStore from '../../Lib/fireStore';
import ActivityIndicator from '../../Components/ActivityIndicator';
import { showToast } from '../../Lib/info';
import isValidEmail from '../../Lib/isValidEmail';
import {KeyboardUtils} from 'react-native-keyboard-input';
import equal from 'deep-equal';
import FilesActions from '../../Components/FilesActions';
import ImagePicker from 'react-native-image-crop-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Geolocation from '@react-native-community/geolocation';
import MapView, {Marker} from "react-native-maps";
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Geocoder from 'react-native-geocoding';

const imagePickerConfig = {
    cropping: true,
    freeStyleCropEnabled: false,
    compressImageQuality: 0.8,
    avoidEmptySpaceAroundImage: false,
    enableRotationGesture: true,
    cropperChooseText: 'Choose',
    cropperCancelText: 'Cancel',
    includeBase64: true,
    hideBottomControls: true,
    width: 300,
    height: 300,
    showCropGuidelines: false
};

Geocoder.init('AIzaSyB8wNWOIM_X9BT_21ADrtZ0Y1Snj1iQihI');

class EditProfile extends React.Component {
    static navigationOptions = {
        title: 'Edit Profile'
    }
    static propTypes = {
        user: PropTypes.object,
        setUser: PropTypes.func
    }

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            saving: false,
            email_error: false,
            firstName: '',
            lastName: '',
            displayName: '',
            displayEmail: '',
            mapLocation: '',
            age: null,
            showAge: false,
            location: '',
            showMaps: false,
            showLocation: false,
            showFilesAction: false,
            avatar: {},
            region: {},
            coordinate: {
                latitude: 0,
                longitude: 0
            }
        };
    }

    shouldComponentUpdate(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): boolean {
        const { loading, saving, email_error, firstName, lastName, displayName, age, displayEmail, showAge, location, showMaps, showLocation, mapLocation, showFilesAction, avatar, coordinate } = this.state;
        const { user } = this.props;
        if(!equal(nextProps.avatar, avatar)){
            return true;
        }
        if(!equal(nextProps.user, user)){
            return true;
        }
        if(nextState.loading !== loading){
            return true;
        }
        if(nextState.saving !== saving){
            return true;
        }
        if(nextState.email_error !== email_error){
            return true;
        }
        if(nextState.fistName !== firstName){
            return true;
        }
        if(nextState.lastName !== lastName){
            return true;
        }
        if(nextState.displayName !== displayName){
            return true;
        }
        if(nextState.displayEmail !== displayEmail){
            return true;
        }
        if(nextState.age !== age){
            return true;
        }
        if(nextState.showAge !== showAge){
            return true;
        }
        if(nextState.location !== location){
            return true;
        }
        if(nextState.mapLocation !== mapLocation){
            return true;
        }
        if(nextState.showFilesAction !== showFilesAction){
            return true;
        }
        if(nextState.showLocation !== showLocation){
            return true;
        }
        if(!equal(nextState.coordinate !== coordinate)){
            return true;
        }
        return nextState.showMaps !== showMaps;

    }

    componentDidMount() {
        this.init();
    }

    init = async () => {
        const { user } = this.props;
        let profile = await FirebaseStore.getUserProfile(user.uid);
        console.log('userProfile', profile);
        if(profile){
            const { firstName, lastName, displayName, displayEmail, age, showAge, location, showLocation } = this.state;
            return this.setState({
                loading: false,
                firstName: profile.firstName??firstName,
                lastName: profile.lastName??lastName,
                displayName: profile.displayName??displayName,
                displayEmail: profile.displayEmail??displayEmail,
                age: profile.age??age,
                showAge: profile.showAge??showAge,
                location: profile.location??location,
                showLocation: profile.showLocation??showLocation,
                avatar: { url: profile.photoURL??null, data: null}
            });
        }
        this.setState({loading: false});
    }

    toggleFilesActions = (type) => {
        this.setState(prevState => ({ showFilesAction: !prevState.showFilesAction }));
    };

    setPart = (image) => {
        console.log('image', image);
        this.setState({ avatar: {url: image.path, data: image.data}});
    }

    takePhoto = async() => {
        try {
            await ImagePicker.clean();
            const image = await ImagePicker.openCamera(imagePickerConfig);
            this.setPart(image);
        } catch (e) {
            console.log(e, "Take Photo Error: ");
        }
    }

    chooseFromLibrary = async() => {
        try {
            await ImagePicker.clean();
            const image = await ImagePicker.openPicker(imagePickerConfig);
            this.setPart(image);
        } catch (e) {
            console.log(e, "Choose From Library Error: ");
        }
    }

    renderFilesActions = () => {
        const { showFilesAction } = this.state;

        if (!showFilesAction) {
            return null;
        }
        return (
            <FilesActions
                key='files-actions'
                hideActions={this.toggleFilesActions}
                takePhoto={this.takePhoto}
                chooseFromLibrary={this.chooseFromLibrary}
            />
        );
    };

    onChangeCoordinate = (coordinate) => {
        Geocoder.from(coordinate.latitude, coordinate.longitude)
            .then(json =>{
                let address = json.results[0].address_components[0];
                console.log('address', address);
                this.setState({ coordinate, mapLocation: address});
        })
        .catch(error =>{
            console.log('Geocoder error', error);
            this.setState({coordinate});
        })
    }

    renderGoogleMaps = () => {
        const { showMaps, coordinate, region, mapLocation } = this.state;
        console.log('region', region, coordinate);
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={showMaps}
                onRequestClose={() => {
                    this.setState({showMaps: false});
                }}>
                <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', alignItems: 'center', justifyContent: 'center'}}>
                    <View style={{width: '95%', backgroundColor: colors.app_background, padding: 8, borderRadius: 8}}>
                        <TouchableOpacity
                            style={{alignItems:'flex-end', padding: 8}}
                            onPress={() => {
                            this.setState({showMaps: false});
                        }}>
                            <FontAwesome5Icon name={'times'} size={26} color={'black'}/>
                        </TouchableOpacity>
                        <View style={{ width: '100%', height: 300 }}>
                            <MapView
                                style={{ ...StyleSheet.absoluteFillObject, borderRadius: 8 }}
                                region={region}
                                onRegionChange={this.onChangeLocation}
                            >
                                <Marker
                                    draggable
                                    coordinate={coordinate}
                                    onDragEnd={(e) => this.onChangeCoordinate(e.nativeEvent.coordinate)}
                                    title={'Current Position'}
                                    description={''}
                                    />
                            </MapView>
                        </View>
                        <AppInput
                            placeholder={''}
                            marginTop={8}
                            placeholderTextColor={colors.gray}
                            value={mapLocation}
                            onChangeText={(value) => this.setState({mapLocation: value})}
                        />
                        <View style={{alignItems:'center', padding: 8}}>
                            <Button
                                title={'Set Location'}
                                titleTextColor={colors.white}
                                bgColor={colors.app_dark_background}
                                onPress={() => {}}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }

    saveProfile = async () => {
        const { firstName, lastName, displayEmail, age, showAge, location, showLocation, avatar } = this.state;
        const { user, setUser } = this.props;

        if(!isValidEmail(displayEmail)){
            this.setState({ email_error: true });
            return;
        }
        this.setState({ saving: true });
        KeyboardUtils.dismiss();
        try{
            try{
                if(avatar.url && avatar.data){
                    FirebaseStore.setUserAvatar(user.uid, avatar, async (avatar_url) => {
                        let profile = {
                            firstName,
                            lastName,
                            displayName: `${firstName} ${lastName}`,
                            displayEmail,
                            age,
                            showAge,
                            location,
                            showLocation,
                            photoURL: avatar_url
                        };
                        await FirebaseStore.setUserProfile(user.uid, profile);
                        setUser({...user, profile:{...user.profile, ...profile}});
                        showToast('Your Profile saved successfully');
                        this.setState({ saving: false });
                        this.setState({ email_error: false });
                    }, () => {
                        Alert.alert('Oops', 'Saving Profile Failed');
                        this.setState({ saving: false });
                        this.setState({ email_error: false });
                    });
                    return;
                }
                let profile = {
                    firstName,
                    lastName,
                    displayName: `${firstName} ${lastName}`,
                    displayEmail,
                    age,
                    showAge,
                    location,
                    showLocation
                };
                await FirebaseStore.setUserProfile(user.uid, profile);
                setUser({...user, profile: {...user.profile, ...profile}});
                showToast('Your Profile saved successfully');
            } catch (e){
                console.log('Upload Avatar Error', e);
            }
        }catch (e) {
            Alert.alert('Oops', e.data?e.data.error:'Saving Profile Failed');
        }
        this.setState({ saving: false });
        this.setState({ email_error: false });
    }

    onSetLocation = () => {
        Geolocation.getCurrentPosition((position)=> {
            console.log('current position', position);
            this.setState({ region: {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1
                }, coordinate: {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                }, showMaps : true})
        });
    }

    onChangeLocation = (position) => {
        console.log('location', position);
    }

    render() {
        const { loading, firstName, lastName, displayName, displayEmail, age, showAge, location, showLocation, saving, email_error, avatar } = this.state;
        const { user } = this.props;
        let ages = [];
        for(let i=1; i<101; i++){
            ages.push(i);
        }
        let image_uri = images.profile_icon;
        if(avatar.url){
            image_uri = { uri: avatar.url };
        }

        return (
            <View style={styles.mainContainer}>
                <StatusBar
                    barStyle="dark-content"
                    hidden={false}
                    backgroundColor={colors.app_background}
                    translucent={false}
                />
                { loading ? <ActivityIndicator  size='large' style={styles.loading}/>: null}
                <View style={styles.container}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{paddingBottom:hp(10)}}>

                    <View style={styles.imageView}>
                        <TouchableOpacity onPress={() => this.toggleFilesActions()}>
                            <Image style={styles.image} source={image_uri}/>
                            <MaterialCommunityIcons size={24} name={'square-edit-outline'} color={colors.dark_gold} style={{ position: 'absolute', right: 4, bottom: 4 }}/>
                        </TouchableOpacity>
                        <Text style={styles.name}>{(user.profile&&user.profile.displayName)?`@${user.profile.displayName}`:''}{(user.profile&&user.profile.age)?`, ${user.profile.age}`:''}</Text>
                        <View style={styles.viewAddress}>
                            { user.profile && user.profile.location ? <Image style={styles.iconMarker} source={images.ic_marker} /> : null }
                            <Text style={styles.number}>{(user.profile && user.profile.location)??''}</Text>
                        </View>
                    </View>
                    <View style={styles.inputsView}>
                        <Text style={styles.textTitles}>FIRST NAME</Text>
                        <AppInput
                            placeholder={'Cyril'}
                            placeholderTextColor={colors.gray}
                            value={firstName}
                            onChangeText={(value) => this.setState({firstName: value})}
                        />

                        <Text style={styles.textTitles}>LAST NAME</Text>
                        <AppInput
                            placeholder={'Perkins'}
                            placeholderTextColor={colors.gray}
                            value={lastName}
                            onChangeText={(value) => this.setState({lastName: value})}
                        />

                        <Text style={styles.textTitles}>EMAIL ADDRESS</Text>
                        <AppInput
                            placeholder={'sample@email.com'}
                            placeholderTextColor={colors.gray}
                            value={displayEmail}
                            onChangeText={(value) => this.setState({displayEmail: value})}
                        />
                        {email_error ? <Text style={styles.errorMessage}>{'Invalid Email Address'}</Text> : null}

                        <Text style={styles.textTitles}>AGE</Text>
                        <View style={styles.dropdownView}>
                            <Dropdown
                                options={ages}
                                defaultButtontext={age}
                                buttonTextColor={colors.black}
                                dropdownStyle={{ height: '100%',width: '100%' }}
                                dropheight={'25%'}
                                tintColor={colors.black}
                                dropdownOptionsStyle={{width:'87%',marginRight:'10%',marginTop:'0.2%'}}
                                onSelect={(index, value) => this.setState({age: value})}
                            />
                        </View>
                        <View style={styles.viewCheckBox}>
                        <CheckBox
                            checkTitle={'Visible'}
                            value={showAge}
                            onChange={(value) => this.setState({showAge: value})}
                        />
                        </View>

                        <Text style={styles.textTitles}>LOCATION</Text>
                        <TouchableOpacity style={styles.locationView} onPress={() => this.onSetLocation()}>
                            <Text>{location}</Text>
                            <Image style={styles.iconMarker} source={images.ic_marker} />
                        </TouchableOpacity>
                        <View style={styles.viewCheckBox}>
                            <CheckBox
                                checkTitle={'Visible'}
                                value={showLocation}
                                onChange={(value) => this.setState({showLocation: value})}
                            />
                        </View>

                        <View style={styles.btnView}>
                            <Button
                                title={'Save'}
                                titleTextColor={colors.white}
                                bgColor={colors.app_dark_background}
                                onPress={this.saveProfile}
                                loading={saving}
                            />
                        </View>
                    </View>
                    </ScrollView>
                    { this.renderFilesActions() }
                    { this.renderGoogleMaps() }
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    user: state.login.user
});

const mapDispatchToProps = dispatch => ({
    setUser: params => dispatch(setUserAction(params))
});
export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);

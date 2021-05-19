
import {
    Text,
    Image,
    StatusBar,
    View,
    TouchableOpacity,
    Alert,
    ImageBackground, ScrollView,
} from 'react-native';
import React from 'react';
import Button from '../../Components/Button/Button';
import images from '../../Assets/Images/images';
import colors from '../../Assets/Colors/colors';
import styles from './style';
import AppInput from '../../Components/AppInput/AppInput';
import {loginSuccess as loginSuccessAction, setUser as setUserAction} from '../../Actions/login';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import FirebaseStore from '../../Lib/fireStore';
import ActivityIndicator from '../../Components/ActivityIndicator';
import { showToast } from '../../Lib/info';
import {KeyboardUtils} from 'react-native-keyboard-input';
import equal from 'deep-equal';
import FilesActions from '../../Components/FilesActions';
import ImagePicker from 'react-native-image-crop-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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

class BuildProfile extends React.Component {
    static navigationOptions = {
        title: 'Edit Profile'
    }
    static propTypes = {
        user: PropTypes.object,
        setUser: PropTypes.func,
        loginSuccess: PropTypes.func
    }

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            saving: false,
            firstName: '',
            lastName: '',
            showFilesAction: false,
            avatar: {}
        };
    }

    shouldComponentUpdate(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): boolean {
        const { loading, saving, firstName, lastName, showFilesAction, avatar } = this.state;
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
        if(nextState.fistName !== firstName){
            return true;
        }
        if(nextState.lastName !== lastName){
            return true;
        }
        if(nextState.showFilesAction !== showFilesAction){
            return true;
        }
        return false;

    }

    componentDidMount() {
        this.init();
    }

    init = async () => {
        const { user } = this.props;
        let profile = await FirebaseStore.getUserProfile(user.uid);
        console.log('userProfile', profile);
        if(profile){
            const { firstName, lastName } = this.state;
            return this.setState({
                loading: false,
                firstName: profile.firstName??firstName,
                lastName: profile.lastName??lastName,
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

    saveProfile = async () => {
        const { firstName, lastName, avatar } = this.state;
        const { user, setUser, loginSuccess } = this.props;

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
                };
                await FirebaseStore.setUserProfile(user.uid, profile);
                setUser({...user, profile: {...user.profile, ...profile}});
                loginSuccess({...user, profile: {...user.profile, ...profile}});
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

    render() {
        const { loading, firstName, lastName,saving, avatar } = this.state;
        const { user } = this.props;

        let image_uri = images.profile_icon;
        if(avatar.url){
            image_uri = { uri: avatar.url };
        }

        return (
            <ImageBackground style={styles.mainContainer} source={images.bgImage}>
                <StatusBar
                    barStyle="dark-content"
                    hidden={false}
                    backgroundColor={colors.app_background}
                    translucent={false}
                />
                { loading ? <ActivityIndicator  size='large' style={styles.loading}/>: null}
                <ScrollView contentContainerStyle={styles.container}>
                    <View style={styles.upperView}>
                        <Image
                            style={styles.imageStyles}
                            source={images.ressista} />

                        <Text style={styles.headingText}>BUILD YOUR PROFILE</Text>
                    </View>
                    <View style={styles.midView}>
                        <View style={styles.imageView}>
                            <TouchableOpacity onPress={() => this.toggleFilesActions()}>
                                <Image style={styles.image} source={image_uri}/>
                                <MaterialCommunityIcons size={24} name={'square-edit-outline'} color={colors.dark_gold} style={{ position: 'absolute', right: 4, bottom: 4 }}/>
                            </TouchableOpacity>
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
                    </View>
                    { this.renderFilesActions() }
                </ScrollView>
            </ImageBackground>
        );
    }
}

const mapStateToProps = state => ({
    user: state.login.user
});

const mapDispatchToProps = dispatch => ({
    setUser: params => dispatch(setUserAction(params)),
    loginSuccess: params => dispatch(loginSuccessAction(params))
});
export default connect(mapStateToProps, mapDispatchToProps)(BuildProfile);

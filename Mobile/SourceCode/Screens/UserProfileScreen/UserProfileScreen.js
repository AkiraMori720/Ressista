
import { Text, Image, StatusBar, View, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';

import Button from '../../Components/Button/Button';
import images from '../../Assets/Images/images';
import colors from '../../Assets/Colors/colors';
import styles from './style';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import FirebaseStore from '../../Lib/fireStore';



class UserProfileScreen extends React.Component {
    static navigationOptions = {
        title: 'User Profile'
    }

    static propTypes = {
        user: PropTypes.object
    }

    constructor(props) {
        super(props);

        let toId = props.route.params.toId;
        this.state = {
            toId : toId,
            loading: true,
            toUser: null,
        };

        this.init(toId);
    }

    init = async(toId) => {
        let toUser = await FirebaseStore.getUserProfile(toId);
        console.log('toUser', toUser);
        this.setState({ toUser: toUser, loading: false });
    }

    openChatRoom = async() => {
        const { navigation, user } = this.props;
        const { toId } = this.state;
        if(toId){
            let room = await FirebaseStore.getRoom(user.uid, toId);
            console.log('room', room);
            if(room){
                navigation.navigate('UserChat', {room: room});
            }
        }
    }

    render() {
        const { toUser, loading } = this.state;

        return (
            <View style={styles.mainContainer}>
                <StatusBar
                    barStyle="dark-content"
                    hidden={false}
                    backgroundColor={colors.app_background}
                    translucent={false}
                />
                <View style={styles.container}>
                    <View style={styles.imageView}>
                        <Image style={styles.image} source={(toUser && toUser.profile && toUser.profile.photoURL && {uri: toUser.profile.photoURL})??images.profile_icon} />
                        <Text style={styles.name}>{(toUser && toUser.displayName && `@${toUser.displayName}`)??''}{(toUser && toUser.age)?`, ${toUser.age}`:''}</Text>
                        <View style={styles.viewAddress}>
                            { (toUser && toUser.location) ? <Image style={styles.iconMarker} source={images.ic_marker} /> : null }
                            <Text style={styles.number}>{(toUser && toUser.location)??''}</Text>
                        </View>
                    </View>
                    <View style={styles.buttonsView}>
                        <Button title={'Send Message'} bgColor={colors.app_dark_background}
                            onPress={this.openChatRoom}
                        />
                    </View>

                </View>
            </View>
        );
    }
}


const mapStateToProps = state => ({
    user: state.login.user
});

export default connect(mapStateToProps, null)(UserProfileScreen);

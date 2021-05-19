
import React from 'react';
import {StatusBar, View, FlatList} from 'react-native';
import colors from '../../Assets/Colors/colors';
import styles from './style';
import MessageComponent from '../../Components/AppComponents/MessageComponent/MessageComponent';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FirebaseStore from '../../Lib/fireStore';
import { setUnreadMessages as setUnreadMessagesAction} from '../../Actions/message'
import images from '../../Assets/Images/images';
import firestore from '@react-native-firebase/firestore';

class Messages extends React.Component {
    static navigationOptions = {
        title: 'Messages'
    }

    static propTypes = {
        user: PropTypes.object,
        setUnreadMessages: PropTypes.func
    }

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            rooms: []
        };
        this.init();
    }

    init = async() => {
        const { user, setUnreadMessages } = this.props;

        let rooms = await firestore().collection('rooms');
        rooms.onSnapshot(async(querySnapShot) =>{
            let list = [];
            querySnapShot.forEach(doc => {
                let roomData = doc.data();
                if(roomData.users.includes(user.uid)){
                    list.push(roomData);
                }
            });
            let retRooms = [];
            let unread = 0;
            for(let i =0; i < list.length; i++){
                let room = list[i];
                let otherUserId = room.users.find(id => id !== user.uid);
                let otherUser = await firestore().collection('users').doc(otherUserId).get();

                let userLastSeen = room.lastSeen[user.uid];
                let unreadCount = 0;
                try{
                    let unreadMessages = await firestore().collection('messages').where('createdAt', '>', new Date(userLastSeen)).get();
                    unreadCount = unreadMessages.docs.filter((doc) => doc.data().rid === room.id).length;
                } catch(e) {}
                unread += unreadCount;
                console.log('lastSeenRoom', room.id, room.lastSeen[user.uid], unreadCount)
                if(otherUser){
                    retRooms.push({...room, o: otherUser.data(), unread: unreadCount});
                } else {
                    retRooms.push({ ...room,  unread: unreadCount});
                }
            }
            setUnreadMessages(unread);
            this.setState({ rooms: retRooms, loading: false });
            this.props.navigation.setParams({updated: Date.now()});
        })
    }

    reload = async () => {
        this.setState({loading: true});
        await this.init();
    }

    listMessages(item) {
        const { navigation, user } = this.props;
        return (
            <MessageComponent
                title={item.o?item.o.displayName: ''}
                avatar={(item.o && item.o.photoURL)?{ uri: item.o.photoURL }:images.profile_icon}
                icon={null}
                unread={item.unread}
                isBlocked={(item.block && item.block.length > 0)??false}
                text={item.lastMessage?item.lastMessage.text:''}
                onPressItem={() => navigation.navigate('UserChat', { room: item })}
            />
        )
    }

    render() {
        const { rooms } = this.state;
        return (
            <View style={styles.mainContainer}>
                <StatusBar
                    barStyle="dark-content"
                    hidden={false}
                    backgroundColor={colors.app_background}
                    translucent={false}
                />

                <View style={styles.container}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={ rooms }
                        renderItem={({ item }) => this.listMessages(item)}
                        keyExtractor={item => `${item.id}`}
                    />

                </View>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    user: state.login.user,
});

const mapDispatchToProps = dispatch => ({
   setUnreadMessages: params => dispatch(setUnreadMessagesAction(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Messages);

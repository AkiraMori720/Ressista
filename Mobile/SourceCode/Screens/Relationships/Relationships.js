import {Image, StatusBar, View, FlatList, TouchableOpacity, Alert, RefreshControl, Text} from 'react-native';
import React from 'react';

import images from '../../Assets/Images/images';
import colors from '../../Assets/Colors/colors';
import styles from './style';
import AppInput from '../../Components/AppInput/AppInput';
import RelationshipsComponent from '../../Components/AppComponents/RelationshipsComponent/RelationshipsComponent';
import PropTypes from 'prop-types';
import FirebaseStore from '../../Lib/fireStore';
import {formatTimeStamp} from '../../Lib/helper';
import ActivityIndicator from '../../Components/ActivityIndicator';
import debounce from '../../Lib/debounce';
import {KeyboardUtils} from 'react-native-keyboard-input';
import {connect} from 'react-redux';
import equal from 'deep-equal';
import {
    setCategory as setCategoryAction,
    setRelationShipUpdateForums as setRelationShipUpdateForumsAction,
} from '../../Actions/relationship';
import { setUser as setUserAction, updateUserLastRelationshipVisit as updateUserLastRelationshipVisitAction } from '../../Actions/login';
import firestore from '@react-native-firebase/firestore';


class Relationships extends React.Component {

    static propTypes = {
        user: PropTypes.object,
        updateForums: PropTypes.number,
        relationship: PropTypes.object,
        setCategory: PropTypes.func,
        setRelationShipUpdateForums: PropTypes.func,
        setUserAction: PropTypes.func,
        updateUserLastRelationshipVisit: PropTypes.func
    }

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            refreshing: false,
            forums:props.relationship.forums??[],
            searchForums: props.relationship.forums??[],
            search_text: ''
        };
        this.init(props.user.uid);

        this.unsubscribeFocus = props.navigation.addListener("focus", async () => { await this.onBlur();});
        this.unsubscribeBlur = props.navigation.addListener("blur", async () => { await this.onBlur();});
    }

    componentDidMount() {
    }

    componentWillUnmount() {
        if(this.unsubscribeFocus){
            this.unsubscribeFocus();
        }
        if(this.unsubscribeBlur){
            this.unsubscribeBlur();
        }
    }

    init = async(uid) => {
        const { navigation, relationship, setRelationShipUpdateForums } = this.props;
        const { search_text } = this.state;

        // Subscribe RelationShip Forums
        let relationship_id = relationship.id;
        let forums = await firestore().collection('forums').where("categoryId", "==", relationship_id);
        forums.onSnapshot((querySnapShot) => {
            const { user } = this.props;
            let list = [];
            querySnapShot.forEach(doc => list.push(doc.data()));
            list.sort((a, b) => b.createdAt - a.createdAt);
            let updateForums = list.filter(forum => forum.updatedAt && (forum.updatedAt > (user.profile.lastVisitRelationShip??Date.now())));
            let updateRelationShipForumCount = updateForums.length;
            setRelationShipUpdateForums(updateRelationShipForumCount);
            this.setState({ forums: list });
            this.search(search_text);
            this.props.navigation.setParams({updated: Date.now()});
        });

        // Subscribe User
        let userSubscribe = await firestore().collection('users').doc(uid);
        userSubscribe.onSnapshot((querySnapShot) => {
            const { forums } = this.state;
            let updatedUserProfile = querySnapShot.data();
            let updateForums = forums.filter(forum => forum.updatedAt && (forum.updatedAt > (updatedUserProfile.lastVisitRelationShip??Date.now())));
            let updateRelationShipForumCount = updateForums.length;
            setRelationShipUpdateForums(updateRelationShipForumCount);
            this.props.navigation.setParams({updated: Date.now()});
        });

        // Navigation
        navigation.setOptions({
            title: 'Relationships',
            headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('CreateForumTopic', { category: relationship })}>
                <Image source={images.ic_plus} resizeMode="contain" style={{ width: 24, height: 24, marginRight: 8 }}/>
            </TouchableOpacity>)
        });
    }

    onBlur = async() => {
        const { user, setUser } = this.props;
        let newProfile = { lastVisitRelationShip: Date.now()};
        await FirebaseStore.setUserProfile(user.uid, newProfile);
        setUser({...user, profile: {...user.profile, ...newProfile}});
    }

    // onFocus = async () => {
    //     const { search_text } = this.state;
    //     const { updateUserLastRelationshipVisit, setCategory } = this.props;
    //
    //     this.setState({refreshing: true});
    //     console.log('search_text', search_text);
    //     let category = await FirebaseStore.getRelationshipCategory();
    //     setCategory(category);
    //     updateUserLastRelationshipVisit();
    //
    //     this.search(search_text);
    //     this.setState({refreshing: false});
    // }


    search = debounce(async(text) => {
        let search_text = text.toLowerCase().trim();
        const { forums } = this.state;
        let searching = !!(search_text.length);
        if(searching){
            let searchForums = forums.filter((forum)=> forum.title.toLowerCase().indexOf(search_text) > -1 || forum.text.toLowerCase().indexOf(search_text) > -1);
            return this.setState({ searchForums: searchForums });
        }
        this.setState({ searchForums: forums, search_text: search_text });
    }, 500);

    searchSubmit = (event) => {
        KeyboardUtils.dismiss();
        this.search(event.nativeEvent.text);
    }

    openChatRoom = (userId) => {
        const { navigation, user } = this.props;
        console.log('user', user.uid, userId);
        if(user.uid !== userId){
            navigation.navigate('UserProfileScreen', { toId:userId });
        }
    }

    onPressBookmark = async (forum_id, isBookmarked) => {
        const { user } = this.props;
        const { search_text } = this.state;
        try{
            this.setState({ loading: true });
            await FirebaseStore.setForumBookmark(user.uid, forum_id, isBookmarked);
            this.setState({ loading: false });
            this.search(search_text);
        } catch (e) {

        }
    }

    listRelationships(item) {
        const { user, relationship } = this.props;
        return (
            <RelationshipsComponent
                title={item.title}
                postedBy={item.ownerName??''}
                time={formatTimeStamp(item.createdAt)}
                isBookmarked={ item.bookmarked && item.bookmarked.includes(user.uid) }
                likes={item.likes?item.likes.length:0}
                comments={item.comments?item.comments.length:0}
                commentView={true}
                onPressUser={() => this.openChatRoom(item.ownerId)}
                onPressItem={()=>this.props.navigation.navigate('LongDistance', {category: relationship, forum: item})}
                onPressBookmark={(value) => this.onPressBookmark(item.id, value)}
            />
        )
    }

    render() {
        const { refreshing, loading, searchForums } = this.state;
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
                    <View style={styles.inputView}>
                        <AppInput
                            ref={r => this.searchInput = r}
                            leftIconPath={images.ic_search}
                            placeholder={'Search'}
                            paddingLeft={'0%'}
                            onChangeText={this.search}
                            onSubmitEditing={this.searchSubmit}
                        />
                    </View>
                    { loading || searchForums.length ?
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={searchForums}
                            renderItem={({item}) => this.listRelationships(item)}
                            keyExtractor={item => `${item.id}`}
                        />
                        :
                        <View style={{ alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}>
                            <Text> No Data </Text>
                        </View>
                    }
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    user: state.login.user,
    updateForums: state.relationship.updateForums,
    relationship: state.relationship.relationship
});

const mapDispatchToProps = dispatch => ({
    setRelationShipUpdateForums: params => dispatch(setRelationShipUpdateForumsAction(params)),
    setCategory: params => dispatch(setCategoryAction(params)),
    setUser: params => dispatch(setUserAction(params)),
    updateUserLastRelationshipVisit: params => dispatch(updateUserLastRelationshipVisitAction(params))
});


export default connect(mapStateToProps, mapDispatchToProps)(Relationships);

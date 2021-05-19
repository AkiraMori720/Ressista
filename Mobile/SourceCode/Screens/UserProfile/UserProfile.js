
import React from 'react';
import PropTypes from 'prop-types';
import {Text, Image, StatusBar, View, FlatList, TouchableOpacity, RefreshControl} from 'react-native';
import Button from '../../Components/Button/Button';
import images from '../../Assets/Images/images';
import colors from '../../Assets/Colors/colors';
import styles from './style';
import UserProfileForums from '../../Components/AppComponents/UserProfileForums/UserProfileForums';
import { connect } from 'react-redux';
import { setUser as setUserAction } from '../../Actions/login';
import equal from 'deep-equal';
import FirebaseStore from '../../Lib/fireStore';
import {formatTimeStamp} from '../../Lib/helper';
import ActivityIndicator from '../../Components/ActivityIndicator';
import firestore from '@react-native-firebase/firestore';


class UserProfile extends React.Component {
    static navigationOptions = {
        title: 'My Profile'
    }

    static propTypes = {
        user: PropTypes.object
    }

    constructor(props) {
        super(props);
        this.state = {
            isForum:true,
            forumsView:true,
            loading: true,
            refreshing: false,
            myForums: [],
            affirmations:[]
        };
        this.init();
    }

    init = async() => {
        const { user } = this.props;
        let userForumsSubscribe = await firestore().collection('forums').where("ownerId", "==", user.uid);
        userForumsSubscribe.onSnapshot((querySnapShot) => {
            let list = [];
            querySnapShot.forEach(doc => list.push(doc.data()));
            list.sort((a, b) => b.createdAt - a.createdAt);
            this.setState({ myForums: list });
        })

        let now = new Date();
        let todayStartTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0,  0, 0, 0).valueOf();
        let affirmationSubscribe = await firestore().collection('affirmations').where('createdAt', '>', todayStartTime);
        affirmationSubscribe.onSnapshot((querySnapShot) => {
            let list = [];
            querySnapShot.forEach(doc => list.push({id: doc.id, ...doc.data()}));
            list.sort((a, b) => b.createdAt - a.createdAt);
            this.setState({ affirmations: list, loading: false });
        });
    }


    shouldComponentUpdate(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): boolean {
        const { loading, isForum, forumsView, myForums, refreshing } = this.state;
        const {user} = this.props;

        if(nextState.loading !== loading ||
            nextState.refreshing !== refreshing ||
            nextState.isForum !== isForum ||
            nextState.myForums !== myForums ||
            nextState.forumsView !== forumsView){
            return true;
        }
        return !equal(nextProps.user, user);
    }

    onPressForums = () =>{
       this.setState({isForum:true,forumsView:true});
    };

    onPressAffirmations = () =>{
        this.setState({isForum:false,forumsView:false});
    };

    listReview(item, user) {
        let hasNewComments = !!(item.comments && item.comments.find(comment => !item.lastVisit || (comment.createdAt && comment.createdAt > item.lastVisit)));
        return (
            <UserProfileForums
                title={item.title}
                timeView={true}
                postedBy={(user.profile && user.profile.displayName)??''}
                time={formatTimeStamp(item.createdAt)}
                iconView={hasNewComments}
                icon={images.ic_dot}
                iconTintColor={colors.app_red}
                textDetailView={true}
                text={item.text}
                commentView={true}
                likes={item.bookmarked?item.bookmarked.length:0}
                comments={item.comments?item.comments.length:0}
            />
        )
    }

    listAffirmation(item) {
        const { user } = this.props;
        return (
            <UserProfileForums
                title={item.title}
                textDetailView={true}
                text={item.content}
            />
        )
    }

    render() {
        const { user } = this.props;
        const { loading, myForums, refreshing } = this.state;
        return (
            <View style={styles.mainContainer}>
                <StatusBar
                    barStyle="dark-content"
                    hidden={false}
                    backgroundColor={colors.app_background}
                    translucent={false}
                />
                { loading ? <ActivityIndicator  size='large' style={styles.loading}/>: null}
                <View style={styles.imageView}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('EditProfile')}>
                        <Image style={styles.image} source={(user.profile && user.profile.photoURL && {uri: user.profile.photoURL})??images.profile_icon} />
                    </TouchableOpacity>
                        <Text style={styles.name}>{(user.profile && user.profile.displayName &&`@${user.profile.displayName}`)??''}{(user.profile&&user.profile.age)?`, ${user.profile.age}`:''}</Text>
                    <View style={styles.viewAddress}>
                        { user.profile && user.profile.location ? <Image style={styles.iconMarker} source={images.ic_marker} /> : null }
                        <Text style={styles.number}>{(user.profile && user.profile.location)??''}</Text>
                    </View>
                </View>
                <View style={styles.buttonsView}>
                    <Button style={[styles.buttonForums]} titleStyle={[styles.textStyleButtons,{color:this.state.isForum ? colors.white : colors.black}]} title={'Forums'} bgColor={this.state.isForum ? colors.app_dark_background : colors.app_background} width={'45%'} onPress={this.onPressForums}/>
                    <Button style={styles.buttonAffirmations} title={'Affirmations'} titleStyle={[styles.textStyleButtons,{color:this.state.isForum ? colors.black : colors.white}]} bgColor={this.state.isForum ? colors.app_background : colors.app_dark_background} width={'45%'} onPress={this.onPressAffirmations}/>
                </View>
                <View style={styles.flatListView}>
                    {this.state.forumsView ?
                    <FlatList
                        showsVerticalScrollIndicator={true}
                        data={myForums}
                        renderItem={({ item }) => this.listReview(item, user)}
                        keyExtractor={item => `${item.id}`}
                    /> :
                    <FlatList
                        showsVerticalScrollIndicator={true}
                        data={this.state.affirmations}
                        renderItem={({ item }) => this.listAffirmation(item)}
                        keyExtractor={item => `${item.id}`}
                    /> }
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
export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);

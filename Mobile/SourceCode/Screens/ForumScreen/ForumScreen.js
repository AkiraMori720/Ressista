
import {Image, StatusBar, View, FlatList, TouchableOpacity, ScrollView, RefreshControl} from 'react-native';
import React from 'react';
import ActivityIndicator from '../../Components/ActivityIndicator';
import images from '../../Assets/Images/images';
import colors from '../../Assets/Colors/colors';
import styles from './style';
import AppInput from '../../Components/AppInput/AppInput';
import ForumComponent from '../../Components/AppComponents/ForumComponent/ForumComponent';
import SortDropdown from './SortDropdown';
import {connect} from 'react-redux';
import FirebaseStore from '../../Lib/fireStore';
import PropTypes from 'prop-types';
import { KeyboardUtils } from 'react-native-keyboard-input';
import debounce from '../../Lib/debounce'
import firestore from '@react-native-firebase/firestore';
import { setUpdateForums as setUpdateForumsAction } from '../../Actions/category';
import { setUser as setUserAction } from '../../Actions/login';
import {now} from 'moment';

export const FILTER_POSTED_BY_ME = "posted_by_me";
export const FILTER_BOOKMARKED_BY_ME = "bookmarked_by_me";

class ForumScreen extends React.Component {
    static navigationOptions = {
        title: 'Forum'
    }

    static propTypes = {
        navigation: PropTypes.object,
        user: PropTypes.object,
        categories: PropTypes.array,
        setUpdateForums: PropTypes.func,
        setUser: PropTypes.func
    }

    constructor(props) {
        super(props);
        this.state = {
            showSortDropdown: false,
            filters: [],
            loading: true,
            categories : [],
            forums: [],
            openCategories : {},
            searching: false,
            search_text: '',
            searchCategories: []
        };
        this.init(props.user.uid);

        this.unsubscribeFocus = props.navigation.addListener("focus", async () => { await this.onBlur();});
        this.unsubscribeBlur = props.navigation.addListener("blur", async () => { await this.onBlur();});
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
        let forumsSubscribe = await firestore().collection('forums');
        forumsSubscribe.onSnapshot(async(querySnapShot) => {
            const { search_text } = this.state;
            const { categories, user, setUpdateForums } = this.props;
            let list = [];
            querySnapShot.forEach(doc => { list.push({id: doc.id, ...doc.data()})});
            let category_data = [];
            for(let i = 0; i< categories.length; i++){
                let category = categories[i];
                let forums = list.filter((forum) => forum.categoryId === category.id).sort((a, b) => b.createdAt - a.createdAt);
                category_data.push({...category, forums: forums});
            }
            list.sort((a, b) => b.createdAt - a.createdAt);
            let updateForums = list.filter(forum => forum.updatedAt && forum.updatedAt > (user.profile.lastVisit??Date.now()));
            let updateForumCount = updateForums.length;
            setUpdateForums(updateForumCount);
            this.setState({ categories: category_data, forums: list, loading: false });
            setTimeout(() => this.search(search_text), 300);
            this.props.navigation.setParams({updated: Date.now()});
        })

        // Subscribe User
        let userSubscribe = await firestore().collection('users').doc(uid);
        userSubscribe.onSnapshot((querySnapShot) => {
            const { forums } = this.state;
            const { setUpdateForums } = this.props;
            let updatedUserProfile = querySnapShot.data();
            let updateForums = forums.filter(forum => forum.updatedAt && forum.updatedAt > updatedUserProfile.lastVisit);
            let updateForumCount = updateForums.length;
            setUpdateForums(updateForumCount);
        });
    }

    onBlur = async() => {
        const { user, setUser } = this.props;
        let newProfile = { lastVisit: now()};
        await FirebaseStore.setUserProfile(user.uid, newProfile);
        setUser({...user, profile: {...user.profile, ...newProfile}});
    }

    openForums = (category_id) => {
        const { openCategories } = this.state;
        let newOpenCategories = {...openCategories };
        newOpenCategories[category_id] = !(openCategories[category_id]??false);
        console.log('openCategories', openCategories);
        this.setState({ openCategories: newOpenCategories} );
    }

    openCategoryScreen = (category_id) => {
        const { navigation } = this.props;
        const { categories } = this.state;
        let category = categories.find(item => item.id === category_id);
        if(category){
            navigation.push('CategoryScreen', { category: category });
        }
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

    listRelationships = ({item}) => {
        const { user } = this.props;
        const { openCategories } = this.state;
        return (
            <ForumComponent
                title={item.title}
                user={user}
                openForums={openCategories[item.id]??false}
                forums={item.forums}
                onPressItem={() => this.openCategoryScreen(item.id)}
                onPressDropDown={() => this.openForums(item.id)}
                onPressUser={(ownerId) => this.openChatRoom(ownerId)}
                onPressBookmark={(forum_id, value) => this.onPressBookmark(forum_id, value)}
            />
        )
    }

    closeDropDown = () => {
        this.setState({showSortDropdown: false});
    };

    onChangeFilters = (filters) => {
        const { search_text } = this.state;
        this.setState({ filters: filters });
        this.search(search_text);
    };

    toggleSortDropDown = () => {
        const { showSortDropdown } = this.state;
        this.setState({ showSortDropdown: !showSortDropdown });
    }

    search = debounce(async(text) => {
        const { categories, filters } = this.state;
        const { user } = this.props;

        let search_text = text.toLowerCase().trim();
        let searching = !!(search_text.length) || !!(filters.length);
        let searchCategories = categories.map(category => {
            let searchForums = category.forums.filter((forum)=> forum.title.toLowerCase().indexOf(search_text) > -1 || forum.text.toLowerCase().indexOf(search_text) > -1);
            if(filters.includes(FILTER_POSTED_BY_ME)){
                searchForums = searchForums.filter((forum) => forum.ownerId === user.uid);
            }
            if(filters.includes(FILTER_BOOKMARKED_BY_ME)){
                searchForums = searchForums.filter((forum) => forum.bookmarked && forum.bookmarked.includes(user.uid));
            }
            return { ...category, forums: searchForums };
        });
        console.log('searching', searching, search_text, searchCategories);
        this.setState({ searchCategories: searchCategories, searching: searching, search_text: search_text });
    }, 500);

    searchSubmit = (event) => {
        KeyboardUtils.dismiss();
        this.search(event.nativeEvent.text);
    }

    render() {
        const { showSortDropdown, filters, loading, categories, searching, searchCategories } = this.state;

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
                            leftIconPath={images.ic_search}
                            placeholder={'Search'}
                            width={'80%'}
                            paddingLeft={'0%'}
                            onChangeText={this.search}
                            onSubmitEditing={this.searchSubmit}
                        />
                        <TouchableOpacity
                            style={{ marginLeft: 14 }}
                            onPress={this.toggleSortDropDown}
                        >
                            <Image style={styles.sortIcon} source={images.ic_sort_2} />
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={searching?searchCategories:categories}
                        renderItem={this.listRelationships}
                        keyExtractor={item => `${item.id}`}
                    />
                </View>
                {showSortDropdown ? (
                    <SortDropdown
                        close={this.closeDropDown}
                        filters={filters}
                        onChangeFilters={this.onChangeFilters}
                    />
                    ) : null}
            </View>
        );
    }
}


const mapStateToProps = state => ({
    user: state.login.user,
    categories: state.category.categories
});

const mapDispatchToProps = dispatch => ({
    setUpdateForums: params => dispatch(setUpdateForumsAction(params)),
    setUser: params => dispatch(setUserAction(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(ForumScreen);


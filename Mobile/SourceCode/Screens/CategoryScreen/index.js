import { Image, StatusBar, View, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';

import images from '../../Assets/Images/images';
import colors from '../../Assets/Colors/colors';
import styles from './style';
import AppInput from '../../Components/AppInput/AppInput';
import RelationshipsComponent from '../../Components/AppComponents/RelationshipsComponent/RelationshipsComponent';
import PropTypes from 'prop-types';
import {formatTimeStamp} from '../../Lib/helper';
import debounce from '../../Lib/debounce';
import {KeyboardUtils} from 'react-native-keyboard-input';
import FirebaseStore from '../../Lib/fireStore';
import {connect} from 'react-redux';



class CategoryScreen extends React.Component {
    static navigationOptions = ({ navigation, route }) => {
        const category = route.params.category;
        return {
            title: category.title,
            headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate('CreateForumTopic', { category: category })}>
                    <Image source={images.ic_plus} resizeMode="contain" style={{ width: 24, height: 24, marginRight: 8 }}/>
                </TouchableOpacity>
            )
        };
    }

    static propTypes = {
        user: PropTypes.object
    }

    constructor(props) {
        super(props);
        let category = props.route.params.category;
        this.state = {
            category: category,
            forums: category.forums,
            search_text: ''
        };
        this.init(category.id);
    }

    init = async (category_id) => {
        try{
            let category = await FirebaseStore.getCategory(category_id);
            console.log('init', category);
            this.setState({ category: category, forums: category.forums });
        } catch (e) {
            console.log('init error', e);
        }
    }


    search = debounce(async(text) => {
        let search_text = text.toLowerCase().trim();
        const { category } = this.state;
        let searching = !!(search_text.length);
        let forums = category.forums.sort((a, b) => b.createdAt - a.createdAt);
        if(searching){
            let searchForums = forums.filter((forum)=> forum.title.toLowerCase().indexOf(search_text) > -1 || forum.text.toLowerCase().indexOf(search_text) > -1);
            return this.setState({ forums: searchForums });
        }
        this.setState({ search_text: search_text, forums: forums });
    }, 500);

    searchSubmit = (event) => {
        KeyboardUtils.dismiss();
        this.search(event.nativeEvent.text);
    }

    openChatRoom = (userId) => {
        const { navigation, user } = this.props;
        if(user.uid !== userId){
            navigation.navigate('UserProfileScreen', { toId:userId });
        }
    }

    onPressBookmark = async (forum_id, isBookmarked) => {
        const { user } = this.props;
        const { category, search_text } = this.state;
        try{
            await FirebaseStore.setForumBookmark(user.uid, forum_id, isBookmarked);
            await this.init(category.id);
            this.search(search_text);
        } catch (e) {
            console.log('error', e);
        }
    }

    listRelationships(item) {
        const { user } = this.props;
        const { category } = this.state;
        return (
            <RelationshipsComponent
                title={item.title}
                postedBy={item.ownerName??''}
                time={formatTimeStamp(item.createdAt)}
                isBookmarked={ item.bookmarked && item.bookmarked.includes(user.uid) }
                likes={(item.bookmarked && item.bookmarked.length)??'0'}
                comments={(item.comments && item.comments.length)??'0'}
                commentView={true}
                onPressUser={(ownerId) => this.openChatRoom(ownerId)}
                onPressItem={()=>this.props.navigation.navigate('LongDistance', {forum: item})}
                onPressBookmark={(value) => this.onPressBookmark(item.id, value)}
            />
        )
    }

    render() {
        const { forums } = this.state;
        return (
            <View style={styles.mainContainer}>
                <StatusBar
                    barStyle="dark-content"
                    hidden={false}
                    backgroundColor={colors.app_background}
                    translucent={false}
                />

                <View style={styles.inputView}>
                    <AppInput
                        leftIconPath={images.ic_search}
                        placeholder={'Search'}
                        paddingLeft={'0%'}
                        onChangeText={this.search}
                        onSubmitEditing={this.searchSubmit}
                    />
                </View>

                <View style={styles.flatListView}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={forums}
                        renderItem={({ item }) => this.listRelationships(item)}
                        keyExtractor={item => `${item.id}`}
                    />
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    user: state.login.user
});

export default connect(mapStateToProps, null)(CategoryScreen);

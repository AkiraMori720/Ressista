
import {StatusBar, View, FlatList, ScrollView} from 'react-native';
import React, {createRef} from 'react';
import AppHeader from '../../Components/AppHeader/AppHeader';
import Button from '../../Components/Button/Button';
import images from '../../Assets/Images/images';
import colors from '../../Assets/Colors/colors';
import styles from './style';
import DistanceRelationshipsComponent from '../../Components/AppComponents/DistanceRelationshipsComponent/DistanceRelationshipsComponent';
import {formatTimeStamp, validURL} from '../../Lib/helper';
import FirebaseStore from '../../Lib/fireStore';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {RichEditor, RichToolbar} from 'react-native-pell-rich-editor';
import prompt from 'react-native-prompt-android';
import {showToast} from '../../Lib/info';

class LongDistance extends React.Component {

    static propTypes = {
        user: PropTypes.object
    }

    constructor(props) {
        super(props);
        this.richText = createRef();
        let category = props.route.params?.category;
        let forum = props.route.params?.forum;
        this.state = {
            inputView:false,
            paginationView:true,
            category,
            forum: forum,
            replies: [],
            reply_text: '',
            editorMounted: false,
            inner_reply_id: null
        };
        this.init();
    }

    init = async () => {
        const { forum } = this.state;
        const { user } = this.props;
        if(user.uid === forum.ownerId){
            await FirebaseStore.setLastVist(forum.id);
        }
        let replies = await FirebaseStore.getForumReplies(forum.id);
        console.log('replies', replies);
        this.setState({ replies: replies});
    }

    openChatRoom = (userId) => {
        const { navigation, user } = this.props;
        console.log('user', user.uid, userId);
        if(user.uid !== userId){
            navigation.navigate('UserProfileScreen', { toId:userId });
        }
    }

    onPostReply = async() => {
        const { user } = this.props;
        const { forum, inner_reply_id } = this.state;
        let replyMessage = await this.richText.current.getContentHtml();
        if(!replyMessage.trim().length){
            showToast('Please input content!');
            return;
        }

        try{
            if(inner_reply_id){
                console.log('inner replay', user, inner_reply_id, replyMessage);
                await FirebaseStore.setInnerReply(user, inner_reply_id, replyMessage);
            } else {
                console.log('replay', user, forum, replyMessage);
                await FirebaseStore.setReply(user, forum.id, replyMessage);
            }
            await this.init();
        } catch (e) {
            console.log('Error', e);
        }

        this.setState({inputView:false, paginationView:true, editorMounted: false, inner_reply_id: null});
    }

    onPostCancel = ()=> {
        this.setState({inputView:false, paginationView:true, editorMounted: false, inner_reply_id: null});
    }

    onReply = () => {
        this.setState({inputView:true, paginationView:false});
        setTimeout(() => this.setState({editorMounted: true}), 100);
    }

    onInnerReplay = (reply_id) => {
        this.setState({inputView:true, paginationView:false, inner_reply_id: reply_id});
        setTimeout(() => this.setState({editorMounted: true}), 100);
    }

    listDistance(item) {
        return (
            <DistanceRelationshipsComponent
                title={item.ownerName?`@${item.ownerName}`:''}
                time={formatTimeStamp(item.createdAt)}
                icon={images.ic_quote}
                text={item.text}
                replies={item.replies??[]}
                onPressUser={() => this.openChatRoom(item.ownerId)}
                onPressReply={() => this.onInnerReplay(item.id)}
            />
        )
    }

    onInsertLink = () => {
        console.log('insert link');
        prompt(
            'Insert Link',
            'Please enter link url. (eg - http://www.google.com )',
            [
                { text: 'Cancel', onPress: () => {}, style: 'cancel' },
                {
                    text: 'Insert',
                    onPress: (p) => {
                        console.log('link', p, validURL(p));
                        if(validURL(p)){
                            this.richText.current.insertLink(p, p);
                        } else {
                            showToast(`${p} is invalid url`);
                        }
                    }
                }
            ],
            {
                cancelable: false
            }
        );
    }

    render() {
        const { replies, reply_text, editorMounted, category } = this.state;

        return (
            <View style={styles.mainContainer}>
                <StatusBar
                    barStyle="dark-content"
                    hidden={false}
                    backgroundColor={colors.app_background}
                    translucent={false}
                />

                <View style={styles.headerContainer}>
                    <AppHeader
                        title={category.title}
                        leftIconPath={images.headerLeftBack}
                        onLeftIconPress={() => this.props.navigation.goBack()}
                    />

                </View>
                    {this.state.inputView ?
                        <View style={styles.viewInput}>
                            <View  style={styles.textareaContainer}>
                                { editorMounted ?
                                    <RichToolbar
                                        editor={this.richText}
                                        style={styles.richTextToolBar}
                                        iconTint={colors.black}
                                        selectedIconTint={colors.app_blue}
                                        actions={['bold', 'italic', 'unorderedList', 'orderedList', 'link']}
                                        onInsertLink={() => this.onInsertLink()}
                                    /> : null
                                }
                                <ScrollView style={{ flex:1 }}>
                                    <RichEditor
                                        disabled={false}
                                        ref={this.richText}
                                        editorStyle={styles.richTextEditor}
                                        placeholder={'please input content'}
                                        initialContentHTML={reply_text}
                                        autoCapitalize={'sentences'}
                                    />
                                </ScrollView>
                            </View>
                            <View style={styles.replyBtn}>
                                <Button title={'Post Reply'} bgColor={colors.app_dark_background} onPress={this.onPostReply}/>
                                <Button title={'Cancel'} bgColor={colors.app_dark_background} onPress={this.onPostCancel}/>
                            </View>
                        </View> : null
                    }

                    <View style={styles.flatListView}>
                        <FlatList
                            style={{paddingBottom:100}}
                            showsVerticalScrollIndicator={false}
                            data={replies}
                            renderItem={({ item }) => this.listDistance(item)}
                            keyExtractor={item => `${item.id}`}
                        />
                    </View>
                    {this.state.paginationView ?
                        <View style={styles.buttonsView}>
                            {/*<View style={styles.viewPagination}>*/}
                            {/*    <TouchableOpacity>*/}
                            {/*        <Text style={styles.prevText}>Prev</Text>*/}
                            {/*    </TouchableOpacity>*/}
                            {/*    <View style={styles.numberView}>*/}
                            {/*        <TouchableOpacity>*/}
                            {/*            <Text style={[styles.numberText,{color:colors.app_dark_background}]}>1</Text>*/}
                            {/*        </TouchableOpacity>*/}
                            {/*        <TouchableOpacity>*/}
                            {/*            <Text style={styles.numberText}>2</Text>*/}
                            {/*        </TouchableOpacity>*/}
                            {/*        <TouchableOpacity>*/}
                            {/*            <Text style={styles.numberText}>3</Text>*/}
                            {/*        </TouchableOpacity>*/}
                            {/*        <TouchableOpacity>*/}
                            {/*            <Text style={styles.numberText}>4</Text>*/}
                            {/*        </TouchableOpacity>*/}
                            {/*    </View>*/}
                            {/*    <TouchableOpacity>*/}
                            {/*        <Text style={styles.prevText}>Next</Text>*/}
                            {/*    </TouchableOpacity>*/}
                            {/*</View>*/}

                            <View style={styles.viewBtn}>
                                <Button
                                    title={'Reply to Thread'}
                                    bgColor={colors.app_dark_background}
                                    onPress={this.onReply}/>
                            </View>

                        </View>
                        :
                        null
                    }
            </View>
        );
    }
}

const mapStateToProps = state => ({
    user: state.login.user
});

export default connect(mapStateToProps, null)(LongDistance);

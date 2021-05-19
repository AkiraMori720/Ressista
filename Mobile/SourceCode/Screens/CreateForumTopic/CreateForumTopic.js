
import {
    Text,
    StatusBar,
    View,
    ScrollView,
    Alert,
} from 'react-native';
import React, {createRef} from 'react';
import Button from '../../Components/Button/Button';
import colors from '../../Assets/Colors/colors';
import styles from './style';
import AppInput from '../../Components/AppInput/AppInput';
import { RichEditor, RichToolbar } from 'react-native-pell-rich-editor';
import FirebaseStore from '../../Lib/fireStore';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {showToast} from '../../Lib/info';
import {KeyboardAccessoryView, KeyboardUtils} from 'react-native-keyboard-input';

const scrollPersistTaps = {
    keyboardShouldPersistTaps: 'always',
    keyboardDismissMode: 'interactive'
}

class CreateForumTopic extends React.Component {
    static navigationOptions = {
        title: 'Create Forum Topic'
    };

    static propTypes = {
        user: PropTypes.object
    }

    constructor(props) {
        super(props);
        this.richText = createRef();
        let category = props.route.params.category;
        console.log('create forum category', category);
        this.state = {
            mounted: false,
            topic_name: '',
            topic_detail: '',
            category: category,
            saving: false
        };
    }

    componentDidMount() {
        this.setState({ mounted: true });
    }

    createForumTopic = async() => {
        const { navigation, user } = this.props;
        const { topic_name, category } = this.state;
        this.richText.current.blurContentEditor();
        let content = await this.richText.current.getContentHtml();

        if(!topic_name.trim() || !topic_name.trim().length){
            Alert.alert('Info', 'Please enter Forum Title!');
            return;
        }
        if(!content.trim() || !content.trim().length){
            Alert.alert('Info', 'Please enter Forum Content!');
            return;
        }
        this.setState({saving: true, topic_detail: content});

        let forum = {
            title: topic_name,
            text: content,
            categoryId: category.id
        };

        try{
            let data = await FirebaseStore.createForum(user, forum);
            showToast('New Forum is created successfully');
            navigation.replace('LongDistance', { forum: data });
        } catch (e) {
            Alert.alert('Oops', 'Creating Forum Failed');
        }
        this.setState({ saving: false });
    }

    render() {
        const { topic_name, topic_detail, mounted, saving, category } = this.state;
        return (
            <View style={styles.mainContainer}>
                <StatusBar
                    barStyle="dark-content"
                    hidden={false}
                    backgroundColor={colors.app_background}
                    translucent={false}
                />
                <ScrollView style={{ flex:1, flexGrow:1 }} contentContainerStyle={{ flex:1 }}>
                    <Text style={styles.postingTopicText}>Posting a topic in {category.title} ...</Text>
                    <Text style={styles.textTitles}>TOPIC NAME</Text>
                    <AppInput ref={(input) => this.nameRef = input} value={topic_name} autoCapitalize onChangeText={(value) => this.setState({topic_name: value})} />
                    <Text style={styles.textTitles}>TOPIC DETAILS</Text>
                    <View  style={styles.textareaContainer}>
                        { mounted ?
                            <RichToolbar
                                editor={this.richText}
                                style={styles.richTextToolBar}
                                iconTint={colors.black}
                                selectedIconTint={colors.app_blue}
                                actions={['bold', 'italic', 'unorderedList', 'orderedList', 'link' ]}
                            /> : null
                        }
                        <ScrollView style={{ flex:1 }}>
                            <RichEditor
                                disabled={false}
                                ref={this.richText}
                                editorStyle={styles.richTextEditor}
                                placeholder={'please input content'}
                                initialContentHTML={topic_detail}
                                onBlur={() => {KeyboardUtils.dismiss()}}
                                autoCapitalize={'sentences'}
                            />
                        </ScrollView>
                    </View >
                    <View style={styles.buttonView}>
                        <Button
                            title={'Post'}
                            bgColor={colors.app_dark_background}
                            loading={saving}
                            onPress={this.createForumTopic}
                        />
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    user: state.login.user
});

export default connect(mapStateToProps, null)(CreateForumTopic);

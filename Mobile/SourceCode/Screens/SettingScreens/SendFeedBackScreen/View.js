
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {View, Text, StatusBar, ScrollView, Alert} from 'react-native';
import React from 'react';
import AppHeader from '../../../Components/AppHeader/AppHeader';
import AppInput from '../../../Components/AppInput/AppInput';
import Button from '../../../Components/Button/Button';
import images from '../../../Assets/Images/images';
import colors from '../../../Assets/Colors/colors';
import Textarea from 'react-native-textarea';
import styles from './Styles'
import FirebaseStore from '../../../Lib/fireStore';
import {showToast} from '../../../Lib/info';
import isValidEmail from '../../../Lib/isValidEmail';

class SendFeedback extends React.Component {
    static navigationOptions = {
        title: 'Contact Us'
    }

    constructor(props) {
        super(props);
        let user = props.route.params.user;
        this.state = {
            user: user,
            name: '',
            email: '',
            subject: '',
            message: '',
        }
    }

    onSendFeedback = async() => {
        const { user, name, email, subject, message } = this.state;
        const { navigation } = this.props;

        if(!name.trim().length){
            Alert.alert('Info', 'Name is empty!');
            return;
        }
        if(!email.trim().length || !isValidEmail(email)){
            Alert.alert('Info', 'Email is Invalid!');
            return;
        }
        if(!subject.trim().length){
            Alert.alert('Info', 'subject is empty!');
            return;
        }
        if(!message.trim().length){
            Alert.alert('Info', 'Message is empty!');
            return;
        }
        let feedback = {
            name,
            email,
            subject,
            content: message,
        };
        try{
            await FirebaseStore.saveFeedBack(user.uid, user.displayName, feedback);
            showToast("Your feedback is sent successfully.");
            navigation.pop();
        } catch (e) {
            console.log('error', e);
            Alert.alert('Oop', 'Sending feedback failed');
        }
    }

    render() {
        const { name, email, subject, message } = this.state;
        return (
            <View style={styles.mainContainer}>
                {/* //================================ StatusBar ======================================// */}
                <StatusBar barStyle="dark-content" hidden={false} backgroundColor={colors.app_background} translucent={false} />

                <ScrollView style={{ flex: 1 }}>
                    <View style={styles.NameView}>
                        <Text style={styles.headingText}>Name</Text>
                        <AppInput
                            height={hp(7)}
                            width={'90%'}
                            backgroundColor={colors.app_light_yellow}
                            value={name}
                            onChangeText={value => this.setState({ name: value })}
                        />

                    </View>
                    <View style={styles.EmailView}>
                        <Text style={styles.headingText}>Email Address</Text>
                        <AppInput
                            height={hp(7)}
                            width={'90%'}
                            backgroundColor={colors.app_light_yellow}
                            value={email}
                            onChangeText={value => this.setState({ email: value })}
                        />
                    </View>
                    <View style={styles.SubjectView}>
                        <Text style={styles.headingText}>Subject/Concern</Text>
                        <AppInput
                            height={hp(7)}
                            width={'90%'}
                            backgroundColor={colors.app_light_yellow}
                            value={subject}
                            onChangeText={value => this.setState({ subject: value })}
                        />

                    </View>
                    <View style={styles.MessageView}>
                        <Text style={styles.headingText}>Message</Text>
                        <Textarea
                            containerStyle={styles.textareaContainer}
                            style={{paddingTop:'3%',paddingHorizontal:'5%'}}
                            onChangeText={value => this.setState({ message: value })}
                            defaultValue={message}
                            maxLength={120}
                            underlineColorAndroid={'transparent'}
                        />
                    </View>
                    <View style={styles.saveButtonView}>
                        <Button title={'Send'} bgColor={colors.app_dark_background} onPress={this.onSendFeedback}/>
                    </View>
                </ScrollView>
            </View>
        )
    }
}
export default SendFeedback;

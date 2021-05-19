import React from 'react';
import { View,Text,TextInput,StyleSheet,Image,ImageBackground,TouchableOpacity,ScrollView} from 'react-native';

import styles from './styles'
import { Rating, AirbnbRating } from 'react-native-ratings';
import connect from 'react-redux/lib/connect/connect';
import PropTypes from 'prop-types';
import app from '../../Reducers/app';
import FirebaseStore from '../../Lib/fireStore';
import {appStart as appStartAction} from '../../Actions/app';
import {setUser as setUserAction} from '../../Actions/login';

class RateApp extends React.Component{
    static propTypes = {
        setUser: PropTypes.func,
        onClose: PropTypes.func,
        user: PropTypes.object
    };

    constructor(props) {
        super(props);
        let appRating = props.user.profile.appRating??1;
        this.state={
            dummyText:'If you love our app we would appreciate you if you take a couple' +
                ' of seconds to rate us  in the app market!',
            appRating: appRating
        }
    }

    onSetRating = async() => {
        const { user, setUser, onClose } = this.props;
        const { appRating } = this.state;
        let newProfile = { appRating: appRating };
        try{
            await FirebaseStore.setUserProfile(user.uid, newProfile);
            setUser({ ...user, profile: {...user.profile, ...newProfile} });
            onClose();
        } catch (e) {

        }
    }

    render()
    {
        const { appRating } = this.state;
        return(
            <View style={styles.mainContainer}>
                <View style={styles.container}>
                    <View style={styles.topTitle}>
                        <Text style={styles.textRateApp}>
                            Rate App
                        </Text>
                    </View>
                    <View style={styles.textDescriptionContainer}>
                        <Text style={styles.textDescription}>{this.state.dummyText}</Text>
                    </View>

                    <View style={styles.ratingContainer}>
                        <AirbnbRating
                            count={5}
                            reviewSize={0}
                            defaultRating={appRating}
                            size={30}
                            ratingColor='gold'
                            showRating={false}
                            onFinishRating={(value) => this.setState({ appRating: value })}
                        />
                    </View>
                    {/*<View style={styles.line}></View>*/}

                    <View style={styles.bottomButtons}>

                        <TouchableOpacity
                            onPress={this.onSetRating}
                            style={styles.rateNowContainer}
                        >
                            <Text style={styles.submitButton}>Rate Now</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this.props.onClose}
                            style={styles.laterContainer}>
                            <Text style={styles.closeButton}>Later</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    user: state.login.user
});

const mapDispatchToProps = dispatch => ({
    setUser: params => dispatch(setUserAction(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(RateApp);

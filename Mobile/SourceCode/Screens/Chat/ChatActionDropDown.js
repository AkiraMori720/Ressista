import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback, View,
} from 'react-native';
import PropTypes from 'prop-types';
import Entypo from 'react-native-vector-icons/Entypo';
import colors from '../../Assets/Colors/colors';

class ChatActionDropDown extends React.Component {
    static propTypes = {
        actions: PropTypes.array,
        close: PropTypes.func,
        onChangeAction: PropTypes.func,
    }

    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState){
        return true;
    }

    render() {
        const {
            actions, close, onChangeAction
        } = this.props;

        return (
            <>
                <TouchableWithoutFeedback onPress={() => close()}>
                    <View style={[styles.backdrop, { opacity: 0 }]} />
                </TouchableWithoutFeedback>
                <View
                    style={[
                        styles.dropdownContainer,
                    ]}
                >
                    {
                        actions.map(action => {
                           return (
                            <TouchableOpacity onPress={() => onChangeAction(action.key, !action.value)}>
                               <View style={styles.actionItemContainer}>
                                   {action.value ? [<Entypo name={'block'} color={'red'} size={20}/>,
                                       <Text style={styles.actionItemText}>Unblock Contact</Text>
                                   ]
                                   :  [<Entypo name={'circle'} size={20}/>,
                                    <Text style={styles.actionItemText}>Block Contact</Text>
                                   ]
                                   }
                               </View>
                            </TouchableOpacity>
                           )
                        })
                    }
                </View>
            </>
        );
    }
}

const styles = StyleSheet.create({
    dropdownContainer: {
        backgroundColor: colors.app_light_yellow,
        width: '100%',
        position: 'absolute',
    },
    backdrop: {
        ...StyleSheet.absoluteFill,
        backgroundColor: '#000000'
    },
    actionItemText: {
        color: '#272728',
        fontSize: 18,
        fontWeight: 'normal',
        flex: 1,
        paddingLeft: 8
    },
    actionItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16
    }
});

export default ChatActionDropDown;

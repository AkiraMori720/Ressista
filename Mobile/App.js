import React from 'react';
import Toast from './SourceCode/Components/Toast';
import { Provider } from 'react-redux';
import store from './SourceCode/Lib/createStore';
import {appInit} from './SourceCode/Actions/app';
import AppContainer from './SourceCode/AppContainer';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.init();
    }

    init = async() => {
        store.dispatch(appInit());
    }
    render() {
        return (
            <Provider store={store}>
                <AppContainer />
                <Toast />
            </Provider>
        )
    }
}

export default App

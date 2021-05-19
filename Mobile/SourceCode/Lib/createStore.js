import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import Reactotron from 'reactotron-react-native';
import applyAppStateMiddleware from './appStateMiddleware';
import reducers from '../Reducers';
import sagas from '../Sagas';

let sagaMiddleware;
let enhancers;

if (__DEV__) {
	const reduxImmutableStateInvariant = require('redux-immutable-state-invariant').default();
	sagaMiddleware = createSagaMiddleware({
		sagaMonitor: Reactotron.createSagaMonitor()
	});

	enhancers = compose(
		applyAppStateMiddleware(),
		applyMiddleware(reduxImmutableStateInvariant),
		applyMiddleware(sagaMiddleware),
		Reactotron.createEnhancer()
	);
} else {
	sagaMiddleware = createSagaMiddleware();
	enhancers = compose(
		applyAppStateMiddleware(),
		applyMiddleware(sagaMiddleware)
	);
}

const store = createStore(reducers, enhancers);
sagaMiddleware.run(sagas);

export default store;

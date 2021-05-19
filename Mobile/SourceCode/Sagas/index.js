import { all } from 'redux-saga/effects';
import init from './init';
import login from './login';
import state from './state';

const root = function* root() {
	yield all([
		init(),
		login(),
		state(),
	]);
};

export default root;

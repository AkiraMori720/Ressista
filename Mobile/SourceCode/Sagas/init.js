import { put, takeLatest } from 'redux-saga/effects';

import { APP } from '../Actions/actionsTypes';
import {appStart, ROOT_LOADING} from '../Actions/app';

const restore = function* restore() {
	yield put(appStart({root : ROOT_LOADING}));
};

const start = function* start() {
	//RNBootSplash.hide();
};

const root = function* root() {
	yield takeLatest(APP.INIT, restore);
	yield takeLatest(APP.START, start);
};
export default root;

import { takeLatest, select } from 'redux-saga/effects';
import { APP_STATE } from '../Actions/actionsTypes';
import FirebaseStore from '../Lib/fireStore';
import {now} from 'moment';

const appHasComeBackToForeground = function* appHasComeBackToForeground() {

};

const appHasComeBackToBackground = function* appHasComeBackToBackground() {
	const user = yield select(state => state.login.user);
	if(user && user.profile) {
		let newProfile = { lastVisit: now()};
		try {
			console.log('lastVisit', user.uid, newProfile);
			yield FirebaseStore.setUserProfile(user.uid, newProfile);
		} catch (e) {
			console.log('Error', e);
		}
	}
};

const appHasInActive = function * appHasInActive(){

}


const root = function* root() {
	yield takeLatest(
		APP_STATE.FOREGROUND,
		appHasComeBackToForeground
	);
	yield takeLatest(
		APP_STATE.BACKGROUND,
		appHasComeBackToBackground
	);
	yield takeLatest(
		APP_STATE.INACTIVE,
		appHasInActive
	);
};

export default root;

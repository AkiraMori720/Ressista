import {APP, APP_STATE} from '../Actions/actionsTypes';
import {ROOT_LOADING} from '../Actions/app';

const initialState = {
	root: ROOT_LOADING,
	isMasterDetail: false,
	ready: false,
	inactive: false,
	foreground: true,
	background: false
};

export default function app(state = initialState, action) {
	switch (action.type) {
		case APP_STATE.FOREGROUND:
			return {
				...state,
				inactive: false,
				foreground: true,
				background: false
			};
		case APP_STATE.BACKGROUND:
			return {
				...state,
				inactive: false,
				foreground: false,
				background: true
			};
		case APP_STATE.INACTIVE:
			return {
				...state,
				inactive: true,
				foreground: false,
				background: false
			};
		case APP.START:
			return {
				...state,
				root: action.root
			};
		case APP.INIT:
			return {
				...state,
				ready: false
			};
		case APP.READY:
			return {
				...state,
				ready: true
			};
		default:
			return state;
	}
}

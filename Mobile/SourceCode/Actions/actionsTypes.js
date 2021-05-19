const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';
const defaultTypes = [REQUEST, SUCCESS, FAILURE];

function createRequestTypes(base, types = defaultTypes) {
	const res = {};
	types.forEach(type => (res[type] = `${ base }_${ type }`));
	return res;
}

// Login events
export const LOGIN = createRequestTypes('LOGIN', [
	...defaultTypes,
	'RESET'
]);
export const LOGOUT = 'LOGOUT';

export const USER = createRequestTypes('USER', ['SET', 'UPDATE_LAST_VISIT', 'UPDATE_LAST_RELATIONSHIP_VISIT']);

export const APP = createRequestTypes('APP', ['START', 'READY', 'INIT']);

export const CATEGORY = createRequestTypes('CATEGORY', ['UPDATE_FORUMS', 'SET_CATEGORIES']);

export const RELATIONSHIP = createRequestTypes('RELATIONSHIP', ['UPDATE_FORUMS', 'SET_CATEGORY']);

export const MESSAGE = createRequestTypes('MESSAGE', ['UNREAD_MESSAGES', 'SET_ROOMS']);

export const APP_STATE = createRequestTypes('APP_STATE', ['FOREGROUND', 'BACKGROUND', 'INACTIVE']);

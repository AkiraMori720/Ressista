import { combineReducers } from 'redux';

import app from './app';
import login from './login';
import message from './message';
import category from './category';
import relationship from './relationship';

export default combineReducers({
	app,
	login,
	category,
	relationship,
	message,
});

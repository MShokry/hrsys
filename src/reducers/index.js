import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import users from './user';

export default combineReducers({
    form: formReducer,
    users
});


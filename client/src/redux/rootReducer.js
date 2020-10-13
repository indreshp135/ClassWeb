import { combineReducers } from 'redux';
import errorReducer from './error/errorReducer';
import studentauthReducer from './student/auth/authReducer';
import profauthReducer from './prof/auth/authReducer';
import userReducer from './userStates/userReducer'
import profphotoReducer from './prof/photo/photoReducer'
import studentphotoReducer from './student/photo/photoReducer'

//combineReducer
export default combineReducers({
    error:errorReducer,
    profauth:profauthReducer,
    studentauth:studentauthReducer,
    user:userReducer,
    profphoto:profphotoReducer,
    studentphoto:studentphotoReducer,
});
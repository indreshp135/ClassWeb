import * as type from './authTypes';

const initialState = {
    token:sessionStorage.getItem('token'),
    isAuthenticated:null,
    user:null,
    registerMessage:null,
    resend:false
};

export default function(state=initialState, action){
    switch(action.type){
        case type.LOGIN_SUCCESS:
            sessionStorage.setItem('token', action.payload.token);
            return {
            ...state,
            ...action.payload,
            isAuthenticated: true,
            registerMessage:null,
            };
        case type.REGISTER_SUCCESS:
            return{
                ...state,
                registerMessage:action.payload.msg
            };
        case type.LOGIN_FAIL:
        case type.LOGOUT_SUCCESS:
            sessionStorage.removeItem('token');
            return {
            ...state,
            token: null,
            user: null,
            isAuthenticated: false,
            registerMessage:null,
            };
        case type.REGISTER_FAIL:
            sessionStorage.removeItem('token');
            return {
            ...state,
            token: null,
            user: null,
            class:null,
            isAuthenticated: false,
            registerMessage:null,
            resend:action.payload.resend
            };
        case type.PROFILE_CHANGE:
            return{
                ...state,
                user:{...state.user,photo:action.payload}
            }
        case type.TABLE:
            return{
                ...state,
                class:{...state.class,timetable:action.payload.data}
            }
        case type.VOTE:
            return{
                ...state,
                class:{...state.class,poll:action.payload.data}
            }
        case type.MESSAGE:
            return{
                ...state,
                class:{...state.class,messages:[...state.class.messages,action.payload]}
            }
        case type.CLASS:
            return{
                ...state,
                class:{...state.class,onlineclass:action.payload}
            }
        default:
            return state;
    }
}
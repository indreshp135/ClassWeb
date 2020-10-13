import {PHOTO_UPLOADED,LOAD_PHOTOS, SHOW_PAGE} from './types';

const initialState = {
    id:null,
    buffer:null,
    page:false
}

export default function (state=initialState,action){
    switch (action.type){
        case PHOTO_UPLOADED:
            return{
                ...state,
                id:action.payload._id
            };
        case LOAD_PHOTOS:
            return {...state,buffer:action.photos};
        case SHOW_PAGE:
            return{...state,page:!state.page};
        default:
            return state;
    }
}
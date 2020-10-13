import axios from 'axios';
import { returnErrors } from '../../error/errorActions';
import {PHOTO_UPLOADED,LOAD_PHOTOS,SHOW_PAGE} from './types'
import {profileChange} from '../auth/authActions'
export const addPhoto = (photo,id) => {
  return async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append('photo', photo);
      await axios.post(`/prof/photos/upload/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(res=>{
          dispatch({type:PHOTO_UPLOADED,payload:res.data})
          dispatch(profileChange(res.data._id))
      })
    } catch (error) {
      error.response && dispatch(returnErrors(error.response.data));
    }
  };
};

export const startLoadPhotos = (id) => {
  return async (dispatch) => {
    try {
      const photos = await axios.get(`/prof/photos/${id}`);
      dispatch(loadPhotos(photos.data));
    } catch (error) {
      error.response && dispatch(returnErrors(error.response.data));
    }
  };
};

export const loadPhotos = (photos) => ({
  type: LOAD_PHOTOS,
  photos
});

export const showPage = () => ({
    type:SHOW_PAGE,
})
import axios from 'axios';
import * as type from './authTypes';
import {returnErrors, clearErrors} from '../../error/errorActions';

export const login = ({email,password}) => async(dispatch) =>{
  
    const config = {
        headers: {
          'Content-Type': 'application/json'
        }
    };
    
    // Request body
    const body = JSON.stringify({ email, password });
    await axios.post('/prof/auth/login',body,config)
    .then(async(res)=>{
        await dispatch({
        type:type.LOGIN_SUCCESS,
        payload:res.data
      })
      await dispatch(clearErrors())
    })
    .catch((err) => {
        dispatch({
            type: type.LOGIN_FAIL
        });
        dispatch(
            returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL')
        );
        
    });
}

export const register = ({email,name,dept,password})=>async(dispatch)=>{
    // Headers
    const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
    
      // Request body
      const body = JSON.stringify({ email,name,dept,password });
      await axios.post('/prof/auth/register', body, config)
        .then(async(res)=>{
            await dispatch({
                type: type.REGISTER_SUCCESS,
                payload: res.data
            })
            await dispatch(clearErrors())
        })
        .catch(err => {
          dispatch(
            returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL')
          );
          dispatch({
            type: type.REGISTER_FAIL,
            payload:err.response.data
          });
        });
}
export const resend = ({email,name,dept,password})=>async(dispatch)=>{
  // Headers
  const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
  
    // Request body
    const body = JSON.stringify({ email,name,dept,password });
    console.log(body);
    await axios.post('/prof/auth/resend', body, config)
      .then(async(res)=>{
          await dispatch({
              type: type.REGISTER_SUCCESS,
              payload: res.data
          })
          await dispatch(clearErrors())
      })
      .catch(err => {
        dispatch(
          returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL')
        );
        dispatch({
          type: type.REGISTER_FAIL,
          payload:err.response.data
        });
      });
}

export const profileChange = (id)=>(dispatch)=>{
  dispatch({
    type:type.PROFILE_CHANGE,
    payload:id,
  })
}

export const joinclass = (id,coursecode,classname,profname) => {
  return async (dispatch)=>{
      const config = {
          headers: {
            'Content-Type': 'application/json'
          }
      };
      const body = JSON.stringify({id,coursecode,classname,profname})
      axios.post('/prof/class/join',body,config)
      .then(async(res)=>{
          await dispatch(join(res.data))
          await dispatch(clearErrors())
      })
  } 
}

export const join = (data) => (dispatch) =>{
  dispatch({type:type.JOIN_CLASS,payload:data})
}

export const tableRecieved = (table) =>{
  return{
      type:type.TABLE,
      payload:table
  }
}

export const changeTable = (classroomname,index,subject,typen) => {
  return async(dispatch)=>{
      try{
          const config = {
              headers: {
              'Content-Type': 'application/json'
              }
          };
          const body = {index,subject,typen}
          const table = await axios.post(`/prof/timetable/update/${classroomname}`,body,config)
          dispatch(tableRecieved(table));
      }
      catch(error){
          error.response && dispatch(returnErrors(error.response.data));
      }  
  }
}
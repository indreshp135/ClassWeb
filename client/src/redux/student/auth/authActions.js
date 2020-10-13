import axios from 'axios';
import * as type from './authTypes';
import {returnErrors, clearErrors} from '../../error/errorActions';

export const login = ({regno,password}) => async(dispatch) =>{
  
    const config = {
        headers: {
          'Content-Type': 'application/json'
        }
    };
    
    // Request body
    const body = JSON.stringify({ regno, password });
    await axios.post('/student/auth/login',body,config)
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

export const register = ({regno,name,password})=>async(dispatch)=>{
    // Headers
    const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
    
      // Request body
      const body = JSON.stringify({ regno,name,password });
      await axios.post('/student/auth/register', body, config)
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

export const resend = ({regno,name,password})=>async(dispatch)=>{
  // Headers
  const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
  
    // Request body
    const body = JSON.stringify({ regno,name,password });
    console.log(body);
    await axios.post('/student/auth/resend', body, config)
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

export const tableRecieved = (table) =>{
  return{
      type:type.TABLE,
      payload:table
  }
}

export const changeTable = (classname,index,subject,typen) => {
  return async(dispatch)=>{
      try{
          const config = {
              headers: {
              'Content-Type': 'application/json'
              }
          };
          const body = {index,subject,typen}
          const table = await axios.post(`/student/timetable/update/${classname}`,body,config)
          dispatch(tableRecieved(table));
      }
      catch(error){
          error.response && dispatch(returnErrors(error.response.data));
      }  
  }
}

export const  vote = (regno,id,optionno,classname) => {
  return async (dispatch) =>{
    try{
        const config = {
            headers: {
            'Content-Type': 'application/json'
            }
        };
        const body = {regno,id,optionno}
        const poll = await axios.post(`/student/vote/vt/${classname}`,body,config)
        dispatch(pollchange(poll));
    }
    catch(error){
        error.response && dispatch(returnErrors(error.response.data));
    }  
  } 
}

export const  end = (id,classname) => {
  return async (dispatch) =>{
    try{
        const config = {
            headers: {
            'Content-Type': 'application/json'
            }
        };
        const body = {id,classname}
        const poll = await axios.post(`/student/vote/end`,body,config)
        dispatch(pollchange(poll));
    }
    catch(error){
        error.response && dispatch(returnErrors(error.response.data));
    }  
  } 
}


export const  createpoll = (question,option1,option2,classname) => {
  return async (dispatch) =>{
    try{
        const config = {
            headers: {
            'Content-Type': 'application/json'
            }
        };
        const body = {question,option1,option2}
        const poll = await axios.post(`/student/vote/create/${classname}`,body,config)
        console.log(poll)
        dispatch(pollchange(poll));
    }
    catch(error){
        error.response && dispatch(returnErrors(error.response.data));
    }  
  } 
}

export const pollchange = (poll) =>{
  return{
    type:type.VOTE,
    payload:poll
  }
}

export const recievemessage = (message)=>{
  return {
    type:type.MESSAGE,
    payload:message
  }
}

export const onlineclasson = (data) =>{
  return {
    type:type.CLASS,
    payload:data
  }
}
import { v4 as uuidv4 } from 'uuid';
import { SET_ALERT, REMOVE_ALERT,SET_OUTBREAK, REMOVE_OUTBREAK } from './types';

export const setAlert =
  (message, alertType, timeout = 3000) =>
  (dispatch) => {
    const id = uuidv4();
    dispatch({
      type: SET_ALERT,
      payload: { message, alertType, id },
    });

    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  };

  export const setOutbreak = ()=>(dispatch)=>{
    console.log("setOutbreak");
    dispatch({
      type: SET_OUTBREAK,
      payload:{outbreak:true}
    });
  }

  export const removeOutbreak = ()=>(dispatch)=>{
    dispatch({
      type: REMOVE_OUTBREAK,
      payload:{outbreak:false}
    });
  }
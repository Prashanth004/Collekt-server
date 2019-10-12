import {UPDATE_LIST} from './types';

export const updateList = (lists)=>(dispatch)=>{
    dispatch({
        type:UPDATE_LIST,
        payload:lists
    })
}

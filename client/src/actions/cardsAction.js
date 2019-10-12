import {UPDATE_CARDS} from './types';


export const updateCards = (cards)=>(dispatch)=>{
    dispatch({
        type:UPDATE_CARDS,
        payload:cards
    })
}
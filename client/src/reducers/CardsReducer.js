import {UPDATE_CARDS} from '../actions/types';


const initialState = {
  cards:[],
  cardsUpdated:false
}

export default function(state = initialState, action){
    switch(action.type){
        case UPDATE_CARDS:
            return{
                ...state,
                cards:action.payload,
                cardsUpdated:true
            }
     
        default :
        return {
            ...state
        }
    }
}
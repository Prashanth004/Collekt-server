import {UPDATE_LIST} from '../actions/types';


const initialState = {
  lists:[],
  listUpdated:false
}

export default function(state = initialState, action){
    switch(action.type){
        case UPDATE_LIST:
            return{
                ...state,
                lists:action.payload,
                listUpdated:true
            }
        default :
        return {
            ...state
        }
    }
}
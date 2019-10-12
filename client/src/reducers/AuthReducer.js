import {USER_LOGEDIN,USER_NOT_LOGEDIN} from '../actions/types';

const initialState = {
    authAction : false,
    isLoggedin : false,
    username:'',
    displayname:'',
    activated : false,
    profilePic : '',
    plan:''
}

export default function(state = initialState, action){
    switch(action.type){
        case USER_LOGEDIN:
            return{
                ...state,
                authAction:true,
                isLoggedin : true,
                username:action.payload.username,
                displayname:action.payload.displayname,
                activated : action.payload.activated,
                profilePic : action.payload.profilePic,
                plan:action.plan
            }
        case USER_NOT_LOGEDIN:
            return{
                ...state,
                authAction:true,
                isLoggedin : false,
                username:'',
                displayname:'',
                activated : false,
                profilePic : '',
                plan:action.plan
            }
        default :
        return {
            ...state
        }
    }
}
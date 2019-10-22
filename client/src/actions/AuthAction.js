import axios from 'axios';
import config from '../config/config';
import {USER_LOGEDIN,USER_NOT_LOGEDIN} from './types';
import {checkExtensionForToken} from './utils'
export const checkLoginStatus = ()=> async (dispatch)=>{
    var token = JSON.parse(localStorage.getItem('token'));
    if(token === null || token ===undefined || token === "" )
        token = await checkExtensionForToken();
        axios({
            method:'get',
            crossDomain: true,
            url:config.base_dir+'/api/product/test',
            headers:{
                "Authorization":token,
            }
        })
        .then(response=>{
            console.log("response : ",response)
            if(response.status===200 || response.status === 304)
            dispatch({
                type:USER_LOGEDIN,
               payload:{
                username: (response.data.data.email).split('@')[0],
                activated : response.data.active_status?true:false,
                profilePic :response.data.data.profilePicture,
                displayname : response.data.data.username

                // plan:action.plan
               }
            })
            else
            dispatch({
                type:USER_NOT_LOGEDIN

            })
        }).catch(error=>{
            console.log("error : ",error)
        })
    
}
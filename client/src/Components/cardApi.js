import { checkExtensionForToken } from '../actions/utils';
import config from '../config/config'
import axios from 'axios';
export const getAllCards = () => {
    return new Promise(async (resolve, reject) => {
        var token = JSON.parse(localStorage.getItem('token'));
        if (token === null || token === undefined || token === "")
            token = await checkExtensionForToken();
        axios({
            method: 'get',
            crossDomain: true,
            url: config.base_dir+'/api/product/',
            headers: {
                "Authorization": token,
            }
        }).then(response => {
            resolve(response.data)
        })
            .catch(error => {
                reject(error)
            })
    })
}


export const addCardToList = (cardId, listId) => {
    console.log("cardId, listId : ", cardId, listId)
    return new Promise(async (resolve, reject) => {
        var token = JSON.parse(localStorage.getItem('token'));
        if (token === null || token === undefined || token === "")
            token = await checkExtensionForToken();
        axios({
            method: 'put',
            crossDomain: true,
            url: config.base_dir+'/api/list/ad/product/' + listId,
            headers: {
                "Authorization": token,
            },
            data: {

                "Cards_id": cardId
            }
        }).then(response => {
            console.log("reponse.data : ",response.data)
            axios({

                method: 'put',
                crossDomain: true,
                url: config.base_dir+"/api/product/ad/list/" + cardId,
                headers: {
                    "Authorization": token,
                },
                data: {

                    "listId": listId,
                }
            })
                .then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
        }).catch(error => {
            reject(error)
        })
    })

}
export const changeReason = (reasonValue,cardId)=>{
    return new Promise(async (resolve,reject)=>{
        var token = JSON.parse(localStorage.getItem('token'));
        if (token === null || token === undefined || token === "")
            token = await checkExtensionForToken();
        axios({
            method: 'put',
            crossDomain: true,
            url: config.base_dir+"/api/product/why/" + cardId,
            headers: {
                "Authorization": token,
            },
            data: {
    
                "why": reasonValue,
            }
        }).then(response=>{
            resolve(response.data)
        })
        .catch(error=>{
            reject(error)
        })
    })
   
    
}


export const deleteCardApi = (cardId)=>{
    return new Promise(async (resolve,reject)=>{
        var token = JSON.parse(localStorage.getItem('token'));
        if (token === null || token === undefined || token === "")
            token = await checkExtensionForToken();
            axios.all([
                axios({
                    method: 'delete',
                    crossDomain: true,
                    url: config.base_dir+"/api/product/" + cardId,
                    headers: {
                        "Authorization": token,
                    },
                   
                }),
                axios({
                    method: 'put',
                    crossDomain: true,
                    url: config.base_dir+"/api/list/rmall/product",
                    headers: {
                        "Authorization": token,
                    },
                    data: {
                        "Cards_id": cardId,
                    }
                })

            ]).then(response=>{
            resolve(response.data)
        })
        .catch(error=>{
            reject(error)
        })
    })
}
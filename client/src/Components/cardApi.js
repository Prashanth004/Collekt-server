import { checkExtensionForToken } from '../actions/utils';
import axios from 'axios';
export const getAllCards = () => {
    return new Promise(async (resolve, reject) => {
        var token = JSON.parse(localStorage.getItem('token'));
        if (token === null || token === undefined || token === "")
            token = await checkExtensionForToken();
        axios({
            method: 'get',
            crossDomain: true,
            url: 'http://localhost:1234/product/',
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
            url: 'http://localhost:1234/list/ad/' + listId,
            headers: {
                "Authorization": token,
            },
            data: {

                "Cards_id": cardId
            }
        }).then(response => {
            axios({

                method: 'put',
                crossDomain: true,
                url: "http://localhost:1234/product/list/" + cardId,
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
import { checkExtensionForToken } from '../actions/utils';
import axios from 'axios';
import config from '../config/config'

export const createNewList = (listName) => {
    return new Promise(async (resolve,reject)=>{
        var token = JSON.parse(localStorage.getItem('token'));
        if (token === null || token === undefined || token === "")
            token = await checkExtensionForToken();
            axios({
                method: 'post',
                crossDomain: true,
                url: config.base_dir+'/api/list/create',
                headers: {
                    "Authorization": token,
                },
                data: {
                          "list_name": listName,
                }
            }).then(response=>{
                console.log("response : ",response)
               resolve(response.data.data)
            }).catch(error=>{
                reject(error)
            })
    })

}
export const getAllList = () => {
    return new Promise(async (resolve, reject) => {
        var token = JSON.parse(localStorage.getItem('token'));
        if (token === null || token === undefined || token === "")
            token = await checkExtensionForToken();
        axios({
            method: 'get',
            crossDomain: true,
            url: config.base_dir+'/api/list/',
            headers: {
                "Authorization": token,
            }
        }).then(response => {
            console.log("response : ", response);
            if (response.status === 200 || response.status === 304)
               resolve(response.data)
            else
               reject("error happened")

        }).catch(error => {
                reject("error happened")
        })
    })


}
export const deleteList = (listid) => {
    return new Promise(async (resolve, reject) => {
        var token = JSON.parse(localStorage.getItem('token'));
        if (token === null || token === undefined || token === "")
            token = await checkExtensionForToken();
            axios({
                method: 'delete',
                crossDomain: true,
                url: config.base_dir+'/api/list/'+listid,
                headers: {
                    "Authorization": token,
                }
            }).then(response => {
                axios({
                    method:'put',
                    crossDomain : true,
                    url:config.base_dir+'/api/product/rmall/list/',
                    headers: {
                        "Authorization": token,
                    },
                    data:{
                        listId:listid
                    }
                }).then(response=>{
                    resolve(response.data)
                }).catch(error=>{
                    reject(error)
                })
              
            })
            .catch(error=>{
                reject(error)
            })

    })
  
}

export const getAListDetails = (listid)=>{
    return new Promise(async (resolve,reject)=>{
        var token = JSON.parse(localStorage.getItem('token'));
        if (token === null || token === undefined || token === "")
            token = await checkExtensionForToken();
        axios({
            method: 'get',
            crossDomain: true,
            url: config.base_dir+'/api/list/'+listid,
            headers: {
                "Authorization": token,
            }
        })
        .then(async response=>{
           console.log("response from a particular list : ",response)
                var listName = response.data[0].List_name;
                var allCards = response.data[0].Cards_id;

                var vardDetails = allCards.length>0?await getCardDetails(allCards,token):[];
                console.log("listName,cardDetails : ",listName,vardDetails)
                resolve({
                    listName:listName,
                    cardDetails : vardDetails
                })               
        })
        .catch(error=>{
            console.log("error in getting data from server : ", error)
            resolve(error)
        })
    })
}

const getCardDetails =(cardsArray,token)=>{
    var promises = [];
    return new Promise(function (resolve, reject) {
        console.log("cardsArray : ",cardsArray)
        cardsArray.forEach(function (cardid, index) {
            promises.push(
                // axios.get('http://localhost:1234/product/'+cardid,)
                

                // 'http://localhost:1234/product/'+cardid,
                axios({
                    method: 'get',
                    crossDomain: true,
                    url: config.base_dir+'/api/product/'+cardid,
                    headers: {
                        "Authorization": token,
                    }
                })


                )
        })
        axios.all(promises).then(function (results) {
            resolve(results)
        }).catch(error=>{
            reject(error)
        })
})
}

export const removeCardFromList = async (cardId,listId)=>{
    return new Promise(async (resolve,reject)=>{
        var token = JSON.parse(localStorage.getItem('token'));
        if (token === null || token === undefined || token === "")
            token = await checkExtensionForToken();
        let promises = [
            axios({
                method: 'put',
                crossDomain: true,
                url: config.base_dir+'/api/list/rm/product/'+listId,
                headers: {
                    "Authorization": token,
                },
                data: {
                          "Cards_id": cardId,
                }
            }),
            axios({
                method: 'put',
                crossDomain: true,
                url: config.base_dir+'/api/product/rm/list/'+cardId,
                headers: {
                    "Authorization": token,
                },
                data: {
                          "listId": listId,
                }
            }),
    
        ];
        axios.all(promises).then(resposnse=>{
            resolve(resposnse)
        }).catch(error=>{
           reject(error)
        })
    })  
}
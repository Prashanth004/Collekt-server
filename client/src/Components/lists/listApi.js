import { checkExtensionForToken } from '../../actions/utils';
import axios from 'axios';
export const createNewList = (listName) => {
    return new Promise(async (resolve,reject)=>{
        var token = JSON.parse(localStorage.getItem('token'));
        if (token === null || token === undefined || token === "")
            token = await checkExtensionForToken();
            axios({
                method: 'post',
                crossDomain: true,
                url: 'http://localhost:1234/list/create',
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
            url: 'http://localhost:1234/list/',
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
                url: 'http://localhost:1234/list/'+listid,
                headers: {
                    "Authorization": token,
                }
            }).then(response => {
                resolve(response.data)
            })
            .catch(error=>{
                reject(error)
            })

    })
 
}

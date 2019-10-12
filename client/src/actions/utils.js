import config from '../config/config'
export const checkExtensionForToken = ()=>{
    return new Promise((resolve,reject)=>{
        var extensionId = config.EXTENSION_ID;
        window.chrome.runtime.sendMessage("mjapahakacmpbiafooofjdfloinbmidf", {getLoginToken: "true"},
          response => {
            console.info("----------------- Got response", response);
            if(response) {
           localStorage.setItem("token",JSON.stringify(response));
           resolve(response)
            }
        });
    })
 
}
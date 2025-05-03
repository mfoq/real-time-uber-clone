import { App } from "../api/api"

export function postData(endpoint, input){

    return new Promise(async(resolve, reject) => {
        try {
            const res = await fetch(App.apiBaseUrl + endpoint, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(input)
            })

            const data = await res.json()

            if(typeof data?.errors !== 'undefined'){
                const errors = Array.isArray(data?.errors) ? data?.errors : Object.values(data?.errors)
                reject(errors)
            }else{
                resolve(data);
            }
        }catch (error) {
            reject(error)
        }
    })
}
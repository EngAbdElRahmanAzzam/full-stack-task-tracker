import { IAuthRsponse } from "../interfaces/api"
const credentialsKey = 'user'
export const storeCredentials = (data:IAuthRsponse) => {
    let credentials = JSON.stringify(data.data)
    localStorage.setItem(credentialsKey, credentials)
}

export const getCredentials = () => {
    const credentials =JSON.parse(localStorage.getItem(credentialsKey)!)
    return credentials
}

export const getToken = ()=> {
    const {token} = JSON.parse(localStorage.getItem(credentialsKey)!);
    return token
}

export const clearStorage = () => {
    localStorage.removeItem(credentialsKey)
}




import axios , {AxiosInstance} from "axios";
import { IUser } from "../interfaces/user";

const hostServer = import.meta.env.VITE_DOMAIN_HOST 
const timeout = import.meta.env.VITE_TIMEOUT

export let axiosInstaceAuth:AxiosInstance
let user:IUser|any = localStorage.getItem('user')

if(user){
    user = JSON.parse(user)
    axiosInstaceAuth = axios.create(
            {
                baseURL:`${hostServer}/api/v1`,
                timeout,
                headers:{
                    Authorization: `${user.token}`
                }
            }
        )
}

export const axiosInstace = axios.create(
    {
        baseURL:`${hostServer}/api/v1`,
        timeout,
    }
)


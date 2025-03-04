import axios , {AxiosInstance} from "axios";
import { isLoggedIn } from "../authorize/isLoggedIn";
import { getToken } from "../utils/localStorage";

const hostServer = import.meta.env.VITE_DOMAIN_HOST 
const timeout = import.meta.env.VITE_TIMEOUT

export let axiosInstaceAuth:AxiosInstance


if(isLoggedIn()){
    axiosInstaceAuth = axios.create(
            {
                baseURL:`${hostServer}/api/v1`,
                timeout,
                headers:{
                    Authorization: 'getToken()'
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


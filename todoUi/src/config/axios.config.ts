import axios , {AxiosInstance} from "axios";

const hostServer = import.meta.env.VITE_DOMAIN_HOST 
const timeout = import.meta.env.VITE_TIMEOUT

export let axiosInstaceAuth:AxiosInstance;
let user;

if(localStorage.getItem('user')){ 
    user = localStorage.getItem('user')

    axiosInstaceAuth = axios.create(
        {
            baseURL:`${hostServer}/api/v1`,
            timeout,
            headers:{
                Authorization: user
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


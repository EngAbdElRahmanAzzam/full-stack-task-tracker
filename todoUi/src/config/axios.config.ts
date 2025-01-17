import axios , {AxiosInstance} from "axios";

export let axiosInstaceAuth:AxiosInstance;
let user;

if(localStorage.getItem('user')){ 
    user = JSON.parse(localStorage.getItem('user') as string)

    axiosInstaceAuth = axios.create(
        {
            baseURL:'http://localhost:1337/api',
            timeout:4000,
            headers:{
                Authorization: `Bearer ${user.jwt}`
            }
        }
    )
}


export const axiosInstace = axios.create(
    {
        baseURL:'http://localhost:1337/api',
        timeout:4000,
    }
)


import { useQuery } from "@tanstack/react-query";
import { axiosInstaceAuth } from "../config/axios.config";

interface IAuthQuery{
    queryKey:string[]
    url:string;
}

const useAuthQuery = ({queryKey, url}:IAuthQuery)=>{


    return useQuery({
        queryKey,
        queryFn:async ()=>{
            const {data} = await axiosInstaceAuth.get(url)
            return data
          }
    })
}

export default useAuthQuery


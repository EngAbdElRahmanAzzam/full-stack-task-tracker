import { useState } from "react"
import HeroSection from "../compontents/ui/herosection"
import TodoList from "../compontents/ui/todo"
import TitleSection from "../compontents/common/titleSection"
import { useQuery } from "@tanstack/react-query"
import { axiosInstaceAuth } from "../config/axios.config"


const HomePage = () => {

     //states 
     const [numQuery, setNumQuery] = useState<number>(0)
     const {isLoading, data:todos} = useQuery({
          queryKey:['todoList', `${numQuery}`],
          queryFn:async ()=>{
              const {data} = await axiosInstaceAuth.get('/todos/recent?limit=10')  
              return data.data
          }
      })
    return (
         <div className="bg-gradient-to-r from-gray-50/50 via-indigo-800/30 to-gray-600/30">
          <HeroSection numQuery={numQuery} setNumQuery={setNumQuery} />
          <TitleSection>Recent Access</TitleSection>
          <TodoList numQuery={numQuery} setNumQuery={setNumQuery} isLoading={isLoading} todos={todos} />
         </div>
    )
  }
  
  export default HomePage
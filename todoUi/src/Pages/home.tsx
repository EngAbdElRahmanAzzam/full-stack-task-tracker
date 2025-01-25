import { useState } from "react"
import HeroSection from "../compontents/ui/herosection"
import TodoList from "../compontents/ui/todo"
import TitleSection from "../compontents/common/titleSection"
import { useQuery } from "@tanstack/react-query"
import { axiosInstaceAuth } from "../config/axios.config"


const HomePage = () => {

     //states 
     const [numQuery, setNumQuery] = useState<number>(0)
     const {isLoading:isLoadingRecentAdded, data:todosRecentAdded} = useQuery({
          queryKey:['todoList', `${numQuery}`],
          queryFn:async ()=>{
              const {data} = await axiosInstaceAuth.get('/todos?sort=add')  
              return data.data.todos
          }
      })

     const {isLoading:isLoadingRecentAccess, data:todosRecentAccess} = useQuery({
          queryKey:['todoList', `${numQuery}`],
          queryFn:async ()=>{
              const {data} = await axiosInstaceAuth.get('/todos?sort=recent')  
              return data.data.todos
          }
     })

    return (
         <div>
               <HeroSection numQuery={numQuery} setNumQuery={setNumQuery} />
               <TitleSection>Recent Access</TitleSection>
               <TodoList numQuery={numQuery} setNumQuery={setNumQuery} isLoading={isLoadingRecentAccess} todos={todosRecentAdded} />
               <TitleSection>Recent Added</TitleSection>
               <TodoList numQuery={numQuery} setNumQuery={setNumQuery} isLoading={isLoadingRecentAdded} todos={todosRecentAccess} />
         </div>
    )
  }
  
  export default HomePage
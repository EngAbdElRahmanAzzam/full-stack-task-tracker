import { useState } from "react"
import HeroSection from "../compontents/ui/herosection"
import TodoList from "../compontents/ui/todo"
import TitleSection from "../compontents/common/titleSection"
import { useQuery } from "@tanstack/react-query"
import { axiosInstaceAuth } from "../config/axios.config"
import NoTodo from "../compontents/ui/noTodo"


const HomePage = () => {
     //states 
     const [numQuery, setNumQuery] = useState<number>(0)
     const {isLoading:isLoadingRecentAdded, data:todosRecentAdded} = useQuery({
          queryKey:['todoList', `${numQuery}`],
          queryFn:async ()=>{
              const {data} = await axiosInstaceAuth.get('/todos?sort=add&limit=10')  
              return data.data.todos
          }
      })

     const {isLoading:isLoadingRecentUpdated, data:todosRecentUpdated} = useQuery({
          queryKey:['todoList', `${numQuery}`],
          queryFn:async ()=>{
              const {data} = await axiosInstaceAuth.get('/todos?sort=update&limit=10')  
              return data.data.todos
          }
     })

    return (
         <div>
               <HeroSection numQuery={numQuery} setNumQuery={setNumQuery} />
               <TitleSection>Recent Updated</TitleSection>
               <NoTodo/>
               <TitleSection>Recent Added</TitleSection>
               <TodoList numQuery={numQuery} setNumQuery={setNumQuery} isLoading={isLoadingRecentAdded} todos={todosRecentAdded} />
         </div>
    )
  }
  
  export default HomePage
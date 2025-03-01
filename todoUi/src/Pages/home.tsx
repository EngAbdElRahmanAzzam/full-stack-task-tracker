import { useState } from "react"
import HeroSection from "../compontents/ui/herosection"
import TodoList from "../compontents/ui/taskList"
import TitleSection from "../compontents/common/titleSection"
import { useQuery } from "@tanstack/react-query"
import { fetchRecentAddedTodos, fetchRecentUpdatedTodos } from "../services/task"



const HomePage = () => {
     //states 
     const [numQuery, setNumQuery] = useState<number>(0)

     const { isLoading: isLoadingRecentAdded, data: todosRecentAdded } = useQuery({
          queryKey: ['todoList', `${numQuery}`],
          queryFn: fetchRecentAddedTodos
      });

     const {isLoading:isLoadingRecentUpdated, data:todosRecentUpdated} = useQuery({
          queryKey:['todoList', `${numQuery}`],
          queryFn:fetchRecentUpdatedTodos
     })

    return (

          <div>
                    <HeroSection numQuery={numQuery} setNumQuery={setNumQuery} />
                    
                    {/* Recent Updated section */}
                    <section>
                         <TitleSection>Recent Updated</TitleSection>
                         <TodoList 
                              numQuery={numQuery} 
                              setNumQuery={setNumQuery} 
                              isLoading={isLoadingRecentUpdated} 
                              todos={todosRecentUpdated} 
                         />
                    </section>
                    

                    {/* Recent Added section */}
                    <section>
                         <TitleSection>Recent Added</TitleSection>
                         <TodoList 
                              numQuery={numQuery} 
                              setNumQuery={setNumQuery} 
                              isLoading={isLoadingRecentAdded} 
                              todos={todosRecentAdded}
                         />
                    </section>

          </div>
    )
  }
  
  export default HomePage
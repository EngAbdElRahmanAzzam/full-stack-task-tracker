import { useState } from "react"
import HeroSection from "../compontents/ui/herosection"
import TitleSection from "../compontents/common/titleSection"
import { useQuery } from "@tanstack/react-query"
import { fetchRecentAddedTodos, fetchRecentUpdatedTodos } from "../services/task"
import TasksList from "../compontents/ui/taskList"



const HomePage = () => {
     //states 
     const [numQuery, setNumQuery] = useState<number>(0)

     const { isLoading: isLoadingRecentAdded, data: todosRecentAdded } = useQuery({
          queryKey: ['tasksRecentAdded', `${numQuery}`],
          queryFn: fetchRecentAddedTodos
      });

     const {isLoading:isLoadingRecentUpdated, data:todosRecentUpdated} = useQuery({
          queryKey:['tasksRecentUpdated', `${numQuery}`],
          queryFn:fetchRecentUpdatedTodos
     })

    return (

          <div>
                    <HeroSection numQuery={numQuery} setNumQuery={setNumQuery} />
                    
                    {/* Recent Updated section */}
                    <section>
                         <TitleSection>Recent Updated</TitleSection>
                         <TasksList 
                              numQuery={numQuery} 
                              setNumQuery={setNumQuery} 
                              isLoading={isLoadingRecentUpdated} 
                              todos={todosRecentUpdated} 
                         />
                    </section>
                    

                    {/* Recent Added section */}
                    <section>
                         <TitleSection>Recent Added</TitleSection>
                         <TasksList 
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
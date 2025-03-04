import { useState } from "react"
import HeroSection from "../compontents/ui/herosection"
import TitleSection from "../compontents/common/titleSection"
import { useQuery } from "@tanstack/react-query"
import { fetchRecentAddedTasks, fetchRecentUpdatedTasks } from "../services/task"
import TasksList from "../compontents/ui/taskList"



const HomePage = () => {
     //states 
     const [numQuery, setNumQuery] = useState<number>(0)

     const { isLoading: isLoadingRecentAdded, data: recentAdded } = useQuery({
          queryKey: ['tasksRecentAdded', `${numQuery}`],
          queryFn: fetchRecentAddedTasks
      });

     const {isLoading:isLoadingRecentUpdated, data:recentUpdated} = useQuery({
          queryKey:['tasksRecentUpdated', `${numQuery}`],
          queryFn:fetchRecentUpdatedTasks
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
                              tasks={recentUpdated} 
                         />
                    </section>
                    

                    {/* Recent Added section */}
                    <section>
                         <TitleSection>Recent Added</TitleSection>
                         <TasksList 
                              numQuery={numQuery} 
                              setNumQuery={setNumQuery} 
                              isLoading={isLoadingRecentAdded} 
                              tasks={recentAdded}
                         />
                    </section>

          </div>
    )
  }
  
  export default HomePage
import { useState } from "react"
import TasksList from "../compontents/ui/taskList"
import Pagination from "../compontents/ui/pagination"
import FilterControl from "../compontents/common/filterControl"
import { creationTimeFilter, numberOfTasksFilter } from "../data/filtersLists"
import FilterButton from "../compontents/common/filterButton"
import { colors, styles } from "../data/styles"
import { useQuery } from "@tanstack/react-query"
import { fetchTasks } from "../services/task"


const TasksPage = () => {
  //states 
    const [numQuery, setNumQuery] = useState<number>(0)
    const [page, setPage] = useState<number>(1)
    const [limit, setLimit] = useState<number>(5)
    const [days, setDays] = useState<number>(0)
    const [isSort, setIsSort] = useState<boolean>(false)
    const { isLoading: isLoadingRecentAdded, data: recentAdded } = useQuery({
      queryKey: ['tasksRecentAdded', `${numQuery}`],
      queryFn: () => fetchTasks(limit,page,isSort,days)
  });
    //handlers 
    const onSortBtnClick =() =>{
        setIsSort(!isSort)
        setNumQuery(numQuery+1)
    }

    return (
      <>
        <div className={`p-3 flex gap-2 ${styles.boxFilter}`}>
            <FilterControl setParam={setDays} options={creationTimeFilter} setQuery={setNumQuery}>Creation Post</FilterControl>
            <FilterControl setParam={setLimit} options={numberOfTasksFilter} setQuery={setNumQuery}>Number tasks</FilterControl>
            <FilterButton  onClick={onSortBtnClick} setQuery={setNumQuery} className={(isSort)?`${colors.mainColorBg} ${colors.color2Text} order-first`:''}>Sort A - Z</FilterButton>
        </div>

        <TasksList 
            numQuery={numQuery} 
            setNumQuery={setNumQuery} 
            isLoading={isLoadingRecentAdded} 
            tasks={recentAdded}
        />
        
        <Pagination page={page} setPage={setPage} />
      </>
    )
  }
  
  export default TasksPage
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
    const [page, setPage] = useState<number>(0)
    const [limit, setLimit] = useState<number>(10)
    const [days, setDays] = useState<number>(0)
    const [isSort, setIsSort] = useState<boolean>(false)
    const { isLoading: isLoadingRecentAdded, data: recentAdded } = useQuery({
      queryKey: ['tasksRecentAdded', `${numQuery}`],
      queryFn: fetchTasks
  });
    //handlers 
    const toggleIsSort = ()=> setIsSort(!isSort)
    return (
      <>
        <div className={`p-3 flex gap-2 ${styles.boxFilter}`}>
            <FilterControl setParam={setLimit} options={creationTimeFilter}>Creation Post</FilterControl>
            <FilterControl setParam={setDays} options={numberOfTasksFilter}>Number tasks</FilterControl>
            <FilterButton  onClick={toggleIsSort} className={(isSort)?`${colors.mainColorBg} ${colors.color2Text} order-first`:''}>Sort A - Z</FilterButton>
        </div>
        <TasksList numQuery={numQuery} setNumQuery={setNumQuery}>

        </TasksList>
        
        <Pagination />
      </>
    )
  }
  
  export default TasksPage
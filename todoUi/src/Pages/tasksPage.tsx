import { useState } from "react"
import TasksList from "../compontents/ui/taskList"
import Pagination from "../compontents/ui/pagination"
import SelectList from "../compontents/common/selectList"


const TasksPage = () => {
  //states 
  const [numQuery, setNumQuery] = useState<number>(0)
  const [pageSize, setPageSize] = useState<number>(0)

    return (
      <>
        
        <TasksList numQuery={numQuery} setNumQuery={setNumQuery}>

        </TasksList>
        
        <Pagination />
      </>
    )
  }
  
  export default TasksPage
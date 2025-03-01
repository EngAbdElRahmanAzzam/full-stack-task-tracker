import { useState } from "react"
import TasksList from "../compontents/ui/taskList"
import Pagination from "../compontents/ui/pagination"
import SelectList from "../compontents/common/selectList"


const ToDosPage = () => {
  //states 
  const [numQuery, setNumQuery] = useState<number>(0)
  const [pageSize, setPageSize] = useState<number>(0)

    return (
      <>
        <TasksList numQuery={numQuery} setNumQuery={setNumQuery}>
            <SelectList value={pageSize} onChange={(e)=>{setPageSize(+e.target.value)}}>
              <option>5</option>
              <option>10</option>
              <option>15</option>
              <option>25</option>
              <option>50</option>
              <option>100</option>
            </SelectList>
        </TasksList>
        
        <Pagination />
      </>
    )
  }
  
  export default ToDosPage
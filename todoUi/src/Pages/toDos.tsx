import { useState } from "react"
import TodoList from "../compontents/ui/todo"
import Pagination from "../compontents/ui/pagination"
import SelectList from "../compontents/common/selectList"


const ToDosPage = () => {
  //states 
  const [numQuery, setNumQuery] = useState<number>(0)
  const [pageSize, setPageSize] = useState<number>(0)

    return (
      <>
        <TodoList numQuery={numQuery} setNumQuery={setNumQuery}>
            <SelectList value={pageSize} onChange={(e)=>{setPageSize(+e.target.value)}}>
              <option>5</option>
              <option>10</option>
              <option>15</option>
              <option>25</option>
              <option>50</option>
              <option>100</option>
            </SelectList>
        </TodoList>
        
        <Pagination />
      </>
    )
  }
  
  export default ToDosPage
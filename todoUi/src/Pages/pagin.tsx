import  { useEffect, useState } from 'react'
import { axiosInstaceAuth } from '../services/axios.config'
import { routes } from '../services'
import TasksList from '../compontents/ui/taskList'
import { createTask } from '../services/task'
import HeroSection from '../compontents/ui/herosection'
import Pagination from '../compontents/ui/pagination'

const Pagin = () => {
    //states 
    const [numQuery, setNumQuery] = useState<number>(0)
    
   return (

         <div>
                   <HeroSection numQuery={numQuery} setNumQuery={setNumQuery} />
                   <Pagination/>
        </div>
   )
}

export default Pagin
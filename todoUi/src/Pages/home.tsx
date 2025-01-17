import { useState } from "react"
import HeroSection from "../compontents/ui/herosection"
import TodoList from "../compontents/ui/todo"


const HomePage = () => {

     //states 
     const [numQuery, setNumQuery] = useState<number>(0)
    return (

         <>
          <HeroSection numQuery={numQuery} setNumQuery={setNumQuery} />
          <TodoList numQuery={numQuery} setNumQuery={setNumQuery} />
         </>
    )
  }
  
  export default HomePage
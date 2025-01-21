import { useState } from "react"
import HeroSection from "../compontents/ui/herosection"
import TodoList from "../compontents/ui/todo"
import TitleSection from "../compontents/common/titleSection"


const HomePage = () => {

     //states 
     const [numQuery, setNumQuery] = useState<number>(0)
    return (
         <>
          <HeroSection numQuery={numQuery} setNumQuery={setNumQuery} />
          <TitleSection>Recent Access</TitleSection>
          <TodoList numQuery={numQuery} setNumQuery={setNumQuery} />
         </>
    )
  }
  
  export default HomePage
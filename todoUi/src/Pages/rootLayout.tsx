import {Outlet} from 'react-router-dom'
import Navbar from '../compontents/ui/navbar'

const RootLayout = () => {
    return (
        <> 
            <Navbar />
            <Outlet />
        </>
    )
  }
  
  export default RootLayout
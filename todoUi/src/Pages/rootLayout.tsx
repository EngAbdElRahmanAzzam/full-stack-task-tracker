import {Outlet} from 'react-router-dom'
import Header from '../compontents/common/header'

const RootLayout = () => {
    return (
        <> 
            <Header />
            <Outlet />
        </>
    )
  }
  
  export default RootLayout
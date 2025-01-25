import {Outlet} from 'react-router-dom'
import Navbar from '../compontents/ui/navbar'
import Footer from '../compontents/ui/footer'

const RootLayout = () => {
    return (
        <> 
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
  }
  
  export default RootLayout
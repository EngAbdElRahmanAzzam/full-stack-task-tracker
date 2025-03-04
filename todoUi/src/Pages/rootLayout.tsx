import {Outlet} from 'react-router-dom'
import Navbar from '../compontents/ui/navbar'
import Footer from '../compontents/ui/footer'

const RootLayout = () => {
    return (
        <div className='flex flex-col min-h-screen'> 
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
  }
  
  export default RootLayout
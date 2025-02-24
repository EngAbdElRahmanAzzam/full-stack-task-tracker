import {Outlet} from 'react-router-dom'
import Navbar from '../compontents/ui/navbar'
import Footer from '../compontents/ui/footer'
import Layout from '../compontents/common/layout'

const RootLayout = () => {
    return (
        <Layout> 
            <Navbar />
            <Outlet />
            <Footer />
        </Layout>
    )
  }
  
  export default RootLayout
import {Outlet} from 'react-router-dom'
import Layout from '../../compontents/common/layout'

const AuthLayout = () => {
    return (
        <Layout> 
            <header className='h-12 bg-indigo-600 text-teal-650 text-lg px-5 flex items-center'>
                <img className='w-36' src='/logo.png' />
            </header>
            <Outlet />   
        </Layout>
    )
  }
  
  export default AuthLayout
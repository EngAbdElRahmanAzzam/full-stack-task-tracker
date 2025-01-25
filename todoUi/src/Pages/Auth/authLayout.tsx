import {Outlet} from 'react-router-dom'

const AuthLayout = () => {
    return (
        <> 
            <header className='h-12 bg-indigo-600 text-teal-650 text-lg px-5 flex items-center'>
                <img className='w-36' src='/logo.png' />
            </header>
            <Outlet />   
        </>
    )
  }
  
  export default AuthLayout
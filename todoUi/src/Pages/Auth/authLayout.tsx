import {Outlet} from 'react-router-dom'
import AuthHeader from '../../compontents/authUi/authNavbar'

const AuthLayout = () => {
    return (
        <> 
            <AuthHeader />
            <Outlet />   
        </>
    )
  }
  
  export default AuthLayout
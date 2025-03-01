import {Outlet} from 'react-router-dom'
import AuthHeader from '../../compontents/ui/authHeader'

const AuthLayout = () => {
    return (
        <> 
            <AuthHeader />
            <Outlet />   
        </>
    )
  }
  
  export default AuthLayout
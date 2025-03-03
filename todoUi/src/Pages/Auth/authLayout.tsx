import {Outlet} from 'react-router-dom'
import AuthHeader from '../../compontents/authUi/authNavbar'

const AuthLayout = () => {
    return (
        <> 
            <AuthHeader />
            
            <div>
                <div className="min-h-[92vh] pt-10 mx-auto shadow-2xl md:w-4/6 md:min-h-fit md:my-10">
                    <Outlet />  
                </div>

            </div> 

        </>
    )
  }
  
  export default AuthLayout
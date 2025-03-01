import {Route ,createBrowserRouter , createRoutesFromElements , Navigate} from 'react-router-dom'
import NotFoundPage from '../Pages/notFound';
import RootLayout from '../Pages/rootLayout';
import HomePage from '../Pages/home';
import ToDosPage from '../Pages/toDos';
import AuthLayout from '../Pages/Auth/authLayout';
import SignInPage from '../Pages/Auth/signIn';
import SignUpPage from '../Pages/Auth/signUp';

import ProfilePage from '../Pages/profile';
import ErrorHandler from '../Pages/errorHandler';
import ProtectedRoute from '../compontents/common/protectedRoute';

const user = localStorage.getItem('user')

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path='/home' element=<Navigate to="/"/> />

            <Route 
            path='/'
            errorElement=<ErrorHandler/> 
            element=
                <ProtectedRoute isAllowed={user} redirect='/auth/sign-in'>
                    <RootLayout/>
                </ProtectedRoute>
            >

                <Route index element=<HomePage/> />
                <Route path='todos' element=<ToDosPage/> />
                <Route path='profile' element=<ProfilePage/> />

            </Route>

            <Route path='/auth' element=<Navigate to="/auth/sign-in"/> />

            <Route 
            path='auth'
            errorElement=<ErrorHandler/> 
            element=    
                <ProtectedRoute redirect='/' isAllowed={!user}>
                    <AuthLayout/>
                </ProtectedRoute>
            >

                <Route path='sign-in' element=<SignInPage/> />
                <Route path='sign-up' element=<SignUpPage/> />

            </Route>

            <Route path='*'  element=<NotFoundPage/> />
        </>
    )
)

export default router;


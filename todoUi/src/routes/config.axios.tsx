import {Route ,createBrowserRouter , createRoutesFromElements , Navigate} from 'react-router-dom'
import NotFoundPage from '../Pages/notFound';
import RootLayout from '../Pages/rootLayout';
import HomePage from '../Pages/home';
import TasksPage from '../Pages/tasksPage';
import AuthLayout from '../Pages/Auth/authLayout';
import SignInPage from '../Pages/Auth/signIn';
import SignUpPage from '../Pages/Auth/signUp';
import ProfilePage from '../Pages/profile';
import ErrorHandler from '../Pages/errorHandler';
import ProtectedRoute from '../compontents/common/protectedRoute';
import { routes } from '.';
import { isLoggedIn } from '../authorize/isLoggedIn';


const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path='/home' element=<Navigate to={routes.home}/> />

            <Route 
            path={routes.home}
            errorElement={<ErrorHandler/> }
            element=
                {
                    <ProtectedRoute isAllowed={isLoggedIn()} redirect={routes.signIn}>
                        <RootLayout/>
                    </ProtectedRoute>
                }
            >
                
                <Route index element={<HomePage/>} />  
                <Route path={routes.tasks} element={<TasksPage/>} />
                <Route path={routes.profile} element={<ProfilePage/>} />

            </Route>

            <Route path={routes.authLayout} element={<Navigate to={routes.signIn}/>} />

            <Route 
            path={routes.authLayout}
            errorElement={<ErrorHandler/>} 
            element=    
                {
                    <ProtectedRoute redirect={routes.home} isAllowed={!isLoggedIn()}>
                        <AuthLayout/>
                    </ProtectedRoute>
                }
            >

                <Route path={routes.signInChild} element={<SignInPage/>} />
                <Route path={routes.signUpChild} element={<SignUpPage/>} />

            </Route>

            <Route path='*'  element={<NotFoundPage/>} />
        </>
    )
    ,
    {
        future: {
          v7_normalizeFormMethod: true,
          v7_relativeSplatPath: true,
          v7_skipActionErrorRevalidation: true,
        },
      }
)

export default router;


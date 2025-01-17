import {Route ,createBrowserRouter , createRoutesFromElements , Navigate} from 'react-router-dom'
import NotFoundPage from '../Pages/notFound';
import RootLayout from '../Pages/rootLayout';
import HomePage from '../Pages/home';
import ToDosPage from '../Pages/toDos';
import AuthLayout from '../Pages/Auth/authLayout';
import SignInPage from '../Pages/Auth/signIn';
import SignUpPage from '../Pages/Auth/signUp';
import ProtectedRoute from '../compontents/auth';

const user = JSON.parse(localStorage.getItem('user')!)


const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path='/home' element=<Navigate to="/"/> />
            <Route path='/' element=<ProtectedRoute isAllowed={user?.jwt} redirect='/auth/signin'><RootLayout/></ProtectedRoute>>
                <Route index element=<HomePage/> />
                <Route path='todos' element=<ToDosPage/> />
            </Route>

            <Route path='/auth' element=<Navigate to="/auth/signin"/> />
            <Route path='auth' element=<ProtectedRoute redirect='/' isAllowed={!user?.jwt}><AuthLayout/></ProtectedRoute> >
                <Route path='signin' element=<SignInPage/> />
                <Route path='signup' element=<SignUpPage/> />
            </Route>

            <Route path='auth'  />

            <Route path='*'  element=<NotFoundPage/> />
        </>
    )
)

export default router;


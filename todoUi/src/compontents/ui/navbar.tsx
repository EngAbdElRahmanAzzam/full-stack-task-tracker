import { NavLink } from "react-router-dom"
import LogoutIcon from "../../assets/icons/logoutIcon"

 const Navbar = () => {

    //handlers
    const logout = ()=>{
        localStorage.removeItem('user')
        location.replace('/auth/signin')
    }

    return (
        <header className="">
            <ul className="bg-indigo-600 text-teal-650 text-lg p-5 flex items-center gap-2">
                <li className="hover:text-white transition-all"><NavLink to="/">Home</NavLink></li>
                <li className="hover:text-white transition-all"><NavLink to="/todos">Todos</NavLink></li>
                <li className="px-2 ms-auto border-e-4 border-white hover:text-white transition-all"><NavLink to="/profile">Profile</NavLink></li>
                <li onClick={logout} className="w-7 cursor-pointer hover:translate-x-2 transition-all"><LogoutIcon className="w-6 h-6"/></li>
            </ul>
        </header>
    )
}
export default Navbar
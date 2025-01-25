import {useState , useEffect} from 'react'
import { NavLink } from "react-router-dom"
import LogoutIcon from "../../assets/icons/logoutIcon"

 const Navbar = () => {
    //states   
    const [scrollPercentage, setScrollPercentage] = useState<number>(0);

    //handlers
    const logout = ()=>{
        localStorage.removeItem('user')
        location.replace('/auth/signin')
    }
    const handleScroll = () => {
        const scrollTop = window.scrollY;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / scrollHeight) * 100;
        setScrollPercentage(progress);
    };


      useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
      }, []);

    return (
        <>
        <div
        className="fixed h-2 bg-neutral-700 rounded-lg"
        style={{ width: `${scrollPercentage}%` }}
        >
        </div>

        <header className="h-14 bg-indigo-600 text-teal-650 text-lg py-2 px-5 flex justify-between  items-center">
            <img className="w-36" src="/logo.png" />
            <ul className=" p-5 flex items-center gap-2">
                <li className="hover:text-white transition-all"><NavLink to="/">Home</NavLink></li>
                <li className="hover:text-white transition-all"><NavLink to="/todos">Todos</NavLink></li>
                <li className="px-2 ms-auto border-e-4 border-white hover:text-white transition-all"><NavLink to="/profile">Profile</NavLink></li>
                <li onClick={logout} className="w-7 cursor-pointer hover:translate-x-2 transition-all"><LogoutIcon className="w-6 h-6"/></li>
            </ul>
        </header>
        </>
    )
}
export default Navbar
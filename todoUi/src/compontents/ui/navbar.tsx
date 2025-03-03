import {useState , useEffect} from 'react'
import { NavLink } from "react-router-dom"
import LogoutIcon from "../../assets/icons/logoutIcon"
import { routes } from '../../routes';
import { colors } from '../../data/styles';
import ButtonIcon from '../../assets/icons/button';

 const Navbar = () => {
    //states 
    const [isShowNav, setIsShowNav] = useState<boolean>(false)  
    const [scrollPercentage, setScrollPercentage] = useState<number>(0);

    //handlers
    const toggleNavHandler = ()=> setIsShowNav(!isShowNav)

    const logout = ()=>{
        localStorage.removeItem('user')
        location.replace(routes.signIn)
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
            {/* progress bar */}
            <div
                className="fixed h-2 bg-neutral-700 rounded-lg"
                style={{ width: `${scrollPercentage}%` }}
            >
            </div>

            {/* navbar */}
            <header 
                className={`h-14 ${colors.mainColorBg} text-teal-650 text-lg relative py-2 px-5 z-50 flex justify-between items-center`}
            >

                <img className="w-36" src="/logo.png" />
                
                {/* "p-5 flex items-center gap-2"   w-6 h-6 */}
                <ul 
                    className={`w-full text-2xl border-black  overflow-hidden absolute top-full left-0 flex flex-col items-center gap-2 bg-indigo-600 shadow-2xl shadow-black transition-[max-height]
                    ${isShowNav ? "max-h-screen border-t-2" : "max-h-0"}`}
                    onClick={toggleNavHandler}
                >
                    <li className="hover:text-white transition-all">
                        <NavLink to={routes.home}>Home</NavLink>
                    </li>

                    <li className="hover:text-white transition-all">
                        <NavLink to={routes.tasks}>Tasks</NavLink>
                    </li>

                    <li className=" border-white md:ms-auto md:border-e-4 hover:text-white transition-all">
                        <NavLink to={routes.profile} >Profile</NavLink>
                    </li>

                    <li className='w-full border-white border-t-2'></li>

                    <li onClick={logout} className="w-7 mb-2 cursor-pointer md:mb-0 hover:translate-x-2 transition-all">
                        <LogoutIcon className="w-10"/>
                    </li>
                </ul>

                <ButtonIcon onClick={toggleNavHandler} className='cursor-pointer md:hidden'/>
                

            </header>
        </>
    )
}
export default Navbar
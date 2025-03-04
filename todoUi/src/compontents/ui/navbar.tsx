import {useState , useEffect} from 'react'
import { NavLink } from "react-router-dom"
import LogoutIcon from "../../assets/icons/logoutIcon"
import { routes } from '../../routes';
import { colors, dimentions } from '../../data/styles';
import ButtonIcon from '../../assets/icons/button';
import { clearStorage } from '../../utils/localStorage';

 const Navbar = () => {
    // variables
    let isMobile = false

    //states 
    const [isShowNav, setIsShowNav] = useState<boolean>(false)  
    const [scrollPercentage, setScrollPercentage] = useState<number>(0);

    //handlers
    const toggleNavHandler = ()=> setIsShowNav(!isShowNav)

    const logout = ()=>{
        clearStorage()
        location.replace(routes.signIn)
    }

    const handleScroll = () => {
        const scrollTop = window.scrollY;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / scrollHeight) * 100;
        setScrollPercentage(progress);
    };

    useEffect(() => {
        if(window.innerWidth <= 768)
        {
            isMobile = true
        }
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
                className={`${dimentions.navbarHeigth} ${colors.mainColorBg} text-teal-650 relative py-2 px-5 flex justify-between items-center`}
            >

                <img className={dimentions.logoWidth} src="/logo.png" />
                
                <ul 
                    className={`w-full text-2xl border-black overflow-hidden absolute top-full left-0 flex flex-col items-center gap-2 bg-indigo-600 shadow-2xl shadow-black transition-[max-height]
                    md:w-auto md:static md:overflow-visible md:flex-row md:text-2xl
                    ${isShowNav ? "max-h-screen border-t-2" : "max-h-0"}`}
                    onClick={isMobile ? toggleNavHandler : () => {}}
                >
                    <li className="hover:text-white transition-all">
                        <NavLink to={routes.home}>Home</NavLink>
                    </li>

                    <li className="hover:text-white transition-all">
                        <NavLink to={routes.tasks}>Tasks</NavLink>
                    </li>

                    <li className=" border-white md:border-e-4 hover:text-white transition-all md:pr-2">
                        <NavLink to={routes.profile} >Profile</NavLink>
                    </li>

                    <li className='w-full border-white border-t-2 md:hidden'></li>

                    <li onClick={logout} className="w-7 mb-2 cursor-pointer md:mb-0 hover:translate-x-2 transition-all">
                        <LogoutIcon className="w-8 md:w-10"/>
                    </li>
                </ul>

                <ButtonIcon onClick={toggleNavHandler} className='cursor-pointer md:hidden'/>
                

            </header>
        </>
    )
}
export default Navbar
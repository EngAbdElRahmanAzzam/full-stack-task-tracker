import { colors } from "../../data/styles"

const AuthHeader = () => {
  return (
        <header className={`h-[8vh] ${colors.mainColorBg} text-teal-650 text-lg px-5 flex items-center`}>
            <img className='w-36' src='/logo.png' />
        </header>
  )
}

export default AuthHeader
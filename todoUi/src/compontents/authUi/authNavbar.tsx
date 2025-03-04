import { colors, dimentions } from "../../data/styles"

const AuthHeader = () => {
  return (
        <header className={`${dimentions.navbarHeigth} ${colors.mainColorBg} px-5 flex items-center`}>
            <img className={dimentions.logoWidth} src='/logo.png' />
        </header>
  )
}

export default AuthHeader
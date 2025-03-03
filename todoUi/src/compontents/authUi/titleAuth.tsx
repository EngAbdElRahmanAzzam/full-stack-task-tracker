import { ReactNode } from "react"
import { colors, dimentions } from "../../data/styles"

interface IProps{
    children:ReactNode
}

const TitleAuth = ({children}:IProps) => {
  return (

    <h2 className={`font-semibold text-xl ${colors.mainColorText} ${dimentions.containerPMd} text-center md:text-4xl`}>
        {children}
    </h2>
  )
}

export default TitleAuth
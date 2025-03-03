import { ReactNode } from "react"
import { colors, dimentions } from "../../data/styles"
import Loader from "../common/loader"

interface IProps{
    isSubmitting:boolean
    children:ReactNode
}

const FormBtn = ({children, isSubmitting}:IProps) => {
  return (
    <button 
    disabled={isSubmitting} 
    className={`${colors.mainColorBg} ${dimentions.fieldFormW} text-white py-2 mt-3 disabled:cursor-not-allowed disabled:opacity-30`}
    >
    {isSubmitting?<Loader />:children}
    </button>
  )
}

export default FormBtn


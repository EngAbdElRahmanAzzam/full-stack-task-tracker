import {ReactNode , ButtonHTMLAttributes} from 'react'
import { colors } from '../../data/styles';

interface IProps extends  ButtonHTMLAttributes<HTMLButtonElement>{
    children:ReactNode,
    className?:string;
}   


const FilterButton = ({children, className , ...rest}:IProps)=>{


    return (
        <button 
            {...rest}
            className={`flex gap-2 px-2 py-1 border-2 ${colors.mainBorder} rounded-xl ` + className}                
        >
            {children}
        </button>
    )
}

export default FilterButton






























import {ReactNode, SelectHTMLAttributes} from 'react'

interface IProps extends SelectHTMLAttributes<HTMLSelectElement>{
    className?:string;
    children:ReactNode;
}

const SelectList = ({className,children, ...reset}:IProps)=>{

    return(
        <div>
        <select
            {...reset}
            name="HeadlineAct"
            id="HeadlineAct"
            className={`mt-1.5 rounded-lg border-gray-300 text-gray-700 sm:text-sm ${className} focus:outline-none`}
        >
            {
                children
            }
        </select>
        </div>
    )
}

export default SelectList
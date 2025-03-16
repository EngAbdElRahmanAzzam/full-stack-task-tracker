import {SelectHTMLAttributes} from 'react'
import { colors } from '../../data/styles';

interface IProps extends SelectHTMLAttributes<HTMLSelectElement>{
    className?:string;
    optionsStr:string;
}

const SelectList = ({className,optionsStr, ...reset}:IProps)=>{
    const options = optionsStr.split(',')
    //renders 
    const OptionList = options.map((curr,index) => <option key={index} className={colors.mainColorBgHover+`hover:bg-indigo-600`}>{curr}</option>)
    return(
        <div>
            <select
                {...reset}
                className={`${colors.mainColorText} py-1 px-2 mt-1.5 rounded-lg  sm:text-sm cursor-pointer outline-none ${className}`}
            >
                {
                    OptionList
                }
            </select>
        </div>
    )
}

export default SelectList
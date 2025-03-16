import {ReactNode, useState} from 'react'
import { colors, styles } from '../../data/styles';
import CloseIcon from '../../assets/icons/closeIcon';
import { IOption } from '../../interfaces/ui';
import Button from './button';
import DownArrowIcon from '../../assets/icons/downArrow';
import FilterButton from './filterButton';


interface IProps {
    setParam:(val:number)=>void
    options:IOption[]
    setQuery:(val:unknown)=>void
    children:ReactNode
}

const FilterControl = ({setParam, options,setQuery,children}:IProps) => {
    //states
    const [isShow, setIsShow] = useState<boolean>(false);
    const [indexChoice, setIndexChoice] = useState<number>(0);

    //handlers
    const toggleMenu = () => setIsShow(!isShow)

    const resetParam = () => {
        setIndexChoice(0)
        setParam(options[0].value)
        setQuery( (val:number)=> val+1)
        toggleMenu()
    }

    const choiceParamHandler = (index:number)=> {
        setIndexChoice(index)
        setParam(options[index].value)
        setQuery( (val:number)=> val+1)
    } 

    //renders 
    const optionList = options.map((option, index) => <FilterControl.OptionItem key={index} index={index} option={option} isChecked={(indexChoice==index)} onClickHandle={()=> choiceParamHandler(index)}/>)

    return (
        <div className='relative'>
            <FilterButton 
                onClick={toggleMenu}
                className={`flex gap-2 px-2 py-1 border-2 ${colors.mainBorder} rounded-xl`}                
            >
                {children} <DownArrowIcon className={`transition-all ${(isShow)?"rotate-180" : ""}`} />
            </FilterButton>
            {isShow&&   
                (<div className={`bg-white w-[350px] absolute top-full m-2 py-2 rounded-lg ${styles.boxFilter}`}>
                    <div className='px-2'>
                        <button onClick={toggleMenu} className='block ml-auto'>
                            <CloseIcon/>
                        </button>
                        <form name='filter'>
                            {
                                optionList
                            }
                        </form>
                    </div>

                    <div className='p-2 border-t-2 border-t-slate-700'>
                        <Button className={`${colors.mainColorBg} hover:bg-indigo-300`} onClick={toggleMenu}>Show</Button>
                        <Button className="bg-neutral-700 text-white hover:bg-neutral-300 ms-2" onClick={resetParam}>Cancel</Button>
                    </div>
                </div>)
            }
        </div>
    )

}



interface IOptionItem{
    index:number;
    option:IOption;
    isChecked:boolean
    onClickHandle:()=>void
}

FilterControl.OptionItem = ({option, index, isChecked,onClickHandle}:IOptionItem)=> {
    return(
        <div className='flex items-center gap-2 my-2'>
            <input 
            id={`l${index}`}
            type='radio' 
            name='filter'
            value={option.value}
            onChange={onClickHandle}
            className={`appearance-none size-6 rounded-full border-2 checked:bg-white checked:border-[6px] ${colors.mainBorderChecked} cursor-pointer`}
            checked={isChecked}
            />  

             <label htmlFor={`l${index}`} className='cursor-pointer'>{option.key}</label>                   
        </div>
    )
}
export default FilterControl
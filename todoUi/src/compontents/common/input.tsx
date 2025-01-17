import {ReactNode, Ref, forwardRef , InputHTMLAttributes} from 'react'

interface IProps extends InputHTMLAttributes<HTMLInputElement>{
    children:ReactNode,
    className?:string;
}   


const Input = forwardRef(
    ({children, className,...rest}:IProps, ref:Ref<HTMLInputElement>)=>{
        const labelTxt = children as string
        return(
            <div className="flex flex-col">
                <label className="text-sm font-semibold mb-0 cursor-pointer" htmlFor={labelTxt}>
                    {labelTxt}
                </label>
                <input id={labelTxt} ref={ref} placeholder={labelTxt} className={`w-80 py-1 mt-0 mb-2 bg-inherit border-b-2 focus:outline-none ${className}`} {...rest}/>
            </div>
        )
    }
)

export default Input
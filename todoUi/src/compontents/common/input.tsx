// import {ReactNode, Ref, forwardRef , InputHTMLAttributes} from 'react'

// interface IProps extends InputHTMLAttributes<HTMLInputElement>{
//     children:ReactNode,
//     className?:string;
// }   


// const Input = forwardRef(
//     ({children, className,...rest}:IProps, ref:Ref<HTMLInputElement>)=>{
//         const labelTxt = children as string
//         return(
//             <div className="flex flex-col">
//                 <label className="text-sm font-semibold mb-0 cursor-pointer" htmlFor={labelTxt}>
//                     {labelTxt}
//                 </label>
//                 <input id={labelTxt} ref={ref} placeholder={labelTxt} className={`w-80 py-1 mt-0 mb-2 bg-inherit border-b-2 focus:outline-none ${className}`} {...rest}/>
//             </div>
//         )
//     }
// )

// export default Input
import {ReactNode,InputHTMLAttributes} from 'react'
import { UseFormRegisterReturn , FieldError} from 'react-hook-form';

interface IProps extends InputHTMLAttributes<HTMLInputElement>{
    className?:string;
    id:string;
    register:UseFormRegisterReturn<string>;
    children:ReactNode
    error:FieldError | undefined;
}   


const InputForm = ({id, className, register, error,children,...rest}:IProps)=>{
    const labelTxt = children as string
    return(
        <>
            <div className="flex flex-col">

                <label className={`text-sm font-semibold mb-0 cursor-pointer 
                ${(error)?"text-red-600":""}`} htmlFor={id}>
                    {labelTxt}
                </label>
                <input 
                id={id} 
                className={`w-80 py-1 mt-0 mb-2 bg-inherit border-b-2 focus:outline-none ${className}
                ${(error)?"border-red-600":""}`}
                {...register} 
                {...rest}/>

            </div>
            {
                error && 
                <div className='text-red-600'>
                    {error.message}
                </div> 
            }
        </>
    )
}

export default InputForm
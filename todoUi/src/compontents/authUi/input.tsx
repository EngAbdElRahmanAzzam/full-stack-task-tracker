import {ReactNode,InputHTMLAttributes , useState} from 'react'
import { UseFormRegisterReturn , FieldError} from 'react-hook-form';
import { colors, dimentions } from '../../data/styles';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement>{
    className?:string;
    id:string;
    register?:UseFormRegisterReturn<string>;
    children:ReactNode
    error:FieldError | undefined | boolean |string;
}  

interface ILabelProps {
    id:string;
    children:ReactNode
    error:FieldError  | undefined | boolean |string;
}

interface IErrorProps{
    error:FieldError | undefined| boolean |string;
}

const InputForm = ({id, className, register, error,children,...rest}:IInputProps)=>{
    
    return(
            <div className="flex flex-col">

                <InputForm.Label id={id} error={error}>{children}</InputForm.Label>

                <input 
                id={id} 
                className={`${dimentions.fieldFormW} py-1 mt-0 mb-2 bg-inherit border-b-2 focus:outline-none ${colors.mainBorderFocus} ${className}
                ${(error)?"border-red-600":""}`}
                {...register}
                {...rest}/>

                <InputForm.Error error={error}/>

            </div>
    )
}

export const InputFormPassword = ({id, className, register, error,children,...rest}:IInputProps)=>{
    const [isShow, setIsShow] = useState<boolean>(false);
    //handlers 
    const togglePassword = () => setIsShow(!isShow)

    return(
            <div className="flex flex-col">

                <InputForm.Label id={id} error={error}>{children}</InputForm.Label>

                <div className="relative w-full">
                    <input
                        id={id}
                        type={isShow ? "text" : "password"}
                        className={`${dimentions.fieldFormW} py-1 mt-0 mb-2 bg-inherit border-b-2 focus:outline-none ${colors.mainBorderFocus} ${className}
                        ${(error)?"border-red-600":""}`}
                        {...register}
                        {...rest}
                    />
                    <span
                        className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-xl"
                        onClick={togglePassword}
                    >
                        {isShow ? "🙈" : "👁️"}
                    </span>
                </div>

                <InputForm.Error error={error}/>

            </div>
    )
}

InputForm.Label = ({id,error,children}:ILabelProps)=> {
    const labelTxt = children as string
    return (
        <label className={`text-2xl font-extralight ${colors.mainColorText} mb-0 cursor-pointer 
        ${(error)?"text-red-600":""}`} htmlFor={id}>
            {labelTxt}
        </label>
    )
}


InputForm.Error = ({error}:IErrorProps)=> {
    return (
        <>
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
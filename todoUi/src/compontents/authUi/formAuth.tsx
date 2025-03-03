import { ReactNode , ComponentProps } from "react"

interface IProps extends ComponentProps<"form">{
    className?:string;
    children:ReactNode
}

const FormAuth = ({children, className,...rest}:IProps) => {

    return (
        <form
            {...rest}  
            className={`p-5 lg:my-20 flex flex-col gap-2 justify-center items-center w-1/2 ${className}`}
        >
            {children}
        </form>
    )
}

export default FormAuth
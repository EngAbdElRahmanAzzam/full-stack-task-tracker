import { toast } from "react-hot-toast"
import {CSSProperties} from 'react'

export const successToast = (msg:string,style?:CSSProperties)=>{
    toast.success(msg,{
        duration:4000,
        position:"top-right",
        style
    })
}

export const errorToast = (msg:string, style?:CSSProperties)=>{
    toast.error(msg,
        {
            position:"top-right",
            duration:4000,
            style
        }
    )
}
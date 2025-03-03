import { toast } from "react-hot-toast"
import {CSSProperties} from 'react'
import {toastsStyle } from "../data/styles"

export const successToast = (msg:string,style:CSSProperties=toastsStyle.successToast)=>{
    toast.success(msg,{
        duration:4000,
        position:"top-right",
        style
    })
}

export const errorToast = (msg:string, style:CSSProperties=toastsStyle.errorToast)=>{
    toast.error(msg,
        {
            position:"top-right",
            duration:4000,
            style
        }
    )
}
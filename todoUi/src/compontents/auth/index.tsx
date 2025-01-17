import { ReactNode } from "react"
import { Navigate } from "react-router-dom";

interface IProps{
    redirect:string;
    isAllowed:unknown;
    children:ReactNode;
}

const ProtectedRoute =({children, redirect , isAllowed}:IProps)=>{
    if(isAllowed)
        return children
    return <Navigate to={redirect}/>
}

export default ProtectedRoute
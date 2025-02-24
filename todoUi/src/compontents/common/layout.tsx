import { ReactNode } from "react";

interface IProps{
    children:ReactNode
}

const Layout = ({children}:IProps) => {
  return (
    <div className="flex flex-col min-h-full">
        {children}
    </div>
  )
}

export default Layout
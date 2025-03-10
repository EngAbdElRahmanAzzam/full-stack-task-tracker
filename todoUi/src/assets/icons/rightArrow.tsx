import {ComponentProps} from 'react'
interface IProps extends ComponentProps<"svg">{
    className?:string
}
const RightArrow = ({className, ...rest}:IProps) => {

  return (
    <svg {...rest} className={`size-4 ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
    </svg>
  )
}

export default RightArrow






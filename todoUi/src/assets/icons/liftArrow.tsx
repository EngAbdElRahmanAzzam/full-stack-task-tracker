import {ComponentProps} from 'react'
interface IProps extends ComponentProps<"svg">{
    className?:string
}
const LeftArrow = ({className, ...rest}:IProps) => {

  return (
      <svg  {...rest} className={`size-4 ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
      </svg>
  )
}

export default LeftArrow



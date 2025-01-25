import {ReactNode} from 'react'

interface IProps{
    children:ReactNode
}

const TitleSection = ({children}:IProps) => {
  return (
    <div className='sm:px-5 lg:px-16 my-4 mx-auto'>
        <p className='text-2xl font-medium text-indigo-600 border-l-4 ps-2 border-l-neutral-700'>
          {children}
        </p>
    </div>
  )
}

export default TitleSection
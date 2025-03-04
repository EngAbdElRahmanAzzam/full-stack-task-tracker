import { ReactNode, useState } from "react"
import LeftArrow from "../../assets/icons/liftArrow"
import RightArrow from "../../assets/icons/rightArrow"
import { colors } from "../../data/styles"

const Pagination = () => {
    const last = 10;
     //states 
    const [page, setPage] = useState<number>(7)

    //handlers 
    const nextPageHandler = () => {
        if(page+2 < last)
        setPage((val) => val+1)
    }

    const prevPageHandler = () => {
        if(page-2 > 1)
        setPage((val) => val-1)
    }

    //renders 
    const pageList = Array.from({length:5}, (_,index) => <Pagination.PageItem key={index} page={page-2+index} className={(index==2)?`${colors.mainColorBg} text-white`:""} /> )

    return (
        <ol className="flex justify-center items-center gap-1 text-xs font-medium">
            
            <Pagination.BtnItem handler={prevPageHandler} disableCondition>
                <LeftArrow/>
            </Pagination.BtnItem>

            {( page > 3)?
                <>
                    <Pagination.PageItem page={1} /> 
                    <li className="text-center leading-8">. . .</li>
                 </>:""
            }

            {pageList}
            
            <Pagination.BtnItem handler={nextPageHandler} disableCondition>
                <RightArrow/>
            </Pagination.BtnItem>
            
        </ol>
    )
}

// 
Pagination.PageItem = ({page, className}:{page:number;className?:string}) => {

    return (
        <li className={`block size-8 ${colors.mainColorText} ${colors.mainBorder} rounded text-center leading-8 ${className}`}>
                {page}
        </li>
    )
}
interface IBtnItemProps{
    disableCondition:boolean;
    handler : ()=>void
    children:ReactNode
}

Pagination.BtnItem = ({disableCondition, handler, children}:IBtnItemProps)=> {

    return(
        <li>
            <button
                className={`${colors.mainColorText} disabled:cursor-not-allowed`}
                onClick={handler}
                disabled={(disableCondition)?false:true}
                // disabled={(page-2 > 1)?false:truepage+2 < last}
            >
                {children}
            </button>
        </li>
    )
}
  export default Pagination
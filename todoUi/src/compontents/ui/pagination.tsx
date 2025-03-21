import { ReactNode } from "react"
import LeftArrow from "../../assets/icons/liftArrow"
import RightArrow from "../../assets/icons/rightArrow"
import { colors } from "../../data/styles"

interface IProps{
    page:number;
    setPage:(val:number)=>void;
    numPages:number
}

const Pagination = ({page, setPage}:IProps) => {
    const numPages = 10;
    const numNeighborPage = 2


    //handlers 
    const nextPageHandler = () => {
        if(page+numNeighborPage < numPages)
        setPage(page+1)
    }

    const prevPageHandler = () => {
        if(page-numNeighborPage > 1)
        setPage(page-1)
    }

    const onClickPageItemHandler = (page:number) => {
        setPage(page)
    }

    //renders 
    const pageList = Array.from({length:5}, 
        (_,index) => 
                <Pagination.PageItem 
                    key={index} 
                    page={page-2+index}
                    handler={()=> onClickPageItemHandler(page-2+index)} 
                    className={(index==2)?`${colors.mainColorBg} text-white`:""} 
                /> )

    return (
        <ol className="text-xs font-medium my-5 flex justify-center items-center gap-2">
            
            <Pagination.BtnItem handler={prevPageHandler} disableCondition={(page-numNeighborPage-1) == 1}>
                <LeftArrow/>
            </Pagination.BtnItem>

            {( page-numNeighborPage > numNeighborPage)?
                <>
                    <Pagination.PageItem page={1} handler={()=>onClickPageItemHandler(1)} />
                    <li className="text-center leading-8">. . .</li>
                 </>:(page-numNeighborPage == 1)?"":<Pagination.PageItem page={1} handler={()=>onClickPageItemHandler(1)} />
            }

            {pageList}

            {
                (numPages-numNeighborPage !== page)&&<li className="text-center leading-8">. . .</li>
            }
            
            <Pagination.BtnItem handler={nextPageHandler} disableCondition={(page+numNeighborPage) == numPages}>
                <RightArrow/>
            </Pagination.BtnItem>
            
        </ol>
    )
}

// ========================== pageitem props interface
interface IPageItemProps{
    page:number;
    handler:VoidFunction
    className?:string
}

// ========================== pageitem component
Pagination.PageItem = ({page, className}:IPageItemProps) => {

    return (
        <li 
            className={`block size-8 ${colors.mainColorText} ${colors.mainBorder} rounded text-center leading-8 ${className}`}>
                <button
                >
                    {page}
                </button>
        </li>
    )
}

// ========================== BtnItem props interface
interface IBtnItemProps{
    disableCondition:boolean;
    handler : (page:number)=>void
    children:ReactNode
}

// ========================== BtnItem  component
Pagination.BtnItem = ({disableCondition, handler, children}:IBtnItemProps)=> {

    return(
        <li>
            <button
                className={`${colors.mainColorText} size-8 flex justify-center items-center rounded backdrop-brightness-90 disabled:cursor-not-allowed disabled:opacity-30`}
                onClick={()=>handler(children as number)}
                disabled={(disableCondition)?true:false}
            >
                {children}
            </button>
        </li>
    )
}
  export default Pagination
interface IProps{
    msg:string
}

const Error = ({msg}:IProps)=>{
    return(
        <p className="text-red-500 text-sm font-medium my-2">
            {msg}
        </p>
    )
}

export default Error
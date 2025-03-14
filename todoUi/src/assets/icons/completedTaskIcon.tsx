interface IProps{
    className ?:string
}

const CompletedTaskIcon = ({className}:IProps) => {
    
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>
            <path d="m9 16 2 2 4-4"/>
        </svg>

    )
}

export default CompletedTaskIcon
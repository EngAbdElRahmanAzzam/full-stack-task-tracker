import Loader from "../common/loader"
import { axiosInstaceAuth } from "../../services/axios.config"
import { ITaskModel } from "../../interfaces/models"
import Button from "../common/button"
import Model from "../common/model"
import {useState , ChangeEvent} from 'react'
import { AxiosError } from "axios"
import { IErrorRespone } from "../../interfaces/api"
import Input from "../authUi/input"
import { errorToast, successToast } from "../../utils/toasts"
import CheckIcon from "../../assets/icons/chechIcon"
import { triggerBasicConfetti } from "../../utils/confettiEffect"
import NoTaskFound from "../common/noTaskFound"
import OptionBtn from "../../assets/icons/optionBtn"
import { styles } from "../../data/styles"
import Skeleton from "../common/skeleton"

interface IProps{
    numQuery:number;
    setNumQuery:(val:number)=>void;
    isLoading:boolean
    tasks:ITaskModel[]
}


const TasksList = ({numQuery, setNumQuery,isLoading ,tasks}:IProps) => 
{
    //states
    const [taskCurrIndex , setTaskCurrIndex] = useState<number>(-1) 
    const [isLoadingUpdate, setIsLoadingUpdate] = useState<boolean>(false)
    const [isLoadingUpdateStatus, setLoadingUpdateStatus] = useState<boolean>(false)
    const [isLoadingDelete, setIsLoadingDelete] = useState<boolean>(false)
    const [isOpenUpdateModel, setIsOpenUpdateModel] = useState<boolean>(false)
    const [isOpenDeleteModel, setIsOpenDeleteModel] = useState<boolean>(false)
    const [selectedTodo, setSelectedTodo] = useState<ITaskModel>({
        title:"",
        description:"",
        status:false
    })

    //handlers
    const toggleDeleteModel = ()=> setIsOpenDeleteModel(prev => !prev)
    const toggleUpdateModel = ()=> setIsOpenUpdateModel(prev => !prev)

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        setSelectedTodo({...selectedTodo,[e.target.name]:e.target.value})
    }

    const openGroupBtns = (index:number) => {
        setTaskCurrIndex(index)
    }

    const closeGroupBtns = () => {
        setTaskCurrIndex(-1)
    }


    const onUpdateTodoStatus = async (todo:ITaskModel)=>{
        if(!todo.status)
        {
            setSelectedTodo(todo)
            setLoadingUpdateStatus(true)
            try
            {
                await axiosInstaceAuth.patch(`/todos/${selectedTodo?._id}`, {
                    status:true
                })
                triggerBasicConfetti();
                successToast("Updated sucessfully")
                setNumQuery(numQuery+1)

            }catch(e)
            {   
                const error = e as AxiosError<IErrorRespone>
                let msg:string = ""
                if(error.response?.data == undefined)
                {
                    msg = error.response?.statusText as string
                }
                else{
                    msg = error.response?.data.message as string 
                }
                errorToast(`Failed updating ${msg}`)
            }finally{
                setLoadingUpdateStatus(false)
            }
        }
    }

    const updateTodoSure = async()=>{
        setIsLoadingUpdate(true)
        try
        {
            await axiosInstaceAuth.patch(`/todos/${selectedTodo?._id}`, {
                title:selectedTodo.title,
                description:selectedTodo.description
            })
            successToast("Updated sucessfully")
            setNumQuery(numQuery+1)

        }catch(e)
        {   
            const error = e as AxiosError<IErrorRespone>
            let msg:string = ""
            if(error.response?.data == undefined)
            {
                msg = error.response?.statusText as string
            }
            else{
                msg = error.response?.data.message as string 
            }
            errorToast(`Failed updating ${msg}`)
                
        }finally{
            setIsLoadingUpdate(false)
            toggleUpdateModel()
        }
    }

    const removeTodoSure = async()=>{
        setIsLoadingDelete(true)
        try
        {
            await axiosInstaceAuth.delete(`/todos/${selectedTodo._id}`)
            successToast("deleted sucessfully")
            setNumQuery(numQuery+1)

        }catch(e)
        {   
            const error = e as AxiosError<IErrorRespone>
            let msg:string = ""
            if(error.response?.data.message == undefined)
            {
                msg = error.response?.statusText as string
            }
            else{
                msg = error.response?.data.message as string 
            }
            errorToast(`Failed Deleting ${msg}`)
                
        }finally{
            setIsLoadingDelete(false)
            toggleDeleteModel()
        }
    }

    //renders
    if(isLoading)
        return Array(8).fill(0).map((_, index)=> <Skeleton key={index} />)

    if(tasks == undefined || tasks.length == 0)
    {
        return <NoTaskFound/>
    }

    const todosList = tasks.map((currTodo:ITaskModel,index)=>(
            <tr 
                className="odd:bg-white even:bg-gray-100" 
                onClick={()=>setSelectedTodo(currTodo)}
                key={currTodo._id}
            >
                <td className="flex justify-between items-center px-4 py-2 lg:px-16">
                    <div className="flex gap-1">
                        {   
                            (isLoadingUpdateStatus && currTodo._id == selectedTodo._id)?
                            <Loader />
                            :
                            <CheckIcon 
                            onClick={() => onUpdateTodoStatus(currTodo)}
                            className={`w-5 ${(!currTodo.status)?"transition-all  hover:text-yellow-500 cursor-pointer":(isLoadingUpdateStatus)?"cursor-wait":"text-green-400"}`} 
                            />
                        }   
                        <p className="cursor-pointer" onClick={toggleUpdateModel}>{currTodo.title}</p>
                    </div>

                    <div className="relative">
                        <button onClick={()=>openGroupBtns(index)}>
                            <OptionBtn />
                        </button>

                        {(index == taskCurrIndex) && ( 
                           <>
                                <div className="absolute top-4 right-6 z-50">
                                    <div className={`inline-flex rounded-lg bg-gray-100 px-2 ${styles.boxFilter}`}>
                                        <Button className="bg-indigo-600 hover:bg-indigo-300 my-2" onClick={toggleUpdateModel}>Update</Button>
                                        <Button className="bg-neutral-700 text-white ms-2 hover:bg-neutral-300 my-2"  onClick={toggleDeleteModel}>Remove</Button>
                                    </div>
                                </div>

                                <div className='fixed top-0 left-0 w-screen h-screen z-40' onClick={closeGroupBtns}></div>
                           </>
                        )}
                    </div>
                </td>
            </tr>
    ))

    return(
        <>
            <table className="sm:w-full table-auto border-collapse">
                <tbody>
                    {
                        todosList
                    }
                </tbody>
            </table>
            <Model isOpenModel={isOpenUpdateModel} closeModel={toggleUpdateModel} title="Update Todo">
                <Input name="title" onChange={onChangeHandler} className="focus:border-indigo-600" value={selectedTodo?.title}> 
                        Title
                </Input>

                <textarea name="description" onChange={onChangeHandler} placeholder="Description" value={selectedTodo?.description}  className="w-full p-2 my-3 h-30  border-2 rounded-lg resize-none focus:outline-none focus:border-indigo-600"></textarea>

                <Button className="bg-sky-600 hover:bg-sky-300" onClick={updateTodoSure} disabled={isLoadingUpdate}>{(isLoadingUpdate)?<Loader/>:"Update"}</Button>
                <Button className="bg-neutral-700 text-white hover:bg-neutral-300 ms-2" onClick={toggleUpdateModel}>Cancel</Button>
            </Model>

            <Model isOpenModel={isOpenDeleteModel} closeModel={toggleDeleteModel} title="Remove Todo">
                <p className="mb-2">
                    Are you sure to delete {selectedTodo?.title} to do?
                </p>

                <Button className="bg-sky-600 hover:bg-sky-300" onClick={removeTodoSure} disabled={isLoadingDelete}>{isLoadingDelete?<Loader/>:"Remove"}</Button>
                <Button className="bg-neutral-700 text-white hover:bg-neutral-300 ms-2" onClick={toggleDeleteModel}>Cancel</Button>
            </Model>
        </>
    )
}

export default TasksList
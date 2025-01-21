import { useQuery } from "@tanstack/react-query"
import Loader from "../common/loader"
import { axiosInstaceAuth } from "../../config/axios.config"
import { ITodo } from "../../interfaces/todo"
import Button from "../common/button"
import Model from "../common/model"
import {useState , ChangeEvent} from 'react'
import { AxiosError } from "axios"
import { IErrorRespone } from "../../interfaces/api"
import Input from "../common/input"
import { errorToast, successToast } from "../../utils/toasts"

interface IProps{
    numQuery:number;
    setNumQuery:(val:number)=>void
}

const TodoList = ({numQuery, setNumQuery}:IProps) => 
{
    //states
    const [isLoadingUpdate, setIsLoadingUpdate] = useState<boolean>(false)
    const [isLoadingDelete, setIsLoadingDelete] = useState<boolean>(false)
    const [isOpenUpdateModel, setIsOpenUpdateModel] = useState<boolean>(false)
    const [isOpenDeleteModel, setIsOpenDeleteModel] = useState<boolean>(false)
    const [selectedTodo, setSelectedTodo] = useState<ITodo>({
        title:"",
        description:"",
        status:false
    })

    const {isLoading, data:todos} = useQuery({
        queryKey:['todoList', `${numQuery}`],
        queryFn:async ()=>{
            const {data} = await axiosInstaceAuth.get('/todos?limit=20&page=3')  
            return data.data
        }
    })

    //handlers
    const toggleDeleteModel = ()=> setIsOpenDeleteModel(prev => !prev)

    const toggleUpdateModel = ()=> setIsOpenUpdateModel(prev => !prev)

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        setSelectedTodo({...selectedTodo,[e.target.name]:e.target.value})
    }

    const onUpdateTodoBtn = (todo:ITodo)=>{
        setSelectedTodo(todo)
        toggleUpdateModel()
    }

    const onRemoveTodoBtn = (todo:ITodo)=>{
        setSelectedTodo(todo)
        toggleDeleteModel()
    }

    const updateTodoSure = async()=>{
        setIsLoadingUpdate(true)
        console.log(selectedTodo._id)
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
        return <Loader />

    if(todos == undefined || todos.length == 0)
    {
        return "no todos to display"
    }

    const todosList = todos.map((currTodo:ITodo)=>(
            <tr className="odd:bg-white even:bg-gray-100" key={currTodo._id}>
                <td className="flex justify-between items-center px-4 py-2 lg:px-16">
                    <p>{currTodo.title}</p>
                    <div className={`${(currTodo.status)?"text-green-400":""}`}>
                        <Button className="bg-indigo-600 hover:bg-indigo-300 my-2" onClick={()=>onUpdateTodoBtn(currTodo)}>Update</Button>
                        <Button className="bg-neutral-700 text-white ms-2 hover:bg-neutral-300 my-2" onClick={()=>onRemoveTodoBtn(currTodo)}>Remove</Button>
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

export default TodoList
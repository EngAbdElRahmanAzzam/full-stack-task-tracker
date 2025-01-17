import { useQuery } from "@tanstack/react-query"
import Loader from "../common/loader"
import { axiosInstaceAuth } from "../../config/axios.config"
import { ITodo } from "../../interfaces/todo"
import Button from "../common/button"
import Model from "../common/model"
import {useState , ChangeEvent , ReactNode} from 'react'
import { AxiosError } from "axios"
import { IErrorRespone } from "../../interfaces/api"
import Input from "../common/input"
import { errorToast, successToast } from "../../utils/toasts"

interface IProps{
    numQuery:number;
    setNumQuery:(val:number)=>void
    children?:ReactNode
}

const TodoList = ({numQuery, setNumQuery, children}:IProps) => 
{
    let num = 1;
    //states
    const [isLoadingUpdate, setIsLoadingUpdate] = useState<boolean>(false)
    const [isLoadingDelete, setIsLoadingDelete] = useState<boolean>(false)
    const [isOpenUpdateModel, setIsOpenUpdateModel] = useState<boolean>(false)
    const [isOpenDeleteModel, setIsOpenDeleteModel] = useState<boolean>(false)
    const [selectedTodo, setSelectedTodo] = useState<ITodo>({
        title:"",
        discription:"",
    })

    const {isLoading, data:todos} = useQuery({
        queryKey:['todoList', `${numQuery}`],
        queryFn:async ()=>{
            const {data} = await axiosInstaceAuth.get('http://localhost:1337/api/todos')  //'/users/me?populate=todos'
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
        try
        {
            await axiosInstaceAuth.put(`/todos/${selectedTodo?.id}`, {
                data:{
                title:selectedTodo.title,
                discription:selectedTodo.discription
            }
            })

            successToast("Updated sucessfully")
            setNumQuery(numQuery+1)

        }catch(e)
        {   
            const error = e as AxiosError<IErrorRespone>
            let msg:string = ""
            if(error.response?.data.error == undefined)
            {
                msg = error.response?.statusText as string
            }
            else{
                msg = error.response?.data.error.message as string 
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
            await axiosInstaceAuth.delete(`/todos/${selectedTodo.id}`)
            successToast("deleted sucessfully")

        }catch(e)
        {   
            const error = e as AxiosError<IErrorRespone>
            let msg:string = ""
            if(error.response?.data.error == undefined)
            {
                msg = error.response?.statusText as string
            }
            else{
                msg = error.response?.data.error.message as string 
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
            <tr className="odd:bg-white even:bg-gray-100" key={currTodo.id}>
                <td className="border border-gray-300 text-center">{num++}</td>
                <td className="border border-gray-300 px-4 py-2">{currTodo.title}</td>
                <td className="border border-gray-300 text-center">
                    <Button className="bg-indigo-600 hover:bg-indigo-300 my-2" onClick={()=>onUpdateTodoBtn(currTodo)}>Update</Button>
                    <Button className="bg-neutral-700 text-white ms-2 hover:bg-neutral-300 my-2" onClick={()=>onRemoveTodoBtn(currTodo)}>Remove</Button>
                </td>
            </tr>
    ))

    return(
        <>
            <table className="w-full mx-auto table-auto border-collapse border border-gray-300">
            <thead>
                <tr className="bg-gray-200">
                    <th style={{width:"5%"}} className="border border-gray-300 text-center">#id</th>
                    <th style={{width:"70%"}} className="border border-gray-300 px-4 py-2">Title</th>
                    <th style={{width:"fit-content"}} className="border border-gray-300 px-4 py-2">{(children)?children:""}</th>
                </tr>
            </thead>
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

                <textarea name="discription" onChange={onChangeHandler} placeholder="Discription" value={selectedTodo?.discription}  className="w-full p-2 my-3 h-30  border-2 rounded-lg resize-none focus:outline-none focus:border-indigo-600"></textarea>

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
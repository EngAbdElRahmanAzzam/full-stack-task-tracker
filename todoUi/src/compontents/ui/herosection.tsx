import { ChangeEvent, useState } from "react"
import Input from "../common/input"
import Model from "../common/model"
import Button from "../common/button"
import Loader from "../common/loader"
import { ITodo } from "../../interfaces/todo"
import { axiosInstaceAuth } from "../../config/axios.config"
import { errorToast, successToast } from "../../utils/toasts"
import { AxiosError } from "axios"
import { IErrorRespone } from "../../interfaces/api"
import { stringValidation } from "../../utils/validation"
import {faker} from '@faker-js/faker'
import Error from "../common/error"
import SelectList from "../common/selectList"


interface IProps{
    numQuery:number;
    setNumQuery:(val:number)=>void
}

const HeroSection = ({numQuery, setNumQuery}:IProps)=>{
    // states
    const [numTodo, setNumTodo] = useState<number>(5)
    const [isOpenModel, setIsOpenModel] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [todoForm, setTodoForm] = useState<ITodo>({
        title:"",
        description:"",
        status : false
    })
    const [msgTitle, setMsgTitle] = useState<string|boolean>("")
    const [msgDisctipion, setMsgDisctipion] = useState<string|boolean>("")

    //handlers
    const toggleAddModel = ()=> setIsOpenModel(prev => !prev)
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setTodoForm({...todoForm,[e.target.name]:e.target.value})
    const resetTodo = ()=>{
        setTodoForm({
            title:"",
            description:"",
            status:false
        })
        setMsgDisctipion("")
        setMsgTitle("")
    }
    
    const onOpenAddModel = ()=>{
        resetTodo()
        toggleAddModel()
    }


    const onSubmitForm = async()=>{
        setMsgTitle(stringValidation(todoForm.title, 5, 50))
        setMsgDisctipion(stringValidation(todoForm.description, 5, 500))
        if(msgDisctipion === true && true === true)
        { 
            setIsLoading(true)
            try{
                console.log({...todoForm, status:false})
                await axiosInstaceAuth.post(`/todos`, {
                
                    title:todoForm.title,
                    description:todoForm.description,
                    status:false
                })
                {
                    successToast('Succesufully Adding todo')
                    setNumQuery(numQuery+1)
                }
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
                errorToast(`Failed Adding Todo ${msg}`)
            }finally{
                setIsLoading(false)
                toggleAddModel()
            }
        }
    }


    const generateTodos = async()=>{
        let index:number = numTodo 
        for(; index; index--)
        {
            try{
                await axiosInstaceAuth.post(`/todos`, {
                
                    title:faker.word.words(4),
                    description:faker.book.series()+faker.word.words(20),
                    status:false
                })
                
            successToast('Succesufully Adding todo')
            }catch(e)
            {   
                const error = e as AxiosError<IErrorRespone>
                let msg:string = ""
                msg = error.message
                errorToast(`Failed Adding Todo ${msg}`)
            }
        }
        setNumQuery(numQuery+1)
    }


    return( 
    <>
        <section className="text-black">
            <div className="mx-auto max-w-screen-xl h-screen px-4 py-32 lg:flex lg:items-center">
                <div className="mx-auto max-w-3xl text-center">
                <h1
                    className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl"
                >
                    What Do You Think Now?
                </h1>

                <div className="mt-8 flex flex-wrap justify-center gap-4">
                    <Button
                    onClick={onOpenAddModel}
                    className="block w-full rounded border border-indigo-600 bg-white px-12 py-3 text-sm font-medium text-indigo-600  hover:text-white hover:bg-indigo-600 focus:outline-none active:scale-95 sm:w-auto"
                    >
                    Add Todo
                    </Button>

                    <Button
                    onClick={generateTodos}
                    className="block w-full rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none active:scale-95 sm:w-auto"
                    >
                    Generate Todos
                    </Button>
                    
                    <SelectList value={numTodo} onChange={(e)=>{setNumTodo(+e.target.value)}}>
                        <option>5</option>
                        <option>10</option>
                        <option>50</option>
                        <option>100</option>
                    </SelectList>
                </div>
                </div>
            </div>
        </section>
        <Model title="Add New Todo" isOpenModel={isOpenModel} closeModel={toggleAddModel}>
            <Input 
                name="title"
                value={todoForm.title} 
                onChange={onChangeHandler} 
                className="focus:border-indigo-600" 
            > 
                    Title
            </Input>
            {(msgTitle!=true)?<Error msg={msgTitle as string}/>:""}
            <textarea 
                name="description"
                value={todoForm.description} 
                onChange={onChangeHandler}   
                placeholder="Discription" 
                className="w-full p-2 my-3 h-30  border-2 rounded-lg resize-none focus:outline-none focus:border-indigo-600"
            />
            {(msgDisctipion!=true)?<Error msg={msgDisctipion as string}/>:""}
            <Button className="bg-indigo-600 hover:bg-indigo-300" 
                onClick={onSubmitForm} 
                disabled={isLoading}
            >
                    {(isLoading)?<Loader/>:"Add"}
            </Button>

            <Button className="bg-neutral-700 text-white hover:bg-neutral-300 ms-2" onClick={toggleAddModel}>Cancel</Button>
        </Model>
    </>
    )
}

export default HeroSection
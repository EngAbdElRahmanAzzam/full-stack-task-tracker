import TaskIcon from "../assets/icons/taskIcon"
import CompletedTaskIcon from "../assets/icons/completedTaskIcon"
import UnCompletedTaskIcon from "../assets/icons/uncompletedIcon"
import Button from "../compontents/common/button"
import Model from "../compontents/common/model"
import Loader from "../compontents/common/loader"
import { useEffect, useState  } from "react"
import { axiosInstaceAuth } from "../services/axios.config"
import { errorToast, successToast } from "../utils/toasts"
import { AxiosError } from "axios"
import { IErrorRespone, ITaskStatus } from "../interfaces/api"
import { getCredentials } from "../utils/localStorage"
import { getAllTaskStatus } from "../services/task"
import { colors } from "../data/styles"

type TMsgWarning = "Account" | "Tasks" | ""

const ProfilePage = () => {

    const user = getCredentials()
    //states 
    const [msgWarning , setMsgWarning] = useState<TMsgWarning>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isOpenModel, setIsOpenModel] = useState<boolean>(false)
    const [tasksStatus, setTasksStatus] = useState<ITaskStatus>({tasks:'',complete:''})

    // handlesr
    const toggleModel = ()=> setIsOpenModel((prev) => !prev)

    const onClickOpenModelBtn = (msg:TMsgWarning)=>{
        setMsgWarning(msg)
        toggleModel()
    }

    const onClickDeleteBtn = async (resoursUrl:string)=>{
        let url:string =""
        setIsLoading(true)
        if(resoursUrl=="Account"){
           url = `users/${user.user._id}`
        }
        else{
            url = "/todos"
        }

        try
        {
            await axiosInstaceAuth.delete(url)
            successToast("Updated sucessfully")
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
            setIsLoading(false)
        }
    }
    //life cycle effects

    useEffect(
        ()=>{
            const fetchStatus = async () => {
                const data = await getAllTaskStatus()
                setTasksStatus(data)
            }

            fetchStatus()
        }
        ,[])

    return (
        <div className="pt-24">
            <div className="max-w-2xl pt-8 mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto border shadow-2xl rounded-lg">
                
                <div className="mx-auto w-32 h-32 rounded-full overflow-hidden">
                    <img className="object-cover object-center h-32" src='/profile.jpg' alt='prolife avatar'/>
                </div>
                
                <div className="text-center mt-2">
                    <h2 className="font-semibold">
                        {`${user.user.firstName}  ${user.user.lastName}`}
                    </h2>

                    <p className="text-gray-500">
                        {user.user.email}
                    </p>
                </div>

                <ul className="w-7/12 py-4 mt-2 mx-auto text-neutral-700 flex items-center justify-around">

                    <li className="flex flex-col items-center justify-around">
                        <TaskIcon className="w-7"/>
                        <div className={`font-extrabold`}>{tasksStatus.tasks}</div>
                    </li>

                    <li className="flex flex-col items-center justify-between">
                        <CompletedTaskIcon className={`size-11 ${colors.mainColorText} translate-y-2`}/>
                        <div className="font-extrabold">{tasksStatus.complete}</div>
                    </li>

                    <li className="flex flex-col items-center justify-around">
                        <UnCompletedTaskIcon className="w-7"/>
                        <div className="font-extrabold">{+tasksStatus?.tasks - +tasksStatus?.complete}</div>
                    </li>

                </ul>

                <div className="py-2 flex justify-center gap-1 border-t-2 border-t-slate-700">
                    <Button className="bg-red-600 hover:bg-red-800 my-2" onClick={()=>onClickOpenModelBtn("Account")}>Delete Account</Button>
                    <Button className="bg-neutral-700 text-white ms-2 hover:bg-neutral-300 my-2" onClick={()=>onClickOpenModelBtn("Tasks")}>Reset All Tasks</Button>
                </div>
            </div>

            {/*general models for delete account and delete all tasks */}
            <Model isOpenModel={isOpenModel} closeModel={toggleModel} title={msgWarning+"Deleting"}>
                <p className="mb-2">
                    Are you sure to delete {msgWarning} to do?
                </p>

                <Button className="bg-red-600 hover:bg-red-300" onClick={()=>onClickDeleteBtn(msgWarning)} disabled={isLoading}>{isLoading?<Loader/>:"Remove"}</Button>
                <Button className="bg-neutral-700 text-white hover:bg-neutral-300 ms-2" onClick={toggleModel}>Cancel</Button>
            </Model>
        </div>
  )
}
  
  export default ProfilePage
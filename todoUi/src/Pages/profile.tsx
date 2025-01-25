import TaskIcon from "../assets/icons/taskIcon"
import CompletedTaskIcon from "../assets/icons/completedTaskIcon"
import UnCompletedTaskIcon from "../assets/icons/uncompletedIcon"
import Button from "../compontents/common/button"
import Model from "../compontents/common/model"
import Loader from "../compontents/common/loader"
import { useState } from "react"

const ProfilePage = () => {
    const user = JSON.parse(localStorage?.getItem('user') || "")
    //states 
    const [isLoadingUpdate, setIsLoadingUpdate] = useState<boolean>(false)
    const [isOpenUpdateModel, setIsOpenUpdateModel] = useState<boolean>(false)
    const [isOpenDeleteModel, setIsOpenDeleteModel] = useState<boolean>(false)
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
                    <p className="text-gray-500">abdelrahmanazzam@gmail.com</p>
                </div>

                <ul className="w-7/12 py-4 mt-2 mx-auto text-neutral-700 flex items-center justify-around">
                    <li className="flex flex-col items-center justify-around">
                        <TaskIcon className="w-7"/>
                        <div>2k</div>
                    </li>
                    <li className="flex flex-col items-center justify-between">
                        <CompletedTaskIcon/>
                        <div>10k</div>
                    </li>
                    <li className="flex flex-col items-center justify-around">
                        <UnCompletedTaskIcon className="w-7"/>
                        <div>15</div>
                    </li>
                </ul>

                <div className="py-2 flex justify-center gap-1 border-t-2 border-t-slate-700">
                    <Button className="bg-red-600 hover:bg-red-800 my-2">Delete Account</Button>
                    <Button className="bg-neutral-700 text-white ms-2 hover:bg-neutral-300 my-2">Reset All Todos</Button>
                </div>
            </div>
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
        </div>
  )
}
  
  export default ProfilePage
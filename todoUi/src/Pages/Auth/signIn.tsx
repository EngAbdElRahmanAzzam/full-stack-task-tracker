import { SIGNIN_FORM } from "../../data/signIn"
import Input from "../../compontents/common/input"
import  Loader  from "../../compontents/common/loader";
import {useState} from 'react'
import { styles } from "../../data/styles";
import { useForm , SubmitHandler}from "react-hook-form";
import { ISignInForm } from "../../interfaces/auth";
import { axiosInstace } from "../../config/axios.config";
import { AxiosError} from "axios";
import { IErrorRespone } from "../../interfaces/api";
import { errorToast, successToast } from "../../utils/toasts";

const stylesSignin = {
  mainColor:"indigo-600",
  inputWidth:styles.inputWidth,
  toastStyle:{
    backgroundColor:"#4f46e5",
    color:"#ffffff",
    padding:"5px 10px",
    width:"fit-content"
  }

}

const SignInPage = () => {
   // states
   const {handleSubmit, register} = useForm<ISignInForm>()
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [isHidePassword, setIsHidePassword] = useState<boolean>(false)
  //handlers
  const onSubmit:SubmitHandler<ISignInForm> = async (dataForm)=>{
    setIsLoading(true)
    setIsDisabled(true)
    try{
          const {data} = await axiosInstace.post("/users/sign-in", dataForm)
          if(data.status == "success")
          {
            successToast("Success Registering and Wellcome to our platform",stylesSignin.toastStyle)
            localStorage.setItem('user', JSON.stringify(data.data))
            location.replace('/')
          }
      }catch(e){
          const error = e as AxiosError<IErrorRespone>
          let msg:string = ""
          if(!error.response?.data.message != undefined)
          {
              msg = error.response?.data.message as string 
          }
          errorToast(`Failed login ${msg}`, {...stylesSignin.toastStyle, color:"red"})
          setIsDisabled(false)
      }finally{
          setIsLoading(false)
      }
  }

  //renders 
  const signInFormList = SIGNIN_FORM.map((currInput, index)=>(
    <Input className={`focus:border-indigo-600`}  key={index} {...register(currInput.name)} type={currInput.name}>
          {currInput.label}
    </Input>
  ))

  return (
    <div>
        <div className="md:w-4/6 my-12 pt-14  mx-auto shadow-2xl">
          <h2 className="font-semibold text-2xl  text-indigo-600 text-center">
                Wellcome back to Progress Tracker Platform
          </h2>

          <div className="flex flex-col lg:flex-row items-center ">

            <div className="w-1/2">
                <img className="block mx-auto" src="/signin.jpg"/>
            </div>

            <form  onSubmit={handleSubmit(onSubmit)} className="h-signin w-1/2  text-gray-600 p-5 lg:my-20 flex flex-col gap-2 justify-center items-center">

                {signInFormList}

                <button disabled={isDisabled} className={`bg-indigo-600 text-white w-${stylesSignin.inputWidth} py-2 mt-3 disabled:cursor-not-allowed disabled:opacity-30`}>
                  {isLoading?<Loader />:"Sign in"}
                </button>

            </form>
          </div>
        </div>
      </div>
  )
  }
  
  export default SignInPage
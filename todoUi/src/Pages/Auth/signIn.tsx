import { SIGNIN_FORM } from "../../data/signIn"
import Input from "../../compontents/common/input"
import  Loader  from "../../compontents/common/loader";
import {useState} from 'react'
import { styles } from "../../data/styles";
import { useForm , SubmitHandler}from "react-hook-form";
import { ISignInForm } from "../../interfaces/auth";
import { axiosInstace } from "../../config/axios.config";
import { toast } from "react-hot-toast";
import { AxiosError} from "axios";
import { IErrorRespone } from "../../interfaces/api";

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
  const {handleSubmit, register} = useForm<ISignInForm>()
   // states
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [isDisabled, setIsDisabled] = useState<boolean>(false);

  //handlers
  const onSubmit:SubmitHandler<ISignInForm> = async (data)=>{
    setIsLoading(true)
    setIsDisabled(true)
    try{
      const {data:resData} = await axiosInstace.post("/auth/local", data)
      toast.success("Success Registering and Wellcome to our platform",
              {
                position:"top-right",
                duration:1000,
                style:stylesSignin.toastStyle
              }
          )
          
          localStorage.setItem('user', JSON.stringify(resData))

          location.replace('/')
      
    }catch(e){
      const error = e as AxiosError<IErrorRespone>
      let msg:string = ""
      if(error.response?.data.error == undefined)
      {
          msg = error.response?.statusText as string
      }
      else{
          msg = error.response?.data.error.message as string 
      }
      toast.error(`Failed login ${msg}`,
              {
                position:"top-right",
                duration:4000,
                style:{...stylesSignin.toastStyle, color:"red"}
              }
          )
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
        <div className="w-4/6 my-20 mx-auto flex items-center shadow-2xl">

          <div className="w-1/2 h-signin">
              <img className="h-signin block mx-auto" src="/signin.jpg"/>
          </div>

          <form  onSubmit={handleSubmit(onSubmit)} className="h-signin w-1/2  text-gray-600 p-5 my-20 flex flex-col gap-2 justify-center items-center">

              <h2 className="font-semibold text-xl mb-2 text-indigo-600">
                Wellcome back to Progress Tracker Platform
              </h2>

              {signInFormList}

              <button disabled={isDisabled} className={`bg-indigo-600 text-white w-${stylesSignin.inputWidth} py-2 mt-3 disabled:cursor-not-allowed disabled:opacity-30`}>
                {isLoading?<Loader />:"Sign in"}
              </button>

          </form>

        </div>
      </div>
  )
  }
  
  export default SignInPage
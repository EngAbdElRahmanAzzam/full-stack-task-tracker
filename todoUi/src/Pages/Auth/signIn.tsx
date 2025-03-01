import Input, { InputFormPassword } from "../../compontents/common/input"
import  Loader  from "../../compontents/common/loader";
import { useForm , SubmitHandler}from "react-hook-form";
import { axiosInstace } from "../../services/axios.config";
import { AxiosError} from "axios";
import { IErrorRespone } from "../../interfaces/api";
import { errorToast, successToast } from "../../utils/toasts";
import { TSignInForm, signInSchema } from "../../validation/signInSchema";
import { zodResolver } from "@hookform/resolvers/zod"
import { colors, dimentions, toastsStyle } from "../../data/styles";


const SignInPage = () => {
    // states
    const {handleSubmit, register , reset,formState:{errors,isSubmitting}} = useForm<TSignInForm>({resolver:zodResolver(signInSchema)})

    //handlers
    const onSubmit:SubmitHandler<TSignInForm> = async (dataForm)=>{
      try{
            const {data} = await axiosInstace.post("/users/sign-in", dataForm)
            if(data.status == "success")
            {
              successToast("Success Registering and Wellcome to our platform",toastsStyle.signInStyle)
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
            errorToast(`Failed login ${msg}`, {...toastsStyle.signInStyle, color:"red"})
        }
        reset()
    }

    return (
      <div>

          <div className="md:w-4/6 my-12 pt-14  mx-auto shadow-2xl">

              {/* title at sign in form -> at imge and form */}
              <h2 className={`font-semibold text-2xl ${colors.mainColorText} ${dimentions.containerPMd} text-center`}>
                    Wellcome back to Progress Tasks Platform
              </h2>

              <div className="flex flex-col lg:flex-row items-center ">

                <div className="w-1/2">
                    <img className="block mx-auto" src="/signin.jpg"/>
                </div>

                <form  onSubmit={handleSubmit(onSubmit)} className="h-signin w-1/2  text-gray-600 p-5 lg:my-20 flex flex-col gap-2 justify-center items-center">

                    <Input 
                      id="email"
                      type="email"
                      placeholder="Please Enter Your Email"
                      register={register("email")}
                      error={errors.email}
                    >
                      E-mail
                    </Input>

                    <InputFormPassword
                      id="repeatPassword"
                      placeholder="Confirm Password" 
                      register={register("password")}
                      error={errors.password}
                    >
                      Password
                    </InputFormPassword>

                    <button disabled={isSubmitting} className={`${colors.mainColorBg} ${dimentions.fieldFormW} text-white py-2 mt-3 disabled:cursor-not-allowed disabled:opacity-30`}>
                      {isSubmitting?<Loader />:"Sign in"}
                    </button>

                </form>
              </div>
          </div>

        </div>
    )
  }
  
  export default SignInPage
import Input, { InputFormPassword } from "../../compontents/authUi/input"
import  Loader  from "../../compontents/common/loader";
import { useForm , SubmitHandler}from "react-hook-form";
import { axiosInstace } from "../../services/axios.config";
import { AxiosError} from "axios";
import { IErrorRespone } from "../../interfaces/api";
import { errorToast, successToast } from "../../utils/toasts";
import { TSignInForm, signInSchema } from "../../validation/signInSchema";
import { zodResolver } from "@hookform/resolvers/zod"
import { colors, dimentions, toastsStyle } from "../../data/styles";
import { routes } from "../../services"; 
import TitleAuth from "../../compontents/authUi/titleAuth";
import FormAuth from "../../compontents/authUi/formAuth";



const SignInPage = () => {
    // states
    const {handleSubmit, register , reset,formState:{errors,isSubmitting}} = useForm<TSignInForm>({resolver:zodResolver(signInSchema)})

    //handlers
    const onSubmit:SubmitHandler<TSignInForm> = async (dataForm)=>{
      try{
            const {data} = await axiosInstace.post(routes.signIn, dataForm)
            if(data.status == "success")
            {
              successToast("Success Registering and Wellcome to our platform",toastsStyle.signInStyle)
              localStorage.setItem('user', JSON.stringify(data.data))
              location.replace('/')
            }
        }catch(e){
            const error = e as AxiosError<IErrorRespone>
            let msg:string = ""
            if(!error.response?.data.message)
            {
                msg = error.response?.data.message as string 
            }
            errorToast(`Failed login ${msg}`, {...toastsStyle.signInStyle, color:"red"})
        }
        reset()
    }

    return (
      <div>

          <div className="min-h-[92vh] pt-10 mx-auto shadow-2xl md:w-4/6 md:min-h-fit md:my-10">
              <TitleAuth>
                Wellcome back to Progress Tasks Platform
              </TitleAuth>

              <div className="flex flex-col lg:flex-row items-center ">

                <div>
                    <img className="block mx-auto" src="/signin.jpg"/>
                </div>

                <FormAuth onSubmit={handleSubmit(onSubmit)}>

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
                      id="password"
                      placeholder="Password" 
                      register={register("password")}
                      error={errors.password}
                    >
                      Password
                    </InputFormPassword>

                    <button 
                      disabled={isSubmitting} 
                      className={`${colors.mainColorBg} ${dimentions.fieldFormW} ${colors.color2Text} py-2 mt-3 disabled:cursor-not-allowed disabled:opacity-30`}
                    >
                      {isSubmitting?<Loader />:"Sign in"}
                    </button>

                  </FormAuth>
              </div>
          </div>

        </div>
    )
  }
  
  export default SignInPage
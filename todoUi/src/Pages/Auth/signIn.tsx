import Input, { InputFormPassword } from "../../compontents/authUi/input"
import { useForm , SubmitHandler}from "react-hook-form";
import { axiosInstace } from "../../services/axios.config";
import { AxiosError} from "axios";
import { IErrorRespone } from "../../interfaces/api";
import { errorToast, successToast } from "../../utils/toasts";
import { TSignInForm, signInSchema } from "../../validation/signInSchema";
import { zodResolver } from "@hookform/resolvers/zod"
import { routes } from "../../services"; 
import TitleAuth from "../../compontents/authUi/titleAuth";
import Form from "../../compontents/authUi/formAuth";
import FormBtn from "../../compontents/authUi/button";
import { storeCredentials } from "../../utils/localStorage";



const SignInPage = () => {
    // states
    const {handleSubmit, register , reset,formState:{errors,isSubmitting}} = useForm<TSignInForm>({resolver:zodResolver(signInSchema)})

    //handlers
    const onSubmit:SubmitHandler<TSignInForm> = async (dataForm)=>{
      try{
          const {data} = await axiosInstace.post(routes.signIn, dataForm)
            successToast("Success Logging in and Wellcome back")
            storeCredentials(data)
            location.replace('/')
        }catch(e){
            const error = e as AxiosError<IErrorRespone>
            let errorMsg = error.response?.data.message
            if(!errorMsg)
            {
              errorMsg = "Bad request"
            }
            errorToast(`${errorMsg}! and try again`)
        }
        reset()
    }

    return (
      <>
        <TitleAuth>
          Wellcome back to Taskitify Progress Tasks Platform
        </TitleAuth>

        <div className="flex flex-col lg:flex-row items-center">

          <div>
              <img className="block mx-auto" src="/signin.jpg"/>
          </div>

          <Form onSubmit={handleSubmit(onSubmit)}>

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

              <FormBtn isSubmitting={isSubmitting}>
                  Sign In
              </FormBtn>
            </Form>
        </div>
        </>
    )
  }
  
  export default SignInPage
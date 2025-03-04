import { useForm , SubmitHandler } from "react-hook-form"
import Input, { InputFormPassword } from "../../compontents/authUi/input"
import { TSignUpForm, signUpSchema } from "../../validation/signUpSchema"
import { SIGNUP_FORM } from "../../data/signUp"
import { axiosInstace } from "../../services/axios.config"
import { AxiosError } from "axios"
import { IErrorRespone } from "../../interfaces/api"
import { zodResolver } from "@hookform/resolvers/zod"
import { Fragment } from "react/jsx-runtime"
import TitleAuth from "../../compontents/authUi/titleAuth"
import FormAuth from "../../compontents/authUi/formAuth"
import FormBtn from "../../compontents/authUi/button"
import { routes } from "../../services"
import { errorToast, successToast } from "../../utils/toasts"
import { storeCredentials } from "../../utils/localStorage"


const SignUpPage = () => {
  const {register, handleSubmit, reset,formState:{ errors, isSubmitting } }= useForm<TSignUpForm>({resolver:zodResolver(signUpSchema)})

  // handlers
  const onSubmit:SubmitHandler<TSignUpForm> =async (formData)=>  {
    const { re_password, ...requestData } = formData;
    try{
      const {data} = await axiosInstace.post(routes.signUp, requestData)
        successToast("Success Registering and Wellcome to our platform")
        storeCredentials(data)
        location.replace('/')

    }catch(e)
    {
      const error = e as AxiosError<IErrorRespone>
      let errorMsg = error.response?.data.message
      if(!errorMsg)
      {
        errorMsg = "Uncatched Error"
      }
      errorToast(`${errorMsg}!!! and try again`)
    }
    reset()
  }

  //render
  const signUpFormList = SIGNUP_FORM.map((input, index)=>(

    <Fragment key={index}>
      <Input 
        id={input.name}
        type={input.type}
        placeholder={input.placeholder} 
        register={register(input.name)}
        error={errors[input.name]}
      >
        {input.label}
      </Input>
    </Fragment>

  ))

  return(
        <>
            {/* title at sign up form -> at imge and form */}
            <TitleAuth>
              Wellcome to Taskitify Progress Tracker Platform
            </TitleAuth>

            <div className="flex flex-col lg:flex-row items-center ">

              <FormAuth onSubmit={handleSubmit(onSubmit)}>
                  {signUpFormList} 
                  <InputFormPassword
                    id="password"
                    placeholder="Enter Password  must 8-80" 
                    register={register("password")}
                    error={errors.password}
                  >
                  Password
                  </InputFormPassword>

                  <InputFormPassword
                    id="repeatPassword"
                    placeholder="Confirm Password" 
                    register={register("re_password")}
                    error={errors.re_password}
                  >
                  Repeat Password
                  </InputFormPassword>

                  <FormBtn isSubmitting={isSubmitting}>
                  Sign Up
                  </FormBtn>
                </FormAuth>

                <div className="order-first md:order-last">
                  <img className="block mx-auto" src="/signup.jpg"/>
                </div>
            </div>
        </> 
  )

}

export default SignUpPage



  
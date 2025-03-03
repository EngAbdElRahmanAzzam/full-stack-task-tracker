import { useForm , SubmitHandler } from "react-hook-form"
import Input, { InputFormPassword } from "../../compontents/authUi/input"
import { TSignUpForm, signUpSchema } from "../../validation/signUpSchema"
import { colors, dimentions, toastsStyle } from "../../data/styles"
import { SIGNUP_FORM } from "../../data/signUp"
import { axiosInstace } from "../../services/axios.config"
import { toast } from "react-hot-toast"
import  Loader  from "../../compontents/common/loader"
import { AxiosError } from "axios"
import { IErrorRespone } from "../../interfaces/api"
import { zodResolver } from "@hookform/resolvers/zod"
import { Fragment } from "react/jsx-runtime"
import TitleAuth from "../../compontents/authUi/titleAuth"




const SignUpPage = () => {
const {register, handleSubmit, formState:{ errors, isSubmitting } }= useForm<TSignUpForm>({resolver:zodResolver(signUpSchema)})

// handlers
const onSubmit:SubmitHandler<TSignUpForm> =async (data)=>  {
  const requestBody = {
    firstName:data.firstName,
    lastName: data.lastName,
    email: data.email,
    mobile:data.phone,
    password: data.password
  } 
  try{
    const {data:resData} = await axiosInstace.post('users/sign-up', requestBody)
      toast.success("Success Registering and Wellcome to our platform",
          {
            position:"top-right",
            duration:1000,
            style:toastsStyle.signUpStyle.style
          }
      )
      localStorage.setItem('user', JSON.stringify(resData.data))
      location.replace('/')

  }catch(e)
  {
    const error = e as AxiosError<IErrorRespone>
    let errorMsg = error.response?.data.message
    if(!errorMsg)
    {
      errorMsg = "Bad request"
    }
    toast.error(`${error.response?.data.message} !!! and try again`,
          {
            position:"top-right",
            duration:4000,
            style:toastsStyle.signUpStyle.style
          }
      )
  }

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

return (
        <div>
          <div className="sm:min-h-[92vh] pt-10 mx-auto shadow-2xl md:w-4/6 md:min-h-fit md:my-10">

            {/* title at sign up form -> at imge and form */}
            <TitleAuth>
              Wellcome to Progress Tracker Platform
            </TitleAuth>

            <div className="flex flex-col lg:flex-row items-center ">

                <form  onSubmit={handleSubmit(onSubmit)} className="w-1/2  text-gray-600 p-5 lg:my-20 flex flex-col gap-2 justify-center items-center">
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

                  <button 
                    disabled={isSubmitting} 
                    className={`${colors.mainColorBg} ${dimentions.fieldFormW} text-white py-2 mt-3 disabled:cursor-not-allowed disabled:opacity-30`}
                  >
                    {isSubmitting?<Loader />:"Sign up"}
                  </button>
                </form>

                <div>
                  <img className="block mx-auto" src="/signup.jpg"/>
                </div>
            </div>
          </div>
        </div> 
  )

}

export default SignUpPage



  
import { useForm , SubmitHandler } from "react-hook-form"
import Input, { InputFormPassword } from "../../compontents/common/input"
import { TSignUpForm, signUpSchema } from "../../validation/signUpSchema"
import { styles } from "../../data/styles"
import { SIGNUP_FORM } from "../../data/signUp"
import { axiosInstace } from "../../services/axios.config"
import { toast } from "react-hot-toast"
import  Loader  from "../../compontents/common/loader"
import { AxiosError } from "axios"
import { IErrorRespone } from "../../interfaces/api"
import { zodResolver } from "@hookform/resolvers/zod"
import { Fragment } from "react/jsx-runtime"


const signUpStyles = {
  style:{
    backgroundColor:"#fca5a5",
    color:"#f1f5f9",
    padding:"5px 10px",
    width:"fit-content"
  }
}

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
                style:signUpStyles.style
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
                style:signUpStyles.style
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
            <div className="bg-[#d8dde3] w-fit min-h-[500] pr-16 md:my-20 mx-auto shadow-2xl flex flex-col lg:flex-row items-center">

              <form className="w-fit h-full py-4 px-16 mx-auto flex flex-col gap-2 justify-center items-center" onSubmit={handleSubmit(onSubmit)}>

                  <h2 className="font-semibold text-2xl  text-red-300 text-center">
                    Wellcome to Progress Tracker Platform
                  </h2>

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

                  <button className={`bg-${styles.mainColor} bg-red-300 w-${styles.inputWidth} py-2 mt-3 disabled:cursor-not-allowed disabled:opacity-30`} disabled={isSubmitting}>
                    {isSubmitting?<Loader />:"Sign up"}
                  </button>

              </form>

              <img className="block h-full object-cover" src="/signup.jpg"/>

            </div>
      </div>
        
    )
    
  }
  
  export default SignUpPage



  
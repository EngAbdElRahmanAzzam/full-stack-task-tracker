import { useForm , SubmitHandler } from "react-hook-form"
import Input from "../../compontents/common/input"
import { TSignUpForm, signUpSchema } from "../../validation/signUpSchema"
import { styles } from "../../data/styles"
import { SIGNUP_FORM } from "../../data/signUp"
import { axiosInstace } from "../../config/axios.config"
import { toast } from "react-hot-toast"
import  Loader  from "../../compontents/common/loader"
import { AxiosError } from "axios"
import { IErrorRespone } from "../../interfaces/api"
import { zodResolver } from "@hookform/resolvers/zod"


const signUpStyles = {
  style:{
    backgroundColor:"#fca5a5",
    color:"#f1f5f9",
    padding:"5px 10px",
    width:"fit-content"
  }
}

const SignUpPage = () => {
    const {register, handleSubmit, formState:
      {
        errors,
        isSubmitting
      }}                                            = useForm<TSignUpForm>({resolver:zodResolver(signUpSchema)})

    // handlers
    const onSubmit:SubmitHandler<TSignUpForm> =async (data)=>  {
      try{
        const {data:resData} = await axiosInstace.post('auth/local/register', data)
          toast.success("Success Registering and Wellcome to our platform",
              {
                position:"top-right",
                duration:1000,
                style:signUpStyles.style
              }
          )
        localStorage.setItem('user', JSON.stringify(resData));
        location.replace('/')

      }catch(e)
      {
        const error = e as AxiosError<IErrorRespone>
        toast.error(`Error ${error.status}!!! ${error.response?.data.message} and try again`,
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
      <>

        <Input key={index}
        id={input.name}
        type={input.type}
        placeholder={input.placeholder} 
        register={register(input.name)}
        error={errors[input.name]}
        >
          {input.label}
        </Input>

        {/* {errors?[currInput.name]&&} */}
      </>
    ))

    return (
      <div>
          <div className="w-4/6 mx-auto flex sm:flex-col lg:flex-row items-center">

            <form className="h-signup w-1/2 bg-slate-100 p-5 my-20 flex flex-col gap-2 justify-center items-center" onSubmit={handleSubmit(onSubmit)}>

                <h2>
                  Wellcome to Progress Tracker Platform
                </h2>

                {signUpFormList}

                <div className="flex gap-2">
                  <input type="radio" className={`accent-${styles.mainColor} cursor-pointer`} id="terms" required/>
                  <label htmlFor="terms" className="cursor-pointer">
                      I Agree with all terms
                  </label>
                </div>  

                <button className={`bg-${styles.mainColor} bg-red-300 w-${styles.inputWidth} py-2 mt-3 disabled:cursor-not-allowed disabled:opacity-30`} disabled={isSubmitting}>
                  {isSubmitting?<Loader />:"Sign up"}
                </button>

            </form>

            <img className="w-1/2 h-signup" src="/signup.jpg"/>

          </div>
        </div>
    )
    
  }
  
  export default SignUpPage
import { ISignUpInput } from "../interfaces/auth";

export const SIGNUP_FORM:ISignUpInput[] = [
    {
        name:"firstName",
        label:"FirstName",
        validators:{
            required:"User name is required",
            minLength:3,
            maxLength:50
        }
    }
    ,
    {
        name:"lastName",
        label:"LastName",
        validators:{
            required:"User name is required",
            minLength:3,
            maxLength:50
        } 
    }
    ,
    {
        name:"email",
        label:"E-mail",
        validators:{
            required:"User email is required",
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        } 
    }
    ,
    {
        name:"password",
        type:"password",
        label:"password",
        validators:{
            required:"User password is required",
            minLength:10,
            maxLength:50
        }
    }
    
]
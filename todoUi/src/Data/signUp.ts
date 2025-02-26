import { ISignUpInput } from "../interfaces/auth";

export const SIGNUP_FORM:ISignUpInput[] = [
    {
        name:"firstName",
        label:"First Name",
        type:"text",
        placeholder:"Enter Your First Name must 4-50",
    }
    ,
    {
        name:"lastName",
        label:"Last Name",
        type:"text",
        placeholder:"Enter Your Last Name must 4-50",
    }
    ,
    {
        name:"email",
        label:"E-mail",
        type:"email",
        placeholder:"Enter Your E-mail",
    }
    ,
    {
        name:"password",
        label:"Password",
        type:"password",
        placeholder:"Enter Password  must 8-80",
    }
    ,
    {
        name:"re_password",
        label:"Confirm Password",
        type:"password",
        placeholder:"Please confirm Password",
    }
    
]
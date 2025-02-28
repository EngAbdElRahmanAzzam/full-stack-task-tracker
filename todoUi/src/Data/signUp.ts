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
        name:"phone",
        label:"phone",
        type:"tel",
        placeholder:"Enter Phone  12 digit",
    }
    
]
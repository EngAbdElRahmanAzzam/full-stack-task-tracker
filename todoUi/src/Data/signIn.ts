import { ISignInInput } from "../interfaces/auth";


export const SIGNIN_FORM:ISignInInput[] = [
    {
        name:"identifier",
        label:"Email",
    }
    ,
    {
        name:"password",
        label:"Password",
        type:"password"
    }
]
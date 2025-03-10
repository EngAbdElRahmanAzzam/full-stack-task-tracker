import { TSignInForm } from "../validation/signInSchema";
import { TSignUpForm } from "../validation/signUpSchema";

interface IFormInput{
    label:string;
    type:string;
    placeholder:string;
}

export interface ISignUpInput extends IFormInput{
    name:keyof TSignUpForm;
}

export interface ISignInInput extends IFormInput{
    name:keyof TSignInForm;
}
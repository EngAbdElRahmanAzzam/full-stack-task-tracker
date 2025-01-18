interface IFormInput{
    label:string;
    type?:string;
    validators?:{
        required?:string;
        min?:number;
        max?:number;
        minLength?:number;
        maxLength?:number;
        pattern?:RegExp;
    }
}

export interface ISignUpForm{
    username:string;
    email:string;
    password:string;
}

export interface ISignInForm{
    email:string;
    password:string;
}

export interface ISignUpInput extends IFormInput{
    name:keyof ISignUpForm;
}

export interface ISignInInput extends IFormInput{
    name:keyof ISignInForm;
}
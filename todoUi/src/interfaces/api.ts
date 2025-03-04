import { IUserModel } from "./models";

export interface IErrorRespone {
    message:string
}

export interface IAuthRsponse {
    status:string;
    data:{
        token:string;
        user:IUserModel;
    }
}
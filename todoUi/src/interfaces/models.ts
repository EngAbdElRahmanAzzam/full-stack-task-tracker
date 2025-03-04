export interface ITodo{
    _id?:number;
    title:string;
    description:string;
    status:boolean;
    deadline?:Date;
    achieved_at?:Date;
}

export interface IUserModel{
    _id: string,
    firstName: string,
    lastName: string,
    fullName: string,
    email: string,
    mobile: string,
    avatar: string
}
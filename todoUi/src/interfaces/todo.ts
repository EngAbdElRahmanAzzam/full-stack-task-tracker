export interface ITodo{
    _id?:number;
    title:string;
    description:string;
    status:boolean;
    deadline?:Date;
    achieved_at?:Date;
}
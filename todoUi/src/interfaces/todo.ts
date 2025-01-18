export interface ITodo{
    _id?:number;
    title:string;
    description:string;
    deadline?:Date;
    achieved_at?:Date;
}
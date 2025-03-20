import { routes } from ".";
import { ITaskModel } from "../interfaces/models";
import { axiosInstaceAuth } from "./axios.config"

export const getAllTaskStatus= async () => {
    const {data} = await axiosInstaceAuth.get(`${routes.tasks}?limit=100000`)
    return data.data.status
} 

export const fetchRecentAddedTasks = async () => {
    const {data} = await axiosInstaceAuth.get(`${routes.tasks}?sort=add&limit=10`)
    return data.data.todos;
};

export const fetchRecentUpdatedTasks= async () => {
    const { data } = await axiosInstaceAuth.get(`${routes.tasks}?sort=update&limit=10`);
    return data.data.todos;
};

export const fetchTasks = async (limit:number = 10, page:number=1, ascSort:boolean = true, lastDays?:number) => {
    let sort = ''
    let days = ''
    if(ascSort)
        sort = '&order=desc'
    if(lastDays)
        days = `&days=${lastDays}`

    const { data } = await axiosInstaceAuth.get(`${routes.tasks}?page=${page}&limit=${limit}`+sort+days);
    return data.data.todos;
};

export const createTask = async (task:ITaskModel) => {
    const { data } = await axiosInstaceAuth.post(`${routes.tasks}`, task);
    return data.data.todos;
};
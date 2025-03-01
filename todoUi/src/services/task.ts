import { axiosInstaceAuth } from "./axios.config"

export const getAllTasks = async (queryParams:string = "") => {
    const {data} = await axiosInstaceAuth.get(`/todos?${queryParams}`)
    return data.data.todos
} 

export const fetchRecentAddedTodos = async () => {
    const {data} = await axiosInstaceAuth.get(`/todos?sort=add&limit=10}`)
    return data.data.todos;
};

export const fetchRecentUpdatedTodos = async () => {
    const { data } = await axiosInstaceAuth.get('/todos?sort=update&limit=10');
    return data.data.todos;
};


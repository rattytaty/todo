import axios from "axios";


export type TodolistType = {
    id: string
    title: string
}
export type TaskType = {
    id: string
    title: string
    description: string
    deadline: string
    completed: boolean
}
export type DataForTask = {
    title: string
    description: string
    deadline:string
    completed: boolean
}

export const instance = axios.create({
    baseURL: "https://64492e4eb88a78a8f00022cf.mockapi.io/"
})
export const todolistsApi = {
    getTodolists() {
        return instance.get<TodolistType[]>("todolists")
    },
    createTodolist(title: string) {
        return instance.post<TodolistType>("todolists", {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<TodolistType>(`todolists/${todolistId}`)
    },
    updateTodolist(todolistId: string, data: { title: string }) {
        return instance.put(`todolists/${todolistId}`, data)
    },
}
export const tasksApi = {
    getTasks(todolistId: string) {
        return instance.get<TaskType[]>(`todolists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, data: DataForTask) {
        const {title, description, deadline} = data
        return instance.post<TaskType>(`todolists/${todolistId}/tasks`, {title, description, deadline})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<TaskType>(`todolists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, data: DataForTask) {
        return instance.put<TaskType>(`todolists/${todolistId}/tasks/${taskId}`, data)
    }
}






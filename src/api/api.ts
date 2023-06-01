import axios from "axios";


export type Todolist = {
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
export type DataForCreationTask = {
    title: string
    description: string
    date: string
    time: string
}
export type DataForUpdateTask = {
    title?: string
    description?: string
    deadline?: string
    completed?: boolean
}

export const instance = axios.create({
    baseURL: "https://64492e4eb88a78a8f00022cf.mockapi.io/"
})
export const todolistsApi = {
    getTodolists() {
        return instance.get<Todolist[]>("todolists")
    },
    createTodolist(title: string) {
        return instance.post<Todolist>("todolists", {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<Todolist>(`todolists/${todolistId}`)
    },
    updateTodolist(todolistId: string, data: { title: string }) {
        return instance.put(`todolists/${todolistId}`, data)
    },
}
export const tasksApi = {
    getTasks(todolistId: string) {
        return instance.get<TaskType[]>(`todolists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, data: DataForCreationTask) {
        const {title, description, date, time} = data
        return instance.post<TaskType>(`todolists/${todolistId}/tasks`, {title, description, deadline: `${date}T${time}`})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<TaskType>(`todolists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, data: DataForUpdateTask) {

        return instance.put<TaskType>(`todolists/${todolistId}/tasks/${taskId}`, data)
    }
}






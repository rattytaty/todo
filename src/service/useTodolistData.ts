import {useQuery} from "@tanstack/react-query";
import {tasksApi} from "./api";


export const useTodolistData = (todoId:string)=>{
    const {data: tasks} = useQuery({
        queryFn: () => tasksApi.getTasks(todoId)
            .then(res => res.data),
        queryKey: ["tasks", todoId]
    })
    return tasks
}
import React from 'react';
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {DataForTask, tasksApi, TaskType} from "../../api/api";
import {useParams} from "react-router-dom";
import {todolistParams} from "../Pages/Todolist";

export const TaskStatus = (props:{completed:boolean}) => {

    /*const {todoId, taskId} = useParams<keyof todolistParams>() as todolistParams
    const queryClient = useQueryClient()
    const {mutate: editTask} = useMutation({
        mutationFn: (data: DataForTask) => tasksApi.updateTask(todoId, taskId!, data),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ["tasks", todoId]})
    })
    const task = useQuery<TaskType[]>(["tasks", todoId]).data?.find(task => task.id === taskId)!
    const {
        title,
        description,
        deadline,
        completed,
        subtasks
    } = task*/

    return <div className="flex items-center text-info cursor-pointer"
    onClick={()=>{}}>
        <div className={`bg-error h-4 w-4 rounded-xl mb-1 mr-2 ${props.completed?"bg-success":"bg-error"}`}></div>
        <div>{props.completed?"Completed":"Not completed"}</div>
    </div>
}

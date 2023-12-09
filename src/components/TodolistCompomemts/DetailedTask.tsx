import React, {useState} from 'react';
import {tasksApi, TaskType} from "../../service/api";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useNavigate, useParams} from "react-router-dom";
import {todolistParams} from "../Pages/Todolist";
import {TaskForm} from './TaskForm';
import {TaskInfo} from "./TaskInfo";
import {Button} from "../UniversalComponents/Button";


export const DetailedTask = () => {

    const navigate = useNavigate()
    const {todoId, taskId} = useParams<keyof todolistParams>() as todolistParams
    const task = useQuery<TaskType[]>(["tasks", todoId]).data!.find(task => task.id === taskId)!

    const queryClient = useQueryClient()
    const {mutate: deleteTask} = useMutation({
        mutationFn: () => tasksApi.deleteTask(todoId, taskId!),
        onSuccess: () => {
            navigate(`/todos/${todoId}`)
            queryClient.invalidateQueries({queryKey: ["tasks", todoId]})
        }
    })
    const [editMode, setEditMode] = useState(false)

    return <div className="relative">
        {editMode
            ? <TaskForm data={{
                task: task,
                setEditMode: setEditMode
            }}/>
            : <div>
               <TaskInfo/>
                <div className="flex justify-between items-center">
                    <Button onClick={() => setEditMode(true)}
                            className="lg:absolute lg:bottom-0 lg:left-0">Edit this Task</Button>
                    <Button variant="red"
                            className="lg:absolute lg:bottom-0 lg:right-0"
                            onClick={() => deleteTask()}>Delete this Task</Button>
                </div>
            </div>}
    </div>
};

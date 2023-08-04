import React, {useState} from 'react';
import {tasksApi, TaskType} from "../../api/api";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useNavigate, useParams} from "react-router-dom";
import {todolistParams} from "../Pages/Todolist";
import {TaskForm} from './TaskForm';
import {TaskInfo} from "./TaskInfo";


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

    /*const [date, time] = props.deadline.split("T")
    const convertedDate = date.split("-").reverse().join("-").replaceAll("-", ".")
    const convertedTime = time.slice(0, 5)*/

    return <div className="relative">

        <div>{editMode
            ? <TaskForm data={{
                task: task,
                setEditMode: setEditMode

            }}/>
            : <div>
                <TaskInfo />

                <button onClick={() => setEditMode(true)}
                        className="btn  block btn-outline btn-sm  text-neutral hover:bg-neutral hover:text-white absolute bottom-0  left-0">Edit
                    this Task
                </button>
                <button
                    className="btn  btn-outline border-error btn-sm  text-neutral hover:bg-error hover:text-neutral absolute bottom-0  right-0"
                    onClick={() => deleteTask()}
                >Delete this Task
                </button>
            </div>}
        </div>


    </div>
};

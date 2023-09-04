import React from 'react';
import {TaskType} from "../../api/api";
import {useQuery} from "@tanstack/react-query";
import {useParams} from "react-router-dom";
import {todolistParams} from "../Pages/Todolist";
import {TaskStatus} from "./TaskStatus";
import {Deadline} from "./Deadline";
import {Subtasks} from "./Subtasks";

export const TaskInfo: React.FC = React.memo(() => {

    const {todoId, taskId} = useParams<keyof todolistParams>() as todolistParams
    const task = useQuery<TaskType[]>(["tasks", todoId]).data?.find(task => task.id === taskId)!
    const {
        title,
        description,
        deadline,
        completed,
        subtasks
    } = task


    return <div className="m-2.5">
        <h1 className="text-neutral text-2xl font-semibold">Task:</h1>
        <h1 className="text-neutral text-lg">{title}</h1>
        <h1 className="text-neutral text-lg">{description ? "Description:" : "No description."}</h1>
        <div className="text-info m-2">{description}</div>
        <h1 className="text-neutral text-lg">Deadline:</h1>
        <div className="m-2">
            <Deadline deadline={deadline} long/>
        </div>
        <div className=" text-lg">
            <Subtasks subtasks={subtasks} long/>
        </div>


        <h1 className="text-neutral text-lg">Status:</h1>
        <div className=" m-2">
             <TaskStatus completed={completed}/>
        </div>


        </div>
})

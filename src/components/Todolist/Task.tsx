import React, {ChangeEvent, useState} from "react";
import {EditTaskForm} from "./EditTask";
import {TaskDeadline} from "./TaskDeadline";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {DataForUpdateTask, tasksApi} from "../../api/api";

export type TaskProps = {
    todolistId: string
    description: string
    deadline: string
    taskId: string
    completed: boolean
    title: string
}


export const Task: React.FC<TaskProps> = React.memo((props) => {

    const client = useQueryClient()
    const {mutate:changeCompletedStatusTask, isLoading} = useMutation({
        mutationFn:(data:DataForUpdateTask)=> tasksApi.updateTask(props.todolistId, props.taskId, data),
        onSuccess:()=>
            client.invalidateQueries({queryKey:["tasks", props.todolistId]})
    })
    const {mutate:deleteTask} = useMutation({
        mutationFn:()=> tasksApi.deleteTask(props.todolistId, props.taskId),
        onSuccess:()=> client.invalidateQueries({queryKey:["tasks", props.todolistId]})
    })

    const [editMode, setEditMode] = useState(false)

    return <div key={props.taskId}
                className={" rounded-md  text-black  bg-blue-50 m-1 w-72  relative"}>
        <div title={"Task title"}
             className={"m-1 text-black text-center text-xl"}>{props.title}</div>
        <div title={"Task description"}
             className={"m-1 text-gray-600 w-72 break-all"}>{props.description}</div>
        <TaskDeadline deadline={props.deadline}/>
        <EditTaskForm description={props.description}
                      title={props.title}
                      isPopUpActive={editMode}
                      setIsPopUpActive={setEditMode}
                      todolistId={props.todolistId}
                      taskId={props.taskId}/>
        <button disabled={isLoading}
                onClick={() => {setEditMode(true)}}
                className="btn m-1 btn-xs btn-primary">Edit
        </button>
        <button disabled={isLoading}
                title={"Delete task"}
                className="mr-3 absolute right-0 top-0"
                onClick={() => deleteTask()}>x
        </button>
        <div className="m-1.5 form-control absolute right-0 bottom-0">
            <input disabled={isLoading}
                   title={"Change status"}
                   type="checkbox"
                   checked={props.completed}
                   onChange={(e: ChangeEvent<HTMLInputElement>)=>changeCompletedStatusTask({completed: e.currentTarget.checked})}
                   className="checkbox checkbox-sm checkbox-success"/>
        </div>
    </div>

})
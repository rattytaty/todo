import React, {ChangeEvent, useEffect, useState} from "react";
import {Task} from "./Task";

import {AddNewTaskForm} from "./AddNewTask";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {tasksApi, TaskType, todolistsApi} from "../../api/api";
import {filterValues} from "../../Pages/TodolistPage";

export type TodolistProps = {
    todolistTitle: string
    todolistId: string
}

export const TodolistComponent: React.FC<TodolistProps> = React.memo((props) => {

    const {data, isLoading} =  useQuery({
        queryFn: () =>  tasksApi.getTasks(props.todolistId).then((res)=>res.data),
        queryKey: ["tasks", props.todolistId]
    })

    const client = useQueryClient()
    const {mutate:deleteTodolist} = useMutation({
        mutationFn:(todolistId:string)=> {
            return todolistsApi.deleteTodolist(todolistId)
        },
        onSuccess:()=>{
            client.invalidateQueries({queryKey:["todolists"]})
        }
    })




    const [searchValue, setSearchValue] = useState<string>("")
    const [isPopUpActive, setIsPopUpActive] = useState<boolean>(false)
    const [todolistFilter, setTodolistFilter] = useState<filterValues>("All")

    useEffect(()=>{
        const  filter   = localStorage.getItem(props.todolistId)
        filter? setTodolistFilter(filter as filterValues):setTodolistFilter("All")
    },[])
    useEffect(()=>{
        localStorage.setItem(props.todolistId, todolistFilter)
    },[todolistFilter])


    const sortedTasks:Array<TaskType> =  data?
          data.filter(({completed}) => {
            if (todolistFilter === "Active") return completed === false;
            else if (todolistFilter === "Completed") return completed === true;
            return true;
        })
            .filter((task) => task.title.toLowerCase().includes(searchValue.toLowerCase()))
        : []
    const tasksForRendering = sortedTasks.length
        ?sortedTasks.map((t) =>
            <Task key={t.id}
                  taskId={t.id}
                  title={t.title}
                  completed={t.completed}
                  description={t.description}
                  deadline={t.deadline}
                  todolistId={props.todolistId}
            />)
        :<div className={"flex justify-center  text-black text-xl"}>No tasks</div>


    const changeTodolistFilter = (filterValue: filterValues) => () => {
        setTodolistFilter(filterValue)
    }
    const onChangeSearchValue = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.currentTarget.value)
    }

    return <div className={"m-2.5 rounded-md bg-gray-400  float-left relative  overflow-x-scroll w-76"}>
        <AddNewTaskForm
            todolistId={props.todolistId}
            isPopUpActive={isPopUpActive}
            setIsPopUpActive={setIsPopUpActive}/>
        <div title={"Todolist title"}
             className={"m-2 text-black text-center text-3xl font-semibold"}>{props.todolistTitle}
        </div>
        <div className={"flex justify-center"}>
            <button disabled={isLoading}
                    onClick={() => {setIsPopUpActive(true)}}
                    className="btn btn-outline btn-primary w-60 btn-sm ">Add a new Task
            </button>
        </div>
        <button disabled={isLoading}
                className="btn btn-outline btn-circle btn-sm absolute right-0 top-0
         m-1"
                onClick={()=>deleteTodolist(props.todolistId)}>
            <svg xmlns="http://www.w3.org/2000/svg"
                 fill="none"
                 viewBox="0 0 24 24"
                 className="inline-block w-4 h-4 stroke-current ">
                <path className={"text-black"}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12">
                </path>
            </svg>
        </button>
        <div className={"text-black text-center text-2xl  font-medium"}>TASKS:
        </div>
        <div title={"Change filter"}
             className="m-1 flex justify-center btn-group btn-group-vertical lg:btn-group-horizontal  ">
            <button disabled={isLoading}
                    onClick={changeTodolistFilter("All")}
                    className={`btn btn-sm text-white btn-ghost ${todolistFilter === "All" ? "btn-active" : ""}`}>All
            </button>
            <button disabled={isLoading}
                    onClick={changeTodolistFilter("Active")}
                    className={`btn btn-sm text-white btn-ghost ${todolistFilter === "Active" ? "btn-active" : ""}`}>Active
            </button>
            <button disabled={isLoading}
                    onClick={changeTodolistFilter("Completed")}
                    className={`btn btn-sm text-white btn-ghost ${todolistFilter === "Completed" ? "btn-active" : ""}`}>Completed
            </button>
        </div>
        <div className={"flex justify-center"}>
            <input
                disabled={isLoading}
                type="text"
                placeholder={"Search by task title..."}
                className="bg-blue-50 input input-bordered input-sm m-1 w-72 "
                value={searchValue}
                onChange={onChangeSearchValue}/>
        </div>
        {tasksForRendering}
    </div>
})

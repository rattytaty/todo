import React, {ChangeEvent, useEffect, useState} from "react";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {Outlet, useNavigate, useParams} from "react-router-dom";
import {tasksApi, TaskType, todolistsApi} from "../../api/api";
import {EditableSpan} from "../Todo/EditableSpan";
import rightArrow from "../../assets/right-arrow.svg";

export type filterValues = "All" | "Active" | "Completed"

export type  todolistParams = {
    todoId: string
    taskId?:string
}


export const Todolist: React.FC = React.memo((props) => {

    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const {todoId} = useParams<keyof todolistParams>() as todolistParams

    const {data: tasks} = useQuery({
        queryFn: () => tasksApi.getTasks(todoId!)
            .then(res => res.data),
        queryKey: ["tasks", todoId],
        initialData:[]
    })


    const {mutate: deleteTodolist} = useMutation({
        mutationFn: (todolistId: string) =>
            todolistsApi.deleteTodolist(todolistId).then(() => navigate("/")),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["todolists"]})
            localStorage.removeItem(todoId)
        }
    })

    const [searchValue, setSearchValue] = useState<string>("")
    const [todolistFilter, setTodolistFilter] = useState<filterValues>("All")

    useEffect(() => {
        const filter = localStorage.getItem(todoId)
        filter ? setTodolistFilter(filter as filterValues) : setTodolistFilter("All")
    }, [todoId])
    useEffect(() => {
        localStorage.setItem(todoId, todolistFilter)
    }, [todoId, todolistFilter])



    const sortedTasks: Array<TaskType> = tasks ?
        tasks.filter(({completed}) => {
            if (todolistFilter === "Active") return completed === false;
            else if (todolistFilter === "Completed") return completed === true;
            return true;
        })
            .filter(task => task.title.toLowerCase().includes(searchValue.toLowerCase()))
        : []
    const tasksForRendering = sortedTasks.length
        ? sortedTasks.map(task =>
            <div onClick={()=>navigate(`task/${task.id}`)} key={task.id} className="m-5 ml-8 text-info text-xl
            flex items-center
            ">{task.title}

                <img className="h-4 inline ml-auto mr-2" alt="Expand info" src={rightArrow}></img>
            </div>)
        : <div className="text-neutral text-lg ">No tasks</div>

    const changeTodolistFilter = (filterValue: filterValues) => () => {
        setTodolistFilter(filterValue)
    }
    const onChangeSearchValue = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.currentTarget.value)
    }


    return <div className="grid grid-cols-2 grid-rows-1 relative">
        <div className="text-neutral relative">
            <EditableSpan />
            <div className="flex justify-center">

                <button
                    onClick={() => navigate("add")}
                    className="btn  block btn-outline btn-sm my-2 text-neutral hover:bg-accent hover:text-white">Add a new Task
                </button>
            </div>

            <h1 className="text-neutral text-lg ">Tasks:</h1>

            {tasks && tasks.length
                ?<div title={"Change filter"} className="join flex justify-center">
                <button className={`btn btn-outline btn-sm join-item 
                text-neutral border-warning hover:bg-warning
                ${todolistFilter === "All" ? " bg-warning" : ""} `}
                        onClick={changeTodolistFilter("All")}
                >All
                </button>
                <button className={`btn btn-outline  btn-sm join-item 
                text-neutral border-warning hover:bg-warning
                ${todolistFilter === "Active" ? " bg-warning" : ""}`}
                        onClick={changeTodolistFilter("Active")}
                >Active
                </button>
                <button className={`btn btn-outline btn-sm join-item 
                text-neutral border-warning hover:bg-warning
                ${todolistFilter === "Completed" ? " bg-warning" : ""}`}
                        onClick={changeTodolistFilter("Completed")}
                >Completed
                </button>
            </div>
                : null}
            <div className="overflow-scroll
             h-[450px]">{tasksForRendering}</div>

            <input type="text"
                   value={searchValue}
                   onChange={onChangeSearchValue}
                   placeholder="Search task..."
                   className="input input-bordered placeholder:text-sm text-lg
                    input-sm w-52 border-neutral-300
                   text-info absolute bottom-0 left-0"/>
            <button
                className="btn btn-outline border-error btn-sm  text-neutral hover:bg-error absolute bottom-0  right-1"
                onClick={() => deleteTodolist(todoId)}>Delete this Todo
            </button>

        </div>
        <Outlet/>
    </div>
})



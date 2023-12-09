import React, {ChangeEvent, useEffect, useState} from "react";
import {Outlet, useNavigate, useParams} from "react-router-dom";
import {TaskType} from "../../service/api";
import {EditableSpan} from "../TodolistCompomemts/EditableSpan";
import rightArrow from "../../assets/right-arrow.svg";
import {TaskStatus} from "../TodolistCompomemts/TaskStatus";
import {Deadline} from "../TodolistCompomemts/Deadline";
import {Subtasks} from "../TodolistCompomemts/Subtasks";
import {Button} from "../UniversalComponents/Button";
import {InputField} from "../UniversalComponents/InputField";
import {PopUpComponent} from "../UniversalComponents/PopUpComponent";
import {DeleteTodolistModal} from "../TodolistCompomemts/DeleteTodolistModal";
import {useTodolistData} from "../../service/useTodolistData";

export type filterValues = "All" | "Active" | "Completed"

export type  todolistParams = {
    todoId: string
    taskId?: string
}


export const Todolist: React.FC = React.memo(() => {

    const navigate = useNavigate()
    const {todoId} = useParams<keyof todolistParams>() as todolistParams

    const tasks = useTodolistData(todoId!)

    const [searchValue, setSearchValue] = useState<string>("")
    const [todolistFilter, setTodolistFilter] = useState<filterValues>("All")

    useEffect(() => {
        const filter = localStorage.getItem(todoId)
        filter && filter !== todolistFilter && setTodolistFilter(filter as filterValues)
    }, [todoId])
    useEffect(() => {
        localStorage.setItem(todoId, todolistFilter)
    }, [todoId, todolistFilter])

    const [selectedTask, setSelectedTask] = useState<string>("")
    const sortedTasks: TaskType[] = tasks ?
        tasks.filter(({completed}) => {
            if (todolistFilter === "Active") return completed === false;
            else if (todolistFilter === "Completed") return completed === true;
            return true;
        })
            .filter(task => task.title.toLowerCase().includes(searchValue.toLowerCase()))
        : []

    const tasksForRendering = sortedTasks.length
        ? sortedTasks.map(task =>
            <div key={task.id} onClick={() => {
                navigate(`task/${task.id}`)
                setSelectedTask(task.id)
            }}
                 className={`${selectedTask === task.id ? "ml-10 mr-3.5" : ""} my-5 mx-6 text-info text-xl p-2 rounded-lg shadow-[0_3px_6px_rgba(0,0,0,0.16),0_3px_6px_rgba(0,0,0,0.23)] transition-[all_0.3s_cubic-bezier(.25,.8,.25,1)] hover:shadow-[0_14px_28px_rgba(0,0,0,0.25),0_10px_10px_rgba(0,0,0,0.22)] bg-accent`}>

                <div className="flex items-center justify-between">
                    <span>{task.title}</span>
                    <img className="h-4"
                         alt="Expand info"
                         src={rightArrow}></img>
                </div>

                <div className="flex items-center justify-between text-base mx-3 ">
                    <TaskStatus completed={task.completed}/>
                    <Subtasks subtasks={task.subtasks}/>
                    <Deadline deadline={task.deadline}/>
                </div>

            </div>)
        : <div className="text-neutral text-lg ">No tasks!</div>

    const changeTodolistFilter = (filterValue: filterValues) => () => {
        setTodolistFilter(filterValue)
    }
    const onChangeSearchValue = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.currentTarget.value)
    }

    const [modalActive, setModalActive] = useState(false)

    const FilterButton = (filter:filterValues)=><Button variant="yellow"
                                     onClick={changeTodolistFilter(filter)} className={`join-item ${todolistFilter === filter ? " bg-warning" : ""}` }>{filter}</Button>

    return <div className="grid grid-rows-1 lg:grid-cols-2 lg:grid-rows-1 relative ">
        <div className="text-neutral relative">
            <EditableSpan/>
            <div className="flex justify-center">
                <Button onClick={() => navigate("add")}
                        className="my-2">Add a new Task</Button>
            </div>
            <h1 className="text-neutral text-lg ">Tasks:</h1>
            {tasks?.length
                ?<div title={"Change filter"} className="join flex justify-center">
                    {FilterButton("All")}
                    {FilterButton("Active")}
                    {FilterButton("Completed")}
                </div>
                : null}
            <div className="overflow-y-auto">{tasksForRendering}</div>
            <div className="flex justify-between items-center">
                <InputField type="text"
                             value={searchValue}
                             onChange={onChangeSearchValue}
                             placeholder="Search task..."
                             className="lg:absolute lg:bottom-0 lg:left-0"/>
                <Button variant="red"
                        onClick={() => setModalActive(true)}
                        className="lg:absolute lg:bottom-0 lg:right-1"
                >Delete this Todo</Button></div>
            <PopUpComponent isPopUpActive={modalActive}>
                <DeleteTodolistModal setModalActive={setModalActive}/>
            </PopUpComponent>
        </div>
        <Outlet/>
    </div>
})
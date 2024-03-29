import React, {ChangeEvent, useEffect, useState} from 'react';
import {NavLink, useLocation, useNavigate, useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {todolistsApi} from "../../service/api";
import {AddTodolist} from "./AddTodolist";
import {DarkModeSwitcher} from "./DarkModeSwitcher";
import todolistIcon from "../../assets/todolistIcon.svg";
import {todolistParams} from "../Pages/Todolist";
import {InputField} from "../UniversalComponents/InputField";

export const SideBar: React.FC = React.memo(() => {

    const navigate = useNavigate()
    const {data: todolists} = useQuery({
        queryFn: () => todolistsApi.getTodolists().then(res => res.data),
        queryKey: ["todolists"],
        initialData: []
    })
    const [selectedTodo, setSelectedTodo] = useState<string>("")
    const location = useLocation()
    const {todoId} = useParams<keyof todolistParams>() as todolistParams
    useEffect(() => {
        if (location.pathname.includes("/todos/")) {
            setSelectedTodo(todoId)
        }
    }, [location.pathname, todoId])
    const [searchValue, setSearchValue] = useState<string>("")
    const onChangeSearchValue = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.currentTarget.value)
    }
    const filteredTodos = todolists?.filter(todo => todo.title.toLowerCase().includes(searchValue.toLowerCase()))

    return <div className="drawer lg:drawer-open z-40">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle"/>
        <div className="drawer-content h-6">
            <label htmlFor="my-drawer-2" className=" lg:hidden">
                <img className="inline cursor-pointer mb-1" alt="Todo Icon" src={todolistIcon}></img>
            </label>
        </div>
        <div className="drawer-side h-full ">
            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
            <div className="p-6 lg:p-0 w-60 h-full bg-base-100 overflow-y-auto relative">
                <button onClick={() => navigate("/")} className="text-neutral block text-2xl font-semibold mb-2"
                        title="Home">Home
                </button>

                <InputField type="text"
                            placeholder="Search todo..."
                            value={searchValue}
                            onChange={onChangeSearchValue}
                />
                <h1 className="text-neutral text-lg mt-2">Todolists:</h1>
                <div className="">
                    {filteredTodos.length
                        ? filteredTodos.map(todolist => <NavLink
                            onClick={() => setSelectedTodo(todolist.id)}
                            className={`link link-hover block  text-info m-2.5 
                ${todolist.id === selectedTodo ? "font-semibold ml-5" : ""}
                `}
                            to={`/todos/${todolist.id}`}
                            key={todolist.id}>
                            <img className="inline mb-1" alt="Todo Icon" src={todolistIcon}></img>
                            {todolist.title}</NavLink>
                        )
                        : <div className="text-neutral text-lg">No todolists.</div>
                    }
                    <div className="absolute bottom-0">
                        <DarkModeSwitcher/>
                        <AddTodolist setSelectedTodo={setSelectedTodo}/>
                    </div>
                </div>
            </div>

        </div>
    </div>


})


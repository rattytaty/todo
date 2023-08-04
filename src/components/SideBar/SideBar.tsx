import React, {useEffect, useState} from 'react';
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {todolistsApi} from "../../api/api";
import {AddTodolist} from "./AddTodolist";
import {DarkModeSwitcher} from "./DarkModeSwitcher";
import todolistIcon from "../../assets/todolistIcon.svg";

export const SideBar: React.FC = React.memo(() => {
    const navigate = useNavigate()
    const {data} = useQuery({
        queryFn: () => todolistsApi.getTodolists().then(res => res.data),
        queryKey: ["todolists"],
        initialData:[]
    })
    const [selectedTodo, setSelectedTodo] = useState<string>("")

    const location = useLocation()

    useEffect(()=>{
        if(!location.pathname.includes("/todos/")){
            setSelectedTodo("")
        }
    },[location.pathname])

    return <div className="overflow-scroll relative">
        <button onClick={() => navigate("/")} className="text-neutral block text-2xl font-semibold" title="Home">Home</button>
        <input type="text"
               placeholder="Search todo..."
               className="input placeholder:text-sm text-lg input-bordered
                    input-sm w-52 m-2.5 border-neutral-300
                   text-info "/>
        <h1 className="text-neutral text-lg">Todos:</h1>
        <div>
            {data?.map(todolist => <NavLink
                onClick={()=>setSelectedTodo(todolist.id)}
                className={`link link-hover block  text-info m-2.5 
                ${todolist.id ===selectedTodo?"font-semibold ml-5":""}
                `}
                to={`/todos/${todolist.id}`}
                key={todolist.id}>
                <img  className="inline mb-1" alt="Todo Icon" src={todolistIcon}></img>
                {todolist.title}</NavLink>
            )}
            <div className=" absolute bottom-0">
                <DarkModeSwitcher/>
                <AddTodolist setSelectedTodo={setSelectedTodo}/>
            </div>
        </div>
    </div>
})


import React, {useEffect, useState} from 'react';
import editIcon from "../../assets/editIcon.svg";
import {useQuery} from "@tanstack/react-query";
import {TodolistType} from "../../api/api";
import {useParams} from "react-router-dom";
import {todolistParams} from "./Todolist";
import {EditTitle} from "./EditTitle";


export const EditableSpan: React.FC = React.memo(() => {

    const {todoId} = useParams<keyof todolistParams>() as todolistParams
    const todoTitle = useQuery<TodolistType[]>({queryKey: ["todolists"]}).data?.find(todo => todo.id === todoId)!.title!

    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(todoTitle)

    useEffect(() => {
        if (todoTitle) {
            setTitle(todoTitle)
        }
    }, [todoTitle])



    return <div className="relative">{editMode
        ? <EditTitle title={title} setEditMode={setEditMode}/>
        : <div className="relative">
                <h1 className="text-neutral text-2xl font-semibold inline">{title}</h1>
            <button onClick={()=>setEditMode(true)} className="absolute right-2 bottom-2 ">
                <img alt="Edit Todo title" src={editIcon}></img>
            </button>
        </div>
    }</div>
});

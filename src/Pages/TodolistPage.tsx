import React from "react";
import {TodolistComponent} from "../components/Todolist/TodolistComponent";
import {useQuery} from "@tanstack/react-query";
import {todolistsApi} from "../api/api";
import NavBar from "../components/NavBar";
import {AppStatus} from "../components/AppStatusComponents/AppStatus";
export type filterValues = "All" | "Active" | "Completed"



export const TodolistsPage: React.FC = React.memo(() => {


    const { data, isSuccess, isLoading} = useQuery({
        queryFn: () => todolistsApi.getTodolists().then((res) => res.data),
        queryKey: ["todolists"]
    })


    return <div className={"bg-gray-200 min-h-screen"}>
        <NavBar/>
        <div className={" table-cell overflow-y-scroll "}>
            {isSuccess && data.map((todolist) =>
                <TodolistComponent key={todolist.id}
                                   todolistId={todolist.id}
                                   todolistTitle={todolist.title}
                />
            )}
        </div>
        <AppStatus isLoading={isLoading}/>
    </div>
})
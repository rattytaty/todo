import React from 'react';
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {todolistsApi} from "../api/api";
import {AddItemForm} from "./AddItemForm";

const NavBar = () => {

    const client = useQueryClient()

    const {mutate: createTodolist} = useMutation({
        mutationFn: (todolistTitle: string) => {
            return todolistsApi.createTodolist(todolistTitle)
        },
        onSuccess: () => {
            client.invalidateQueries({queryKey: ["todolists"]})
        }
    })
    return (
        <div className="navbar bg-neutral">
            <div className="flex-1"><AddItemForm addItem={createTodolist}/></div>
            <div className="flex-none">
            </div>
        </div>
    );
};

export default NavBar;
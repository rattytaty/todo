import React from 'react';
import {Button} from "../UniversalComponents/Button";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {todolistsApi} from "../../service/api";
import {useNavigate, useParams} from "react-router-dom";
import {todolistParams} from "../Pages/Todolist";

export const DeleteTodolistModal = (props: { setModalActive: (value: boolean) => void }) => {

    const navigate = useNavigate()
    const {todoId} = useParams<keyof todolistParams>() as todolistParams
    const queryClient = useQueryClient()
    const {mutate: deleteTodolist} = useMutation({
        mutationFn: (todolistId: string) =>
            todolistsApi.deleteTodolist(todolistId).then(() => navigate("/")),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["todolists"]})
            localStorage.removeItem(todoId)
        }
    })

    return <div className="bg-base-100 rounded-3xl text-3xl p-8">
        <h1> Are You sure You want to delete this todolist?</h1>
        <div className="flex justify-between px-10 mt-10">
            <Button variant="red"
                    onClick={() => {
                        deleteTodolist(todoId)
                        props.setModalActive(false)
                    }}>Yes</Button>
            <Button onClick={() => {
                props.setModalActive(false)
            }}>No</Button></div>
    </div>
}
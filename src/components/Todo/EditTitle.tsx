import React from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";
import {string} from "yup";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useParams} from "react-router-dom";
import {todolistParams} from "../Pages/Todolist";
import {todolistsApi} from "../../api/api";

type EditTitleProps = {
    title: string
    setEditMode: (editMode: boolean) => void
}

export const EditTitle: React.FC<EditTitleProps> = React.memo(({title, setEditMode}) => {

    const queryClient = useQueryClient()
    const {todoId} = useParams<keyof todolistParams>() as todolistParams
    const {mutate: editTodolist} = useMutation({
        mutationFn: (title: string) =>
            todolistsApi.updateTodolist(todoId, {title}),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ["todolists"]})
    })
    const formik = useFormik({
        initialValues: {
            title: title
        },
        onSubmit: values => {
            editTodolist(values.title)
            setEditMode(false)
        },
        validationSchema: Yup.object({
            title: string()
                .max(25, 'Must be 25 characters or less')
                .required('Title required!'),
        })
    });
    const handleOnblur =
        formik.values.title
            ? () => formik.handleSubmit()
            : () => {
                editTodolist(title)
                setEditMode(false)
            }

    return <form onBlur={handleOnblur}
                 onSubmit={formik.handleSubmit}>
        <input type="text"
               autoFocus
               placeholder="Todo title..."
               className={`input input-bordered input-sm  border-neutral-300  
                       text-neutral text-2xl font-semibold inline -ml-4
                       placeholder ${formik.touched.title && formik.errors.title
                   ? "placeholder-error"
                   : ""}`} {...formik.getFieldProps("title")}/>
        <span className="text-error ">
                {formik.touched.title && formik.errors.title
                    ? formik.errors.title
                    : null}
        </span>
        <button type={"submit"}
                className="btn btn-sm btn-circle btn-outline text-neutral-700 border-neutral-300 hover:bg-neutral-300 hover:text-neutral-700 absolute right-2 bottom-0">+
        </button>
    </form>
})

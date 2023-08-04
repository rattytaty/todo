import React from 'react';
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {todolistsApi} from "../../api/api";
import {useFormik} from "formik";
import * as Yup from "yup";
import {string} from "yup";
import {useNavigate} from "react-router-dom";

type AddTodolistProps = {
    setSelectedTodo: (todoId: string) => void
}

export const AddTodolist = (props: AddTodolistProps) => {

    const navigate = useNavigate()
    const client = useQueryClient()
    const {mutate: createTodolist} = useMutation({
        mutationFn: (todolistTitle: string) =>
            todolistsApi.createTodolist(todolistTitle).then(res => res.data),
        onSuccess: (data, variables, context) => {
            client.invalidateQueries({queryKey: ["todolists"]}).then(
                () => {
                    props.setSelectedTodo(data.id)
                    navigate(`/todos/${data.id}`)
                }
            )
        }
    })

    const formik = useFormik({
        initialValues: {
            title: ""
        },
        onSubmit: values => {
            createTodolist(values.title)
            formik.resetForm()
        },
        validationSchema: Yup.object({
            title: string()
                .max(25, 'Must be 25 characters or less')
                .required('Title required!'),
        })
    });

    return <div>
        <form onSubmit={formik.handleSubmit}>
            <label className="label">
    <span className="text-red-500 label-text text-sm -mb-1">
   </span>
            </label>
            <input type="text"
                   placeholder={formik.touched.title && formik.errors.title
                       ? formik.errors.title
                       : "Add a new todo..."}
                   className={`input placeholder:text-sm text-lg input-bordered input-sm w-52 border-neutral-300  text-neutral-700 join-item placeholder ${formik.touched.title && formik.errors.title
                       ? "placeholder-error"
                       : ""}`} {...formik.getFieldProps("title")}
                   onBlur={() => formik.setErrors({})}
            />
            <button type={"submit"} className="btn btn-sm btn-circle btn-outline
            text-neutral-700 border-neutral-300 hover:bg-neutral-300 hover:text-neutral-700">+
            </button>
        </form>
    </div>
};

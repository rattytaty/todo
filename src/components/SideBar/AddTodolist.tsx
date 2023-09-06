import React from 'react';
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {todolistsApi} from "../../service/api";
import {useFormik} from "formik";
import * as Yup from "yup";
import {string} from "yup";
import {useNavigate} from "react-router-dom";
import {InputField} from "../UniversalComponents/InputField";

type AddTodolistProps = {
    setSelectedTodo: (todoId: string) => void
}

export const AddTodolist: React.FC<AddTodolistProps> = React.memo(({setSelectedTodo}) => {

    const navigate = useNavigate()
    const client = useQueryClient()
    const {mutate: createTodolist} = useMutation({
        mutationFn: (todolistTitle: string) =>
            todolistsApi.createTodolist(todolistTitle).then(res => res.data),
        onSuccess: (data) => {
            client.invalidateQueries({queryKey: ["todolists"]}).then(
                () => {
                    setSelectedTodo(data.id)
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

    return <form onSubmit={formik.handleSubmit}>
        <InputField type="text"
                    placeholder={formik.touched.title && formik.errors.title
                        ? formik.errors.title
                        : "Add a new todo..."}
                    className={`placeholder ${formik.touched.title && formik.errors.title
                        ? "placeholder-error"
                        : ""}`}
                    button
                    buttonType="submit"
                    {...formik.getFieldProps("title")}
                    onBlur={() => formik.setErrors({})}
        />
    </form>
})

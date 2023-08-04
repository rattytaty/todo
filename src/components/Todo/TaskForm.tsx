import React from 'react';
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {DataForTask, tasksApi} from "../../api/api";
import {useFormik} from "formik";
import * as Yup from "yup";
import {boolean, string} from "yup";
import {useNavigate, useParams} from "react-router-dom";
import {todolistParams} from "../Pages/Todolist";


type AddNewTaskFormProps = {
    data?:{
        task:DataForTask
        setEditMode:(editMode:boolean)=>void
    }
}
export const TaskForm: React.FC<AddNewTaskFormProps> = React.memo((props) => {

    const navigate = useNavigate()
    const {todoId, taskId} = useParams<keyof todolistParams>() as todolistParams
    const client = useQueryClient()
    const {mutate: createTask} = useMutation({
        mutationFn: (data: DataForTask) => tasksApi.createTask(todoId, data).then(res=>res.data),
        onSuccess: (data) => {
            client.invalidateQueries({queryKey: ["tasks", todoId]}).then(
                ()=>navigate(`/todos/${todoId}/task/${data.id}`)
            )
        }
    })
    const {mutate:editTask} = useMutation({
        mutationFn:(data:DataForTask)=> tasksApi.updateTask(todoId, taskId!,  data),
        onSuccess:()=> client.invalidateQueries({queryKey:["tasks", todoId]}).then(
            ()=> {
                props.data!.setEditMode(false)
                navigate(`/todos/${todoId}/task/${taskId}`)
            }
        )
    })

    const formik = useFormik({
        initialValues: {
            title: props.data?props.data.task.title:"",
            description:  props.data?props.data.task.description:"",
            deadline:  props.data?props.data.task.deadline:"",
            completed: props.data?props.data.task.completed:false,

        },
        onSubmit: values => {
if(props.data){
    editTask(values)
    formik.resetForm()
} else {
    createTask(values)
    formik.resetForm()
}

        },
        validationSchema: Yup.object({
            title: string()
                .max(25, 'Must be 25 characters or less!')
                .required('Title required!'),
            description: string()
                .max(750, 'Must be 750 characters or less!'),
            deadline: Yup.date()
                .min(new Date(), 'Please choose future date!')
                .required('Deadline is required!'),
            completed: boolean()
        })
    });


    return <div  >


        <h1 className="text-neutral text-2xl font-semibold">{props.data?"Edit task:":"Add new Task:"}</h1>
        <button
            className="btn btn-outline border-error btn-sm  text-neutral hover:bg-error hover:text-neutral absolute top-0  right-0"
            title="Cancel"
            onClick={() => {
                formik.resetForm()
                navigate(`/todos/${todoId}`)
            }}>x</button>
        <form onSubmit={formik.handleSubmit}>

            <div className="ml-2.5">
                <h1 className="text-neutral text-lg mt-2.5 ">Task title:</h1>
                <input type="text"
                       placeholder={formik.touched.title && formik.errors.title
                           ? formik.errors.title
                           : "Task title"}
                       className={`input input-bordered placeholder:text-sm text-lg input-sm m-2 block w-80 border-neutral-300 text-info join-item placeholder ${formik.touched.title && formik.errors.title
                           ? "placeholder-error"
                           : ""}`}
                       {...formik.getFieldProps("title")}
                       onBlur={() => formik.setErrors({})}
                />
            </div>
            <div className="ml-2.5">
                <span className="text-neutral text-lg  ">Task description:</span>
                <span
                    className="text-error ">{formik.touched.description && formik.errors.description
                    ? formik.errors.description
                    : null}
                            </span>
                <textarea className="textarea placeholder:text-sm text-lg textarea-bordered block border-neutral-300 m-2 h-44 w-80 text-info"
                          placeholder="Task description"
                          {...formik.getFieldProps("description")}
                          onBlur={() => formik.setErrors({})}
                />

            </div>
            <div className="ml-2.5">
                <span className="text-neutral text-lg  ">Task deadline:</span>
                <span
                    className="text-error ">{formik.touched.deadline && formik.errors.deadline
                    ? formik.errors.deadline
                    : null}</span>
                <input className="block bg-base-100 m-2 text-info " type={"datetime-local"} {...formik.getFieldProps("deadline")}
                       onBlur={() => formik.setErrors({})}
                />
            </div>
            <div className="ml-2.5 flex items-center">
                    {props.data
                        ?<><input type="checkbox" className="toggle toggle-success badge-neutral border-success"  {...formik.getFieldProps("completed")}/>
                        <div className="text-info">{formik.values.completed?"Task is completed":"Task is not completed"}</div></>
                        :null}
                </div>



            <button type={"submit"}
                    className="btn btn-outline btn-sm block text-neutral hover:bg-neutral hover:text-white absolute right-0 bottom-0">Save
            </button>
        </form>
    </div>
})





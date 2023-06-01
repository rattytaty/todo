import React from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {string} from "yup";
import {PopUpComponent} from "../PopUpComponent";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {DataForCreationTask, tasksApi} from "../../api/api";


export type AddNewTaskFormProps = {
    todolistId: string
    isPopUpActive: boolean
    setIsPopUpActive: (value: boolean) => void
    title: string
    description: string
    taskId: string
}


export const EditTaskForm: React.FC<AddNewTaskFormProps> = React.memo((props) => {

    const client = useQueryClient()
    const {mutate:editTask} = useMutation({
        mutationFn:(data:DataForCreationTask)=> tasksApi.updateTask(props.todolistId, props.taskId,  data),
        onSuccess:()=> client.invalidateQueries({queryKey:["tasks", props.todolistId]})
    })


    const formik = useFormik({
        initialValues: {
            title: props.title,
            description: props.description,
            date: "",
            time: ""
        },
        onSubmit: values => {
            editTask(values)
            formik.resetForm()
            props.setIsPopUpActive(false)
        },
        validationSchema: Yup.object({
            title: string()
                .max(25, 'Must be 25 characters or less')
                .required('Required'),
            description: string()
                .max(750, 'Must be 750 characters or less')
                .required('Required'),
            date: Yup.date()

                .min(new Date(), 'Please choose future date')
                .required('Required'),
            time: string()
                .required('Required')
        })
    });

    const onButtonCloseClick = () => {
        formik.resetForm()
        props.setIsPopUpActive(false)
    }
    return <div>
        <PopUpComponent setIsPopUpActive={props.setIsPopUpActive} isPopUpActive={props.isPopUpActive}>
            <div className={"w-80 "}>
                <button title={"Close"}
                        onClick={onButtonCloseClick}
                        className="btn -m-12 btn-circle btn-outline absolute top-0 right-0">
                    <svg xmlns="http://www.w3.org/2000/svg"
                         className="h-6 w-6"
                         fill="none"
                         viewBox="0 0 24 24"
                         stroke="currentColor">
                        <path strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
                <form onSubmit={formik.handleSubmit}>
                    <div className={"text-white text-2xl"}>Title:</div>
                    <div className={" "}><input type="text"
                                                placeholder={"Task title"}
                                                className="text-black  font-semibold input input-bordered input-primary w-full max-w-xs bg-blue-50" {...formik.getFieldProps("title")}/>
                        <label className="label"> <span
                            className="label-text-alt ">{formik.touched.title && formik.errors.title ?
                            <div className={"text-red-500 text-xl"}>{formik.errors.title}</div> : "\0"}</span></label>
                    </div>
                    <div className={"text-white text-2xl"}>Description:</div>
                    <div className={" "}><textarea
                        className={"text-black h-48 font-semibold textarea bg-blue-50 textarea-primary textarea-lg w-full max-w-xs"}
                        placeholder={"Description"} {...formik.getFieldProps("description")}/>
                        <label className="label"> <span
                            className="label-text-alt ">{formik.touched.description && formik.errors.description ?
                            <div
                                className={"text-red-500 text-xl"}>{formik.errors.description}</div> : "\0"}</span></label>
                    </div>
                    <div className={"text-white text-2xl"}>Time:</div>
                    <div className={"flex items-center"}>
                        <input
                            className={"text-lg m-1 leading-5.6 ease-soft  w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none text-black"}
                            type="date" placeholder={"Date"} {...formik.getFieldProps("date")}/>
                    </div>
                    <div className={"flex items-center "}>
                        <input type={"time"}
                               className={"text-lg m-1 w-full leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none text-black"}
                               placeholder={"Time"}{...formik.getFieldProps("time")}/>
                    </div>
                    {formik.touched.date && formik.errors.date ?
                        <div className={" m-4 flex-initial text-red-500 text-xl"}>{formik.errors.date}</div> : null}
                    {formik.touched.time && formik.errors.time ?
                        <div className={"m-4 text-red-500 text-xl"}>{formik.errors.time}</div> : "\0"}
                    <div className={"flex justify-center mt-2"}>
                        <button className="btn btn-primary" type={"submit"}> Edit task</button>
                    </div>


                </form>
            </div>
        </PopUpComponent>
    </div>
})


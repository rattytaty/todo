import React, {useState} from 'react';
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {DataForTask, tasksApi} from "../../service/api";
import {FieldArray, FormikProvider, useFormik} from "formik";
import * as Yup from "yup";
import {array, boolean, string} from "yup";
import {useNavigate, useParams} from "react-router-dom";
import {todolistParams} from "../Pages/Todolist";
import {Button} from "../UniversalComponents/Button";
import {InputField} from "../UniversalComponents/InputField";


type AddNewTaskFormProps = {
    data?: {
        task: DataForTask
        setEditMode: (editMode: boolean) => void
    }
}
export const TaskForm: React.FC<AddNewTaskFormProps> = React.memo(({data}) => {

    const navigate = useNavigate()
    const {todoId, taskId} = useParams<keyof todolistParams>() as todolistParams
    const queryClient = useQueryClient()
    const {mutate: createTask} = useMutation({
        mutationFn: (data: DataForTask) => tasksApi.createTask(todoId, data).then(res => res.data),
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ["tasks", todoId]}).then(
                () => navigate(`/todos/${todoId}/task/${data.id}`)
            )
        }
    })
    const {mutate: editTask} = useMutation({
        mutationFn: (data: DataForTask) => tasksApi.updateTask(todoId, taskId!, data),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ["tasks", todoId]}).then(
            () => {
                data!.setEditMode(false)
                navigate(`/todos/${todoId}/task/${taskId}`)
            }
        )
    })

    const formik = useFormik({
        initialValues: {
            title: data ? data.task.title : "",
            description: data ? data.task.description : "",
            deadline: data ? data.task.deadline : "",
            completed: data ? data.task.completed : false,
            subtasks: data ? data.task.subtasks : []
        },
        onSubmit: values => {
            if (data) {
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
            completed: boolean(),
            subtasks: array().of(string().required('Title required!'))
        })
    });
    const [subtaskValue, setSubtaskValue] = useState("")

    return <div>
        <h1 className="text-neutral text-2xl font-semibold">{data ? "Edit task:" : "Add new Task:"}</h1>
        <Button variant="red"
                className="absolute top-0 right-0"
                onClick={() => {
                    formik.resetForm()
                    navigate(`/todos/${todoId}`)
                }}>x</Button>
        <FormikProvider value={formik}>
            <form className="ml-2.5" onSubmit={formik.handleSubmit}>
                <div>
                    <h1 className="text-neutral text-lg mt-2.5 ">Task title:</h1>
                    <InputField type="text"
                                placeholder={formik.touched.title && formik.errors.title
                                    ? formik.errors.title
                                    : "Task title"}
                                className={`w-80 m-2 placeholder ${formik.touched.title && formik.errors.title
                                    ? "placeholder-error"
                                    : ""}`}
                                {...formik.getFieldProps("title")}
                                onBlur={() => formik.setErrors({})}/>
                </div>
                <div>
                    <span className="text-neutral text-lg  ">Task description:</span>
                    <span className="text-error ">{formik.touched.description && formik.errors.description
                        ? formik.errors.description
                        : null}</span>
                    <textarea
                        className="textarea placeholder:text-sm text-lg textarea-bordered block border-neutral-300 m-2 h-24 w-80 text-info"
                        placeholder="Task description"
                        {...formik.getFieldProps("description")}
                        onBlur={() => formik.setErrors({})}/>

                </div>
                <div>
                    <span className="text-neutral text-lg  ">Task deadline:</span>
                    <span className="text-error ">{formik.touched.deadline && formik.errors.deadline
                        ? formik.errors.deadline
                        : null}</span>
                    <input className="block bg-base-100 mx-2 mt-2 text-info "
                           type={"datetime-local"} {...formik.getFieldProps("deadline")}
                           onBlur={() => formik.setErrors({})}/>
                </div>
                <div>
                    {data && <div className=" flex items-center"><input type="checkbox"
                                                                        checked={formik.values.completed}
                                                                        className="toggle toggle-success badge-neutral border-success my-2"  {...formik.getFieldProps("completed")}/>
                        <div
                            className="text-info ml-2">{formik.values.completed ? "Task is completed" : "Task is not completed"}</div>
                    </div>}
                </div>
                <div>{data && <FieldArray {...formik.getFieldProps("subtasks")}
                                          render={(arrayHelpers) => (
                                              <div className="text-info text-lg">
                                                  <div>Subtasks:</div>
                                                  <InputField onChange={e => setSubtaskValue(e.currentTarget.value)}
                                                              value={subtaskValue}
                                                              className={`w-80 m-2`}
                                                              button
                                                              buttonType="button"
                                                              onButtonClick={() => {
                                                                  if (subtaskValue.length) {
                                                                      arrayHelpers.push(subtaskValue)
                                                                      setSubtaskValue("")
                                                                  }
                                                              }}></InputField>
                                                  {formik.values.subtasks.map((subtask, index) => (

                                                      <div className="ml-2" key={index}>
                                                          <span key={index}>{index + 1}. {subtask}</span>
                                                          <Button variant="red"
                                                                  size="small"
                                                                  className="mx-2"
                                                                  onClick={() => arrayHelpers.remove(index)}>x</Button>
                                                      </div>
                                                  ))}
                                                  <span
                                                      className="text-error ">{formik.touched.subtasks && formik.errors.subtasks
                                                      ? formik.errors.subtasks
                                                      : null}</span>
                                              </div>
                                          )}/>}
                </div>
                <Button type={"submit"}
                        className="absolute right-0 bottom-0">Save</Button>
            </form>
        </FormikProvider>
    </div>
})





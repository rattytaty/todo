import React, {ChangeEvent, KeyboardEvent, useRef, useState} from 'react';

type AddItemFormProps = {
    addItem: (itemTitle: string) => void
    disabled?: boolean
}

export const AddItemForm = React.memo((props: AddItemFormProps) => {

    console.log("AddItemForm")
    const inputRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<boolean>(false)
    const addNewTask = () => {

        const noSpaceTaskName = newTaskName.trim()
        if (noSpaceTaskName !== "") {
            props.addItem(noSpaceTaskName)
        } else {
            const iEl = inputRef.current as HTMLInputElement
            iEl.focus()
            !error && setError(true)
        }
        setNewTaskName("")
    }
    const inputOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskName(event.currentTarget.value)
        error && setError(false)
    }
    const [newTaskName, setNewTaskName] = useState<string>("")
    const inputEnterPress = (event: KeyboardEvent<HTMLInputElement>) => event.key === "Enter" && addNewTask()
    const errorMessage = error ? "Title is required" : ""
    const onBlurHandler = () => {
        error && setError(false)
    }

    return (
        <div className="flex-1">


            <input type="text" placeholder={error ? errorMessage : "Add new todolist"}
                   className="m-2 input text-white input-bordered input-primary w-full max-w-xs"
                   value={newTaskName}
                   onChange={inputOnChange}
                   onKeyDown={inputEnterPress}
                   onBlur={onBlurHandler}
                   ref={inputRef}
                   disabled={props.disabled}
            />
            <button className="btn btn-active btn-primary" onClick={addNewTask} disabled={props.disabled}>+</button>

        </div>
    );
});


import React, {MouseEvent, FunctionComponent, ReactNode, InputHTMLAttributes} from 'react';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    children?: ReactNode;
    button?:boolean
    onButtonClick?:(event:MouseEvent<HTMLButtonElement>)=>void|undefined
    buttonType?:"submit"
}

export const InputField:FunctionComponent<InputFieldProps> = ({children,className,onClick, button,onButtonClick,buttonType, ...rest}) => {
    return <>
        <input className={`input text-info input-bordered input-sm border-neutral-300 placeholder:text-sm text-lg w-52 ${className}`} {...rest}/>
        {button && <button type={buttonType} onClick={onButtonClick} className="btn btn-sm btn-circle btn-outline text-info border-neutral-300 hover:bg-neutral-300 hover:text-info">+
        </button>}
    </>

};


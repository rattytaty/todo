import React, {ButtonHTMLAttributes, FunctionComponent, ReactNode} from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {

    variant?:"default"|"red"
    children: ReactNode;
    className?:string;
    size?:"standard"|"small"
}

export const Button:FunctionComponent<ButtonProps> = ({children,variant="default",className, size="standard", ...rest}) => {
    return <button className={`btn btn-outline text-neutral 
    ${variant==="default"?"hover:bg-secondary hover:text-white":""}
    ${variant==="red"?"border-error hover:bg-error":""}
    ${size==="small"?"btn-xs":""}
    ${size==="standard"?"btn-sm":""}
    ${className}
    `} {...rest}>{children}</button>;
};
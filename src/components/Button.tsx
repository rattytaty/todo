import React, {ButtonHTMLAttributes, FunctionComponent, ReactNode} from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {

    variant?:"default"|"red"
    children: ReactNode;
    className?:string
}

export const Button:FunctionComponent<ButtonProps> = ({children,variant="default",className, ...rest}) => {
    return <button className={`btn btn-outline btn-sm text-neutral 
    ${variant==="default"?"hover:bg-secondary hover:text-white":""}
    ${variant==="red"?"border-error hover:bg-error":""}
    ${className}
    `} {...rest}>{children}</button>;
};
import {NavLink} from "react-router-dom";
import React from "react";

export const ErrorPage = () => {

    return <div className="bg-neutral text-lg text-white flex items-center justify-center h-[100vh] flex-col">
        <div>Page not found!</div>
        <NavLink to={"/"} className="link link-warning text-4xl">Go back to
            Home Page.</NavLink>
    </div>


}
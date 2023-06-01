import React from 'react';
import {Link} from "react-router-dom";

export const Page404 = () => {
    return <div className={"bg-gray-200 w-screen h-screen flex items-center justify-center"}>

        <div className={"text-black text-5xl "}>Something went wrong...
            <Link className="link link-primary" to={"/"}>Get back to your todolists.</Link>
        </div>

    </div>

};

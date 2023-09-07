import React from "react";
import {NavLink} from "react-router-dom";

export const HomePage: React.FC = React.memo(() => {
    return <div>
        <h1 className="text-neutral text-2xl font-semibold">This is a Todo app build with:</h1>
        <ul className="text-info m-2">
            <li className="m-1">React</li>
            <li  className="m-1">TypeScript</li>
            <li className="m-1">TanStack/React Query</li>
            <li className="m-1">Formik+YUP</li>
            <li className="m-1">Axios (responses from MockAPI)</li>
            <li className="m-1">React router dom v6</li>
            <li className="m-1">Tailwind CSS</li>
            <li className="m-1">daisy UI</li>
        </ul>
        <p>LinkedIn profile: <NavLink className="link link-warning" target="_blank" to={"https://www.linkedin.com/in/rattytat/"}>Click</NavLink></p>
    </div>
})
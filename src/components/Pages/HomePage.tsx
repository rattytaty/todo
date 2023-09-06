import React from "react";
import {NavLink} from "react-router-dom";


export const HomePage: React.FC = React.memo(() => {
    console.log("HomePage")
    return <div>
        <p>This is a Todo app build with:</p>
        <ul className="text-info m-2">
            <li>React</li>
            <li>TypeScript</li>
            <li>TanStack/React Query</li>
            <li>Formik+YUP</li>
            <li>Axios(responses from MockAPI)</li>
            <li>React router dom v6</li>
            <li>Tailwind CSS</li>
            <li>daisy UI</li>
        </ul>
        <p>LinkedIn profile:<NavLink className="link link-warning" target="_blank" to={"https://www.linkedin.com/in/rattytat/"}>Click</NavLink></p>
    </div>
})
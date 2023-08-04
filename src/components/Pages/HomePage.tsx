import React from "react";


export const HomePage: React.FC = React.memo(() => {

    return <div>
        This is a Todo app build with:
        <ul>
            <li>React</li>
            <li>TypeScript</li>
            <li>TanStack/React Query</li>
            <li>Formik+YUP</li>
            <li>Axios</li>
            <li>React router dom v6</li>
            <li>Tailwind CSS</li>
            <li>daisy UI</li>
        </ul>
    </div>
})
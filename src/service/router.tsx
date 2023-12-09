import {Layout} from "../components/Pages/Layout";
import {ErrorPage} from "../components/Pages/ErrorPage";
import {createBrowserRouter} from "react-router-dom";
import React from "react";
import {Todolist} from "../components/Pages/Todolist";
import {DetailedTask} from "../components/TodolistCompomemts/DetailedTask";
import {TaskForm} from "../components/TodolistCompomemts/TaskForm";
import {HomePage} from "../components/Pages/HomePage";


export const router = createBrowserRouter([{
        path: "/",
        element: <Layout/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                index: true,
                element: <HomePage/>
            },
            {
                path: '/todos/:todoId',
                element: <Todolist/>,
                children:[
                    {
                        path:"add",
                        element: <TaskForm />
                    },
                    {
                        path:'task/:taskId',
                        element:  <DetailedTask />
                    }
                ]
            },
        ]
    }
])

import React from 'react';
import './App.css';
import {Navigate, Route, Routes} from "react-router-dom";
import {TodolistsPage} from "./Pages/TodolistPage";
import {Page404} from "./Pages/Page404";


export function App() {

    return <div>
        <Routes>
            <Route path={'/404'} element={<Page404/>}/>
            <Route path={"*"} element={<Navigate to={'/404'}/>}/>
            <Route path={"/"} element={<TodolistsPage/>}/>

        </Routes>

    </div>

}


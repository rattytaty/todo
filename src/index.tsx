import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import reportWebVitals from './reportWebVitals';
import {App} from "./App";

import {BrowserRouter} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";


const client = new QueryClient()

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(

        <QueryClientProvider client={client}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
            </QueryClientProvider>

);


reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import reportWebVitals from './reportWebVitals';

import {RouterProvider} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {router} from "./router";
import {LoadingCircle} from "./components/AppStatusComponents/LoadingCircle";


const client = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        }
    }
})

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <QueryClientProvider client={client}>
        <RouterProvider router={router} fallbackElement={<LoadingCircle/>}/>
    </QueryClientProvider>
);


reportWebVitals();

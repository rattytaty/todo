import {isRouteErrorResponse, useNavigate, useRouteError} from "react-router-dom";
import React from "react";
import {MainWrapper} from "./MainWrapper";

export const ErrorPage = () => {
    const error = useRouteError();
    const navigate = useNavigate()

    return <MainWrapper>
        <div className="text-neutral text-lg">

            {isRouteErrorResponse(error)
                ? <><h1>Oops!</h1>
                    <h1>{error.status}</h1>
                    <h1>{error.statusText}</h1>
                    {error.data?.message && <h1>{error.data.message}</h1>}
                    <button onClick={() => navigate("/")} className="text-neutral text-2xl font-semibold">Menu</button>
                </>
                : <>
                    <div>Oops</div>
                    <button onClick={() => navigate("/")} className="text-neutral block text-2xl font-semibold">Menu
                    </button>
                </>}
        </div>
    </MainWrapper>

}
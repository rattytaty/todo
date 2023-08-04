import {Outlet, useNavigation} from "react-router-dom";
import {LoadingCircle} from "../AppStatusComponents/LoadingCircle";
import '../../App.css';
import React from "react";
import {useIsFetching, useIsMutating} from "@tanstack/react-query";
import {SideBar} from "../SideBar/SideBar";

export const Layout = () => {

    const {state} = useNavigation()
    const isFetching = useIsFetching()
    const isMutating = useIsMutating()

    return <div>
        <div className={"wrapper"}>
            <SideBar/>
            <Outlet/>
        </div>
        {/*{isError && <ErrorMessage/>} make error handling*/}
        {(isFetching || isMutating || state === "loading") && <LoadingCircle/>}

    </div>
}
import React from 'react';
import {LoadingCircle} from "./LoadingCircle";

type AppStatusProps = {
    isLoading:boolean

}
export const AppStatus:React.FC<AppStatusProps> = React.memo((props) => {

    return (<
        div className="m-2 absolute text-right text-black text-4xl   fixed  z-50   bottom-0 right-0">

        <LoadingCircle isLoading={props.isLoading}/>
    </div>)

})

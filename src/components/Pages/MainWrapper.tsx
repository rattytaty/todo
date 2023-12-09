import React, {ReactNode} from 'react';


export const MainWrapper = (props: { children: ReactNode }) => {

    return <div className="bg-base-100 p-6 xl:rounded-3xl
    grid relative
    lg:grid-rows-[1fr] lg:grid-cols-[0.3fr_5fr]
    min-h-screen lg:min-h-max
    h-max
    lg:h-[100vh] w-full mx-auto my-auto
    xl:h-[90vh] xl:my-10
    xl:w-[calc(100vw_-_300px)]
    shadow-[0_14px_28px_rgba(13,1,21,0.22),0_10px_10px_rgba(43,3,62,0.22)]"> {props.children}
    </div>
}

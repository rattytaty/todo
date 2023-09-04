import React, {ReactNode} from 'react';


export const MainWrapper = (props: { children: ReactNode }) => {
    return <div className="bg-base-100 grid p-6 h-[680px] rounded-3xl relative mx-auto my-7 w-[calc(100vw_-_300px)] grid-rows-[1fr] grid-cols-[1.5fr_5fr] shadow-[0_14px_28px_rgba(13,1,21,0.22),0_10px_10px_rgba(43,3,62,0.22)]"> {props.children}
    </div>
};

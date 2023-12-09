import React from "react";

export type PopUpProps = {
    isPopUpActive: boolean
    children: React.ReactNode
}

export const PopUpComponent: React.FC<PopUpProps> = React.memo(({isPopUpActive, children}) => {

    return isPopUpActive
        ?<div className=" bg-black/90 flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
               {children}
            </div>
        </div>
     : null
})


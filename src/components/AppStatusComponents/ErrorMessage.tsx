import React from "react";


export const ErrorMessage: React.FC = React.memo(() => {

    return <div className="fixed left-1/2 bottom-0 -translate-x-1/2 translate-y-0 mb-4">
        <div className="indicator alert alert-error text-black">
            <button className="indicator-item indicator-top ">
                <svg xmlns="http://www.w3.org/2000/svg"
                     className=" stroke-current shrink-0 h-8 w-8"
                     fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
            </button>
            <span>Error! Task failed successfully.</span>
        </div>
    </div>
})
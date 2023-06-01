import React from "react";



export const ErrorMessage: React.FC = React.memo(() => {
const error = false
    return <div>{error
        ? <div>
            <div className="badge m-2  text-4xl h-12 badge-error gap-2">{error}</div>
            <button      className="btn btn-error">ok</button>
        </div>
        : <></>}</div>
})
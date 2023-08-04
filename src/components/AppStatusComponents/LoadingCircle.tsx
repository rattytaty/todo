import React from 'react';

export const LoadingCircle:React.FC=()=> {
    return <div className="m-4 absolute bottom-0 right-0">
       <span className="loading loading-ring loading-lg text-neutral"></span>
    </div>
}

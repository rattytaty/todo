import React from 'react';

export const TaskStatus: React.FC<{ completed: boolean }> = React.memo(({completed}) => {

    const bubble = <div
        className={`bg-error h-4 w-4 rounded-xl mb-1 mr-2 ${completed ? "bg-success" : "bg-error"}`}></div>
    return <div className="flex items-center text-info">
        {bubble}
        <div>{completed ? "Completed" : "Not completed"}</div>
    </div>
})

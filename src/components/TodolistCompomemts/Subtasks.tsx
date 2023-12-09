import React from 'react';

type subtasksProps = {
    subtasks: string[],
    long?: boolean
}
export const Subtasks: React.FC<subtasksProps> = React.memo(({subtasks, long}) => {

    const subtasksAmount = <span><span className="font-bold">{subtasks.length}</span> Subtasks</span>
    const subtasksList = subtasks.map((el, i) =>
        <div className="m-2" key={i}>
            <span>{i + 1}. {el}</span>
        </div>)

    return <div className="text-info">
        {long
            ? <div>{subtasksAmount}</div>
            : <div>{subtasks.length
                ? subtasksAmount
                : null} </div>}
        {long && subtasksList}
    </div>
})

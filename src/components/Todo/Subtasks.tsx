import React from 'react';

export const Subtasks = (props: { subtasks: string[], long?: boolean }) => {

    const subtasksAmount = <span><span className="font-bold">{props.subtasks.length}</span> Subtasks</span>

    return <div className="text-info">
        {props.long
            ? <div>{props.subtasks.length
                ? <div>{subtasksAmount}:</div>
                : <div>{subtasksAmount}</div>}
            </div>
            : <div> {props.subtasks.length
                ? subtasksAmount
                : null}
            </div>
        }
        {props.long && props.subtasks.map((el, i) =>
            <div className="m-2" key={i}>
                <span>{i+1}. </span>
                {el}</div>)}
    </div>
};

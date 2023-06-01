import React from 'react';

type DeadlineProps= {
    deadline:string
}

export const TaskDeadline: React.FC<DeadlineProps> = React.memo((props) => {

    const [date, time] = props.deadline.split("T")
    const convertedDate = date.split("-").reverse().join("-").replaceAll("-", ".")
    const convertedTime = time.slice(0, 5)

    return <div>
        <div title={"Task deadline"} className={"m-1 text-gray-600"}>Complete before:</div>
        <div title={"Task deadline"} className={"m-1 text-gray-600"}>{
            `${convertedDate} ${convertedTime}`
        }</div>
    </div>
})
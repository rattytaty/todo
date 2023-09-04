import React from 'react';
import calendar from '../../assets/calendar.svg'

const convertDate = (value:string)=>{
    const [date, time] = value.split("T")
    const [year, month, day] = date.split("-")
    const shortDate = `${day}.${month}`
    const longDate = `${day}.${month}.${year}`
    const convertedTime = time.slice(0, 5)
    return {shortDate,longDate, convertedTime}
}

export const Deadline = (props:{deadline:string , long?:boolean}) => {

const {shortDate,longDate, convertedTime} = convertDate(props.deadline)
    return <div className="text-info">
        <img className="h-4 inline" alt="Calendar" src={calendar}></img>
        {props.long?<span>{longDate}</span>:<span className="m-1">{shortDate}</span>}
        {props.long&&<span className="ml-2">{convertedTime}</span>}
        </div>
};


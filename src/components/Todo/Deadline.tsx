import React from 'react';
import calendar from '../../assets/calendar.svg'

const convertDate = (dateToConvert: string) => {
    const [date, time] = dateToConvert.split("T")
    const [year, month, day] = date.split("-")
    const shortDate = `${day}.${month}`
    const longDate = `${day}.${month}.${year}`
    const convertedTime = time.slice(0, 5)
    return {shortDate, longDate, convertedTime}
}
type deadlineProps = {
    deadline: string,
    long?: boolean
}
export const Deadline: React.FC<deadlineProps> = React.memo(({deadline, long}) => {

    const {shortDate, longDate, convertedTime} = convertDate(deadline)
    return <div className="text-info">
        <img className="h-4 inline"
             alt="Calendar"
             src={calendar}>
        </img>
        {long ? <span>{longDate}</span>
            : <span className="m-1">{shortDate}</span>}
        {long && <span className="ml-2">{convertedTime}</span>}
    </div>
})


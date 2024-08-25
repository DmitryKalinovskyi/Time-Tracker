import Typography from "@mui/material/Typography";
import {Chip} from "@mui/material";
import {isSameDay} from "../../../misc/DateHelper.ts";
import useCalendarEventsInThatDay from "../../../hooks/useCalendarEventsInThatDay.ts";


interface MonthCellProps{
    day: Date,
    month: number,
    onClick: (day: Date) => void
}

export function MonthCell(props: MonthCellProps) {
    const today = new Date()
    const calendarEvents = useCalendarEventsInThatDay(props.day);

    return <div
        onClick={() => props.onClick(props.day)}
        className={`p-2 h-full overflow-hidden border hover:bg-blue-50 cursor-pointer ${isSameDay(props.day, today) ? 'bg-blue-100 border-blue-500' : ''}`}>

        {props.month != props.day.getMonth() ?
            <Typography variant="body1" className="text-gray-300">
                {props.day.getDate()}
            </Typography>
        :
            <Typography variant="body1"
                        color={isSameDay(props.day, today) ? "primary" : "textPrimary"}>
                {props.day.getDate()}
            </Typography>
        }
        {isSameDay(props.day, today) && <Chip label="Today" color="secondary" size="small" sx={{marginTop: 1}}/>}
        {calendarEvents.map((e,index) => <div key={index}>{e.name}</div>)}
    </div>
}
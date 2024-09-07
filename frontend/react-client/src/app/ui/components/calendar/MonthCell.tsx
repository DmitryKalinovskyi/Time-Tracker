import Typography from "@mui/material/Typography";
import {Chip} from "@mui/material";
import {isSameDay} from "../../../misc/DateHelper.ts";
import {CalendarEvent} from "../../../types/CalendarEvent.ts";
import {useSelector} from "react-redux";
import {RootState} from "../../../store.ts";
import dayjs from "dayjs";


interface MonthCellProps{
    day: Date,
    month: number,
    onClick: (day: Date) => void
    events: CalendarEvent[]
}

export function MonthCell(props: MonthCellProps) {
    const today = new Date()
    const events = useSelector((state: RootState) => state.calendar.selectedUser.calendarEvents)
        .filter(value => isSameDay(props.day, new Date(value.startTime)));

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
        {events.map((d,index) => <Chip key={index}
                                       color="primary"
                                       size="small"
                                       sx={{width: "90%", marginTop: 1, mx: 1}}
                                       label={`${dayjs(d.startTime).format("hh:mm a")}-${dayjs(d.endTime).format("hh:mm a")}`}/>)}
        {isSameDay(props.day, today) && <Chip label="Today" color="secondary" size="small" sx={{marginTop: 1}}/>}
    </div>
}
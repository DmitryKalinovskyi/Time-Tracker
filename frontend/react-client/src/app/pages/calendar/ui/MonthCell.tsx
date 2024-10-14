import Typography from "@mui/material/Typography";
import {Chip} from "@mui/material";
import {isSameDay} from "@time-tracker/shared/misc/DateHelper.ts";
import {useSelector} from "react-redux";
import {RootState} from "../../../store.ts";
import dayjs from "dayjs";
import {CalendarEvent} from "@time-tracker/types/CalendarEvent.ts";


interface MonthCellProps{
    day: Date,
    month: number,
    onClick: (day: Date) => void
}

export function MonthCell(props: MonthCellProps) {
    const today = new Date()
    const eventsInThatDay = useSelector((state: RootState) => state.calendar.selectedUser.calendarEvents)
        .filter(value => isSameDay(props.day, new Date(value.startTime)));

    const formatEvent = (calendarEvent: CalendarEvent) => {
        const from: string = dayjs(new Date(calendarEvent.startTime)).format("hh:mm a");
        const to: string = dayjs(new Date(calendarEvent.endTime)).format("hh:mm a");

        return `${from} - ${to}`;
    }

    const isDayInCurrentMonth = props.month == props.day.getMonth();
    const isToday = isSameDay(today, props.day);

    return <div
        onClick={() => props.onClick(props.day)}
        className={`p-2 max-h-full h-full overflow-hidden border hover:bg-blue-50 cursor-pointer ${isSameDay(props.day, today) ? 'bg-blue-100 border-blue-500' : ''}`}>
        {isDayInCurrentMonth ?
            isToday ?
                <Chip color="secondary" size="small" label={props.day.getDate()}/>
                :
                <Typography variant="body1"
                            color="textPrimary">
                    {props.day.getDate()}
                </Typography>
            :
            <Typography variant="body1" className="text-gray-300">
                {props.day.getDate()}
            </Typography>
        }
        {eventsInThatDay.map((e) => <Chip key={e.id}
                                       color="primary"
                                       size="small"
                                       sx={{width: "90%", marginTop: 1}}
                                       label={formatEvent(e)}/>)}
    </div>
}
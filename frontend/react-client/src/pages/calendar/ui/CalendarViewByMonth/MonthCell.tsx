import Typography from "@mui/material/Typography";
import {Chip} from "@mui/material";
import {isSameDay} from "@time-tracker/shared/misc/dateHelpers.ts";
import {useSelector} from "react-redux";
import dayjs from "dayjs";
import {CalendarEvent} from "@time-tracker/types/CalendarEvent.ts";
import {RootState} from "@time-tracker/app/store.ts";
import {useMonthState} from "@time-tracker/pages/calendar/ui/hooks/useMonthState.ts";
import Box from "@mui/material/Box";

interface MonthCellProps{
    day: Date,
    onClick: (day: Date) => void
}

export function MonthCell(props: MonthCellProps) {
    const {selectedMonth} = useMonthState();
    const isDayInCurrentMonth = selectedMonth.month == props.day.getMonth();
    const isToday = isSameDay(new Date(), props.day);
    const eventsInThatDay = useSelector((state: RootState) => state.calendar.selectedUser.calendarEvents)
        .filter(value => isSameDay(props.day, new Date(value.startTime)));

    const formatEvent = (calendarEvent: CalendarEvent) => {
        const from: string = dayjs(new Date(calendarEvent.startTime)).format("hh:mm a");
        const to: string = dayjs(new Date(calendarEvent.endTime)).format("hh:mm a");

        return `${from} - ${to}`;
    }

    return <Box
        onClick={() => props.onClick(props.day)}
        className={`p-2 max-h-full h-full overflow-hidden border hover:bg-blue-50 cursor-pointer ${isToday ? 'bg-blue-100 border-blue-500' : ''}`}>
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
    </Box>
}
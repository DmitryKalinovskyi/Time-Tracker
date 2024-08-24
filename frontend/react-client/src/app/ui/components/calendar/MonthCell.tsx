import Typography from "@mui/material/Typography";
import {Chip} from "@mui/material";


interface MonthCellProps{
    day: Date,
}

function isSameDay(day1: Date, day2: Date){
    return day1.getFullYear() === day2.getFullYear()
        && day1.getMonth() === day2.getMonth()
        && day1.getDate() === day2.getDate();
}

export function MonthCell(props: MonthCellProps) {
    const today = new Date();

    // if(today.getDate() === props.day.getDate()){
    //     return <div className="px-2 h-full border border-blue-500 hover:bg-blue-50 cursor-pointer">
    //         <Typography>
    //             {props.day.getDate()}
    //         </Typography>
    //     </div>
    // }

    return <div
        className={`p-2 h-full border hover:bg-blue-50 cursor-pointer ${isSameDay(props.day, today) ? 'bg-blue-100 border-blue-500' : ''}`}>
        <Typography variant={isSameDay(props.day, today) ? "h6" : "body1"}
                    color={isSameDay(props.day, today) ? "primary" : "textPrimary"}>
            {props.day.getDate()}
        </Typography>
        {isSameDay(props.day, today) && <Chip label="Today" color="secondary" size="small" sx={{marginTop: 1}}/>}
    </div>
    // return <div className="p-2 h-full border hover:bg-blue-50 cursor-pointer">
    //     {isSameDay(props.day, today) ?
    //         <Typography>
    //             {props.day.getDate()}
    //         </Typography>
    //     }
    //
    // </div>
}
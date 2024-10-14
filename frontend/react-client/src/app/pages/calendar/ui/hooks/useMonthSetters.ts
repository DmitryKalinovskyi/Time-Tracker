import {changeSelectedMonth, MonthType} from "@time-tracker/features/calendar/calendarSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../store.ts";

export function useMonthSetters(){
    const selectedMonth: MonthType = useSelector((state: RootState) => state.calendar.selectedMonth);
    const dispatch = useDispatch();
    const changeCalendarDate = (month: MonthType) => {
        dispatch(changeSelectedMonth(month));
    }

    const setCurrentMonth = () => {
        changeCalendarDate({
            year: new Date().getFullYear(),
            month: new Date().getMonth()
        });
    }

    const moveToNextMonth = () =>{
        changeCalendarDate({
            year: selectedMonth.year + (selectedMonth.month == 11 ? 1: 0),
            month: ((selectedMonth.month + 1) % 12)
        })
    }

    const moveToPreviousMonth = () =>{
        changeCalendarDate({
            year: selectedMonth.year + (selectedMonth.month == 0 ? -1: 0),
            month: ((selectedMonth.month+11) % 12)
        })
    }

    return [selectedMonth, setCurrentMonth, moveToPreviousMonth, moveToNextMonth];
}
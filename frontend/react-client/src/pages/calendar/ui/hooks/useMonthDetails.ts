import {MonthType} from "@time-tracker/pages/calendar/calendarSlice.ts";
import {getDaysInMonth} from "@time-tracker/shared/misc/dateHelpers.ts";
import {useMonthState} from "@time-tracker/pages/calendar/ui/hooks/useMonthState.ts";

export function useMonthDetails(){
    const {selectedMonth} = useMonthState();

    const firstDay = new Date();
    firstDay.setFullYear(selectedMonth.year);
    firstDay.setMonth(selectedMonth.month);
    firstDay.setDate(1);
    const days: Date[] = [];

    // how many weeks we need to display our month?
    const daysInMonth = getDaysInMonth(selectedMonth.year, selectedMonth.month);
    const daysNeedToDisplay = firstDay.getDay() + daysInMonth;
    const weeksCount = Math.ceil(daysNeedToDisplay / 7);
    for (let i = 0; i < weeksCount * 7; i++) {
        const day = new Date(firstDay);

        day.setDate(firstDay.getDate() + i - firstDay.getDay());

        days.push(day);
    }

    return {days, weeksCount};
}
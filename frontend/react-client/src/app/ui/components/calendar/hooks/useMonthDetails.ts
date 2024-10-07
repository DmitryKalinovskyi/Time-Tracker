import {MonthType} from "../../../../features/calendar/calendarSlice.ts";
import {getDaysInMonth} from "../../../../misc/DateHelper.ts";

export function useMonthDetails(month: MonthType){
    const firstDay = new Date();
    firstDay.setFullYear(month.year);
    firstDay.setMonth(month.month);
    firstDay.setDate(1);
    const days: Date[] = [];

    // how many weeks we need to display our month?
    const daysInMonth = getDaysInMonth(month.year, month.month);
    const daysNeedToDisplay = firstDay.getDay() + daysInMonth;
    const weeksCount = Math.ceil(daysNeedToDisplay / 7);
    for (let i = 0; i < weeksCount * 7; i++) {
        const day = new Date(firstDay);

        day.setDate(firstDay.getDate() + i - firstDay.getDay());

        days.push(day);
    }

    return [days, weeksCount];
}
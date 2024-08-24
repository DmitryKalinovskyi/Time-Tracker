export function isSameDay(day1: Date, day2: Date){
    return day1.getFullYear() === day2.getFullYear()
        && day1.getMonth() === day2.getMonth()
        && day1.getDate() === day2.getDate();
}

export function getDaysInMonth(year, month) {
    // month is 0-indexed (0 = January, 1 = February, ..., 11 = December)
    return new Date(year, month + 1, 0).getDate();
}
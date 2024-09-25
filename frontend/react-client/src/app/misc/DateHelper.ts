export function isSameDay(day1: Date, day2: Date){
    return day1.getFullYear() === day2.getFullYear()
        && day1.getMonth() === day2.getMonth()
        && day1.getDate() === day2.getDate();
}

export function getDaysInMonth(year: number, month: number) {
    // month is 0-indexed (0 = January, 1 = February, ..., 11 = December)
    return new Date(year, month + 1, 0).getDate();
}

export function toIsoString(date: Date) {
    console.log("DATE HELPER:" + date);
    const tzo = -date.getTimezoneOffset(),
        dif = tzo >= 0 ? '+' : '-',
        pad = function(num: number) {
            return (num < 10 ? '0' : '') + num;
        };
  
    return date.getFullYear() +
        '-' + pad(date.getMonth() + 1) +
        '-' + pad(date.getDate()) +
        'T' + pad(date.getHours()) +
        ':' + pad(date.getMinutes()) +
        ':' + pad(date.getSeconds()) +
        dif + pad(Math.floor(Math.abs(tzo) / 60)) +
        ':' + pad(Math.abs(tzo) % 60);
  }
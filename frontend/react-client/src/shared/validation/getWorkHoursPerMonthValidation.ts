import {number} from "yup";

export function getWorkHoursPerMonthValidation(){
    return number().integer()
        .label("Work hours per month")
        .min(0, "Work hours per month should be at least 0")
        .max(720, "Work hours per month should be at most 720")
}
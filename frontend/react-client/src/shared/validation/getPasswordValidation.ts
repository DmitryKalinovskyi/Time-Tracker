import {string} from "yup";

export function getPasswordValidation(){
    return string()
        .label("Password")
        .min(8, 'Password should be of minimum 8 characters length')
        .max(16, 'Password should be of maximum 16 characters length')
}
import {string} from "yup";

export function getEmailValidation(){
    return string()
        .label("Email")
        .email()
}
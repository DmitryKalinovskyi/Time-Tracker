import {string} from "yup";

export function getEmailValidation(){
    return string().email("Please enter valid email.")
}
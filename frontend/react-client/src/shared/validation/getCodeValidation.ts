import {string} from "yup";

export function getCodeValidation(){
    return string()
        .required("Code is required.")
}
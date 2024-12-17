import {string} from "yup";

export function getPositionValidation(){
    return string()
        .label("Position")
}
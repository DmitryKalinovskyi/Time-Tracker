import {string} from "yup";

export function getFullNameValidation(){
    return string()
        .label("Full name")
        .matches(/^[[A-Za-z]* [A-Za-z]*$/, "Full name should consist of two parts (Ivan Ivanovich)")
        .matches(/^[A-Z][a-z]* [A-Za-z]*$/, "First name should start with a capital letter")
        .matches(/^[A-Z][a-z]* [A-Z][a-z]*$/, "Last name should start with a capital letter")
        .matches(/^[A-Z][a-z]{0,50} [A-Z][a-z]{0,50}$/, "First and last name could have at most 50 characters")
}
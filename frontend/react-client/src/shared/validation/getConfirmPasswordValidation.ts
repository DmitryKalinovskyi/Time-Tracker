import {ref, string} from "yup";

export function getConfirmPasswordValidation(){
    return string()
        .label("Confirm Password")
        .oneOf([ref<string>('password')], 'Passwords must match')
}
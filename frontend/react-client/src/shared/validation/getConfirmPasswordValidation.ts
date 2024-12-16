import {ref, string} from "yup";

export function getConfirmPasswordValidation(){
    return string()
        .oneOf([ref<string>('password')], 'Passwords must match.')
}
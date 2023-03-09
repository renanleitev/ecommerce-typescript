import { toast } from 'react-toastify';
import isEmail from 'validator/lib/isEmail';

export default function Validation(
    name: string,
    surname: string,
    address: string,
    email: string,
    password: string,
    repeatPassword?: string
){
    const error: {
        isError: boolean
    } = {
        isError: false,
    };
    if (name.length < 3 || name.length > 255) {
        error.isError = true;
        toast.error('Name invalid and/or need to have between 3 and 255 characters.');
    }
    if (surname.length < 3 || surname.length > 255) {
        error.isError = true;
        toast.error('Surname invalid and/or need to have between 3 and 255 characters.');
    }
    if (address.length < 3 || address.length > 255) {
        error.isError = true;
        toast.error('Address invalid and/or need to have between 3 and 255 characters.');
    }
    if (!isEmail(email)){
        error.isError = true;
        toast.error('Email invalid.');
    }
    if (password !== repeatPassword) {
        error.isError = true;
        toast.error('Password needs to be the same.');
    }
    if (password.length < 6 || repeatPassword.length < 6) {
        error.isError = true;
        toast.error('Password needs to have 6 characters or more.');
    }
    return error.isError;
}
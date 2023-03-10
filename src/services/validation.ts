import { toast } from 'react-toastify';
import isEmail from 'validator/lib/isEmail';

export default function Validation(
    user: {
        name: string,
        surname: string,
        address: string,
        email: string,
        password: string,
    },
    repeatPassword: string,
){
    const error: {
        isError: boolean
    } = {
        isError: false,
    };
    if (user.name.length < 3 || user.name.length > 255) {
        error.isError = true;
        toast.error('Name invalid and/or need to have between 3 and 255 characters.');
    }
    if (user.surname.length < 3 || user.surname.length > 255) {
        error.isError = true;
        toast.error('Surname invalid and/or need to have between 3 and 255 characters.');
    }
    if (user.address.length < 3 || user.address.length > 255) {
        error.isError = true;
        toast.error('Address invalid and/or need to have between 3 and 255 characters.');
    }
    if (!isEmail(user.email)){
        error.isError = true;
        toast.error('Email invalid.');
    }
    if (user.password !== repeatPassword) {
        error.isError = true;
        toast.error('Password needs to be the same.');
    }
    if (user.password.length < 6 || repeatPassword.length < 6) {
        error.isError = true;
        toast.error('Password needs to have 6 characters or more.');
    }
    return error.isError;
}
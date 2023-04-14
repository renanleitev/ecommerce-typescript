import { toast } from 'react-toastify';
import isEmail from 'validator/lib/isEmail';
import * as interfaces from '../interfaces';

export default function validationUser(user: interfaces.User){
    let error = false;
    if (user.name.length < 3 || user.name.length > 255) {
        error = true;
        toast.error('Name invalid and/or need to have between 3 and 255 characters.');
    }
    if (user.surname.length < 3 || user.surname.length > 255) {
        error = true;
        toast.error('Surname invalid and/or need to have between 3 and 255 characters.');
    }
    if (user.address.length < 3 || user.address.length > 255) {
        error = true;
        toast.error('Address invalid and/or need to have between 3 and 255 characters.');
    }
    if (!isEmail(user.email)){
        error = true;
        toast.error('Email invalid.');
    }
    if (user.password.length < 6) {
        error = true;
        toast.error('Password needs to have 6 characters or more.');
    }
    return error;
}
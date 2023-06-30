import isEmail from 'validator/lib/isEmail';
import * as interfaces from '../interfaces';

export default function validationUser(user: interfaces.User): boolean{
    let error = false;
    if (user.email !== '' && !isEmail(user.email)){
        error = true;
    } else if (user.username.includes('@')){
        error = true;
    } else if (user.password.length < 6) {
        error = true;
    }
    return error;
}
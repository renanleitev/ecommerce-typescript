import axios from '../../services/axios';
import history from '../../services/history';
import { toast } from 'react-toastify';
import * as interfaces from '../../interfaces';

export const removeUser = async (user: interfaces.User) => {
    try{
        if (user.id !== undefined){
            await axios.delete(`/users/${user.id}`);
            toast.success('Delete successful!');
            history.push('/');
        } else {
            toast.error('You can not delete your account on the first login.');
        }
    }
    catch(e){console.log(e);}
}

export const editUser = async (user: interfaces.User) => {
    try{
        await axios.put(`/users/${user.id}`, user);
        toast.success('Edit user successfully.');
        history.push('/');
    }
    catch(e){console.log(e);}
}

export const registerUser = async (user: interfaces.User) => {
    try{
        await axios.post('/users', user);
        toast.success('Register user successfully.');
        history.push('/');
    }
    catch(e){console.log(e);}
}

export const loginUser = async (email: string, password: string) => {
    try{
        const users: interfaces.ResponseGenerator = await axios.get('/users');
        const userLogin: interfaces.User = {
            id: '',
            name: '',
            surname: '',
            email: '',
            address: '',
            password: '',
        };
        users.data.forEach((user: interfaces.User) => {
            if ((email === user.email) && (password === user.password)){
                userLogin.id = user.id;
                userLogin.name = user.name;
                userLogin.surname = user.surname;
                userLogin.email = user.email;
                userLogin.address = user.address;
                userLogin.password = user.password;
            }
        });
        return userLogin;
    }
    catch(e){console.log(e);}
}
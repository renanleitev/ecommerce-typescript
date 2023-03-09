import React, {useState, useCallback, useEffect} from 'react';
import { Form } from '../../styles/GlobalStyle';
import { useSelector, useDispatch } from 'react-redux';
import Input from '../../components/Input';
import { toast } from 'react-toastify';
import { IRootState } from '../../store/modules/rootReducer';
import {editSuccess} from '../../store/modules/login/reducer';
import axios from '../../services/axios';
import history from '../../services/history';
import * as interfaces from '../../interfaces';
import Validation from '../../services/validation';

export default function EditUser(){
    const user = useSelector((state: IRootState) => state.login.user);
    const [name, setName] = useState(user.name);
    const [surname, setSurname] = useState(user.surname);
    const [address, setAddress] = useState(user.address);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState(user.password);
    const [repeatPassword, setRepeatPassword] = useState(user.password);
    const [confirmEdit, setConfirmEdit] = useState(false);
    const dispatch = useDispatch();
    const [editUser, setEditUser] = useState<interfaces.User>({...user});
    useEffect(() => {
        setEditUser({
            id: user.id,
            name: name,
            surname: surname,
            address: address,
            email: email,
            password: password,
        })
    }, [address, email, name, password, surname, user.id]);
    const handleSubmit = useCallback((event: React.FormEvent) => {
        event.preventDefault();
        async function getData(){
            try{
                const formErrors = Validation(
                    name,
                    surname,
                    address,
                    email,
                    password,
                    repeatPassword,
                );
                if(confirmEdit && !formErrors){
                    await axios.put(`/users/${user.id}`, editUser);
                    dispatch(editSuccess(editUser));
                    toast.success('Edit user successfully.');
                    setConfirmEdit(false);
                    history.push('/');
                }
                else {
                    toast.success('Do you confirm the changes?');
                    setConfirmEdit(true);
                }
            }
            catch(e){console.log(e);}
        }
        getData();
    }, [name, surname, address, email, password, repeatPassword, confirmEdit, user.id, editUser, dispatch]);
    return (
            <Form onSubmit={handleSubmit}>
                <h2>Edit</h2>
                <label htmlFor='name'>Name</label>
                <Input field={name} setField={setName} placeholder='name'/>
                <label htmlFor='surname'>Surname</label>
                <Input field={surname} setField={setSurname} placeholder='surname'/>
                <label htmlFor='address'>Address</label>
                <Input field={address} setField={setAddress} placeholder='address'/>
                <label htmlFor='email'>Email</label>
                <Input field={email} setField={setEmail} placeholder='email'/>
                <label htmlFor='password'>Password</label>
                <Input field={password} setField={setPassword} placeholder='password'/>
                <label htmlFor='password'>Repeat Password</label>
                <Input field={repeatPassword} setField={setRepeatPassword} placeholder='password'/>
                <button type="submit">Edit</button>
            </Form>
    );
}
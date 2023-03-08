import React, {useState, useCallback, useMemo} from 'react';
import { Form } from '../../styles/GlobalStyle';
import { useSelector, useDispatch } from 'react-redux';
import Input from '../../components/Input';
import { toast } from 'react-toastify';
import { IRootState } from '../../store/modules/rootReducer';
import {editSuccess} from '../../store/modules/login/reducer';
import axios from '../../services/axios';
import history from '../../services/history';
import * as interfaces from '../../interfaces';

export default function EditUser(){
    const user = useSelector((state: IRootState) => state.login.user);
    const [name, setName] = useState(user.name);
    const [surname, setSurname] = useState(user.surname);
    const [address, setAddress] = useState(user.address);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState(user.password);
    const [confirmEdit, setConfirmEdit] = useState(false);
    const dispatch = useDispatch();
    const [editUser, setEditUser] = useState<interfaces.User>({
        id: '',
        name: name,
        surname: surname,
        address: address,
        email: email,
        password: password,
    });
    useMemo(() => {
        setEditUser({
            id: '',
            name: name,
            surname: surname,
            address: address,
            email: email,
            password: password,
        })
    }, [address, email, name, password, surname]);
    const handleSubmit = useCallback((event: React.FormEvent) => {
        event.preventDefault();
        async function getData(){
            try{
                if(confirmEdit){
                    await axios.put(`/users/${user.id}`, editUser);
                    dispatch(editSuccess(editUser));
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
    }, [confirmEdit, user.id, editUser, dispatch]);
    return (
            <Form onSubmit={handleSubmit}>
                <h2>Edit</h2>
                <label htmlFor='name'>Name</label>
                <Input field={name} setField={setName} placeholder='Name'/>
                <label htmlFor='surname'>Surname</label>
                <Input field={surname} setField={setSurname} placeholder='Surname'/>
                <label htmlFor='address'>Address</label>
                <Input field={address} setField={setAddress} placeholder='Address'/>
                <label htmlFor='email'>Email</label>
                <Input field={email} setField={setEmail} placeholder='Email'/>
                <label htmlFor='password'>Password</label>
                <Input field={password} setField={setPassword} placeholder='Password'/>
                <button type="submit">Edit</button>
            </Form>
    );
}
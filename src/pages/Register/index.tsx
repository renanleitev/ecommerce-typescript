import React, {useState, useCallback, useMemo } from 'react';
import isEmail from 'validator/lib/isEmail';
import { Container, Form } from '../../styles/GlobalStyle';
import { useSelector, useDispatch } from 'react-redux';
import Input from '../../components/Input';
import { toast } from 'react-toastify';
import DeleteUser from '../DeleteUser';
import { IRootState } from '../../store/modules/rootReducer';
import {loginSuccess, registerSuccess} from '../../store/modules/login/reducer';
import axios from '../../services/axios';
import history from '../../services/history';
import * as interfaces from '../../interfaces';

export default function Register(){
    const isLoggedIn = useSelector((state: IRootState) => state.login.isLoggedIn);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState(''); 
    const [formErrors, setFormErrors] = useState(true);
    const [user, setUser] = useState<interfaces.User>({
        id: '',
        name: name,
        surname: surname,
        address: address,
        email: email,
        password: password,
    });
    useMemo(() => {
        setUser({
            id: '',
            name: name,
            surname: surname,
            address: address,
            email: email,
            password: password,
        })
    }, [address, email, name, password, surname]);
    const dispatch = useDispatch();
    const handleSubmit = useCallback((event: React.FormEvent) => {
        event.preventDefault();
        setFormErrors(false);
        if (name.length < 3 || name.length > 255) {
            setFormErrors(true);
            toast.error('Name invalid and/or need to have between 3 and 255 characters.');
        }
        if (surname.length < 3 || surname.length > 255) {
            setFormErrors(true);
            toast.error('Surname invalid and/or need to have between 3 and 255 characters.');
        }
        if (address.length < 3 || address.length > 255) {
            setFormErrors(true);
            toast.error('Address invalid and/or need to have between 3 and 255 characters.');
        }
        if (!isEmail(email)){
            setFormErrors(true);
            toast.error('Email invalid.');
        }
        if (password !== repeatPassword) {
            setFormErrors(true);
            toast.error('Password needs to be the same.');
        }
        if (password.length < 6 || repeatPassword.length < 6) {
            setFormErrors(true);
            toast.error('Password needs to have 6 characters or more.');
        }
        async function getData(){
            try{
                if (!formErrors){
                    await axios.post('/users', user);
                    dispatch(registerSuccess(user));
                    dispatch(loginSuccess(user));
                    history.push('/');
                }
            }
            catch(e){console.log(e);}
        }
        getData();
    }, [address.length, dispatch, email, formErrors, name.length, password, repeatPassword, surname.length, user]);
    return (
        <Container>
            {(!isLoggedIn && 
                (
                <Form onSubmit={handleSubmit}>
                    <h2>Create an account</h2>
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
                    <label htmlFor='password'>Repeat password</label>
                    <Input field={repeatPassword} setField={setRepeatPassword} placeholder='password'/>
                    <button type="submit">Create</button>
                </Form>
                ))
                ||
                (<DeleteUser/>)
            }
        </Container>
    );
}
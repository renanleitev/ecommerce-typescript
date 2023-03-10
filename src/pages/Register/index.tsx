import React, {useState, useCallback, useMemo } from 'react';
import { Container, Form } from '../../styles/GlobalStyle';
import { useSelector, useDispatch } from 'react-redux';
import Input from '../../components/Input';
import DeleteUser from '../DeleteUser';
import { IRootState } from '../../store/modules/rootReducer';
import {registerSuccess} from '../../store/modules/login/reducer';
import * as interfaces from '../../interfaces';
import Validation from '../../services/validation';
import {registerUser} from '../../api/users';

export default function Register(){
    const isLoggedIn = useSelector((state: IRootState) => state.login.isLoggedIn);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState(''); 
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
        const formErrors = Validation(user);
        if (!formErrors){
            registerUser(user);
            dispatch(registerSuccess(user));
        }
    }, [dispatch, user]);
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
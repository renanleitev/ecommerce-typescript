import React, {useState, useCallback, useMemo } from 'react';
import { Container, Form } from '../../styles/GlobalStyle';
import { useDispatch } from 'react-redux';
import InputUser from '../../components/InputUser';
import {registerSuccess} from '../../store/modules/login/reducer';
import * as interfaces from '../../interfaces';
import Validation from '../../services/validation';
import {registerUser} from '../../api/users';

export default function Register(){
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
        const formErrors = Validation(user, repeatPassword);
        if (!formErrors){
            registerUser(user);
            dispatch(registerSuccess(user));
        }
    }, [dispatch, repeatPassword, user]);
    return (
            <Container>
                <Form onSubmit={handleSubmit}>
                    <h2>Create an account</h2>
                    <InputUser data={name} setData={setName} placeholder='name'/>
                    <InputUser data={surname} setData={setSurname} placeholder='surname'/>
                    <InputUser data={address} setData={setAddress} placeholder='address'/>
                    <InputUser data={email} setData={setEmail} placeholder='email'/>
                    <InputUser data={password} setData={setPassword} placeholder='password'/>
                    <InputUser data={repeatPassword} setData={setRepeatPassword} placeholder='repeat password'/>
                    <button type="submit">Create</button>
                </Form>
            </Container>
    )
}
import React, {useState, useCallback } from 'react';
import { Container, Form } from '../../styles/GlobalStyle';
import { useDispatch } from 'react-redux';
import Input from '../../components/Input';
import {registerUser} from '../../store/modules/login/reducer';
import * as interfaces from '../../interfaces';
import validationUser from '../../services/validationUser';
import { AppThunkDispatch } from '../../store';

export default function Register(){
    const dispatch = useDispatch<AppThunkDispatch>();
    const [user, setUser] = useState<interfaces.User>();
    const handleSubmit = useCallback((event: React.FormEvent) => {
        event.preventDefault();
        const formErrors = validationUser(user);
        if (!formErrors){
            dispatch(registerUser(user));
        }
    }, [dispatch, user]);
    return (
            <Container>
                <Form onSubmit={handleSubmit}>
                    <h2>Create an account</h2>
                    <Input data={user} setData={setUser} keyName='name' keyValue=''/>
                    <Input data={user} setData={setUser} keyName='surname' keyValue=''/>
                    <Input data={user} setData={setUser} keyName='address' keyValue=''/>
                    <Input data={user} setData={setUser} keyName='email' keyValue=''/>
                    <Input data={user} setData={setUser} keyName='password' keyValue=''/>
                    <button type="submit">Create</button>
                </Form>
            </Container>
    )
}
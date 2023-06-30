import React, {useState, useCallback } from 'react';
import { Container, Form } from '../../styles/GlobalStyle';
import { useDispatch } from 'react-redux';
import Input from '../../components/Input';
import {registerUser} from '../../store/modules/users/reducer';
import * as interfaces from '../../interfaces';
import validationUser from '../../services/validationUser';
import { AppThunkDispatch } from '../../store';
import { toast } from 'react-toastify';
import * as text from '../../services/variablesText';
import history from '../../services/history';

export default function Register(): JSX.Element {
    const dispatch = useDispatch<AppThunkDispatch>();
    const [user, setUser] = useState<interfaces.User>();
    const handleSubmit = useCallback((event: React.FormEvent) => {
        event.preventDefault();
        const formErrors = validationUser(user);
        if(formErrors){
            toast.error(text.errorFormMessage);
        } else {
            toast.success(text.registerUserSuccessfully);
            history.push('/');
            dispatch(registerUser(user));
        }
    }, [dispatch, user]);
    return (
            <Container>
                <Form onSubmit={handleSubmit}>
                    <h2>{text.registerUser}</h2>
                    <Input data={user} setData={setUser} keyName='name' keyValue=''/>
                    <Input data={user} setData={setUser} keyName='surname' keyValue=''/>
                    <Input data={user} setData={setUser} keyName='username' keyValue=''/>
                    <Input data={user} setData={setUser} keyName='address' keyValue=''/>
                    <Input data={user} setData={setUser} keyName='email' keyValue=''/>
                    <Input data={user} setData={setUser} keyName='password' keyValue=''/>
                    <button type="submit">{text.buttonRegisterUser}</button>
                </Form>
            </Container>
    )
}
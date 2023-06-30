import React, { useCallback, useState } from 'react';
import { Form } from '../../styles/GlobalStyle';
import Input from '../../components/Input';
import * as interfaces from '../../interfaces';
import {registerUser} from '../../store/modules/users/reducer';
import { useDispatch } from 'react-redux';
import { AppThunkDispatch } from '../../store';
import { initialUser } from '../../store/modules/users/reducer';
import * as text from '../../services/variablesText';

export default function CreateUser(): JSX.Element{
    const dispatch = useDispatch<AppThunkDispatch>();
    const [user, setUser] = useState<interfaces.User>(initialUser);
    const handleSubmit = useCallback((event: React.FormEvent) => {
        event.preventDefault();
        dispatch(registerUser({...user}));
    }, [dispatch, user]);
    return (
        <Form onSubmit={handleSubmit}>
            <h1>{text.registerUser}</h1> 
            <Input data={user} setData={setUser} keyName='username' keyValue={''}/>
            <Input data={user} setData={setUser} keyName='name' keyValue={''}/>
            <Input data={user} setData={setUser} keyName='surname' keyValue={''}/>
            <Input data={user} setData={setUser} keyName='address' keyValue={''}/>
            <Input data={user} setData={setUser} keyName='email' keyValue={''}/>
            <Input data={user} setData={setUser} keyName='password' keyValue={''}/>
            <button type="submit">{text.registerUser}</button>
        </Form>
    )
}
import React, {useState, useCallback} from 'react';
import { Container, Form } from '../../styles/GlobalStyle';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import InputUser from '../../components/InputUser';
import EditUser from '../EditUser';
import { IRootState } from '../../store/modules/rootReducer';
import {loginSuccess} from '../../store/modules/login/reducer';
import { loginUser } from '../../api/users';
import { toast } from 'react-toastify';
import history from '../../services/history';

export default function Login(){
    const isLoggedIn = useSelector((state: IRootState) => state.login.isLoggedIn);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const handleSubmit = useCallback(async (event: React.FormEvent) => {
        event.preventDefault();
        const user = await loginUser(email, password);
        if (user.name !== '') {
            dispatch(loginSuccess(user));
            toast.success('Login successfully.');
            history.push('/');
        } else {
            toast.error('Email/password invalid.');
        }
    }, [dispatch, email, password]);
    return (
        <Container>
            {(!isLoggedIn && 
                (
                <Form onSubmit={handleSubmit}>
                    <h2>Login</h2>
                    <InputUser field={email} setField={setEmail} placeholder='email'/>
                    <InputUser field={password} setField={setPassword} placeholder='password'/>
                    <Link className='link' to='/register'>
                        Don't have an account? Click here to make a new one!
                    </Link>
                    <button type="submit">Login</button>
                </Form>
                ))
                ||
                (<EditUser/>)
            }
        </Container>
    );
}
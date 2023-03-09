import React, {useState, useCallback} from 'react';
import { Container, Form } from '../../styles/GlobalStyle';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Input from '../../components/Input';
import EditUser from '../EditUser';
import { IRootState } from '../../store/modules/rootReducer';
import {loginSuccess} from '../../store/modules/login/reducer';
import axios from '../../services/axios';
import history from '../../services/history';
import * as interfaces from '../../interfaces';
import {toast} from 'react-toastify';

export default function Login(){
    const isLoggedIn = useSelector((state: IRootState) => state.login.isLoggedIn);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const handleSubmit = useCallback((event: React.FormEvent) => {
        event.preventDefault();
        async function getUser(){
            try{
                const users: interfaces.ResponseGenerator = await axios.get('/users');
                for (let user of users.data){
                    if ((email === user.email) && (password === user.password)) {
                        dispatch(loginSuccess(user));
                        toast.success('Login successful! Redirecting...');
                        history.push('/');
                        break;
                    }
                }
            }
            catch(e){console.log(e);}
        }
        getUser();
    }, [dispatch, email, password]);
    return (
        <Container>
            {(!isLoggedIn && 
                (
                <Form onSubmit={handleSubmit}>
                    <h2>Login</h2>
                    <label htmlFor='email'>Email</label>
                    <Input field={email} setField={setEmail} placeholder='email'/>
                    <label htmlFor='password'>Password</label>
                    <Input field={password} setField={setPassword} placeholder='password'/>
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
import React, {useState, useCallback} from 'react';
import { Container, Form } from '../../styles/GlobalStyle';
import { Link } from 'react-router-dom';
import * as actions from '../../store/modules/login/actions';
import { useSelector, useDispatch } from 'react-redux';
import Input from '../../components/Input';
import EditUser from '../EditUser';
import { IRootState } from '../../store/modules/rootReducer';

export default function Login(){
    const isLoggedIn = useSelector((state: IRootState) => state.login.isLoggedIn);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const handleSubmit = useCallback((event: React.FormEvent) => {
        event.preventDefault();
        dispatch(actions.loginRequest({email, password}));
    }, [dispatch, email, password]);
    return (
        <Container>
            {(!isLoggedIn && 
                (
                <Form onSubmit={handleSubmit}>
                    <h2>Login</h2>
                    <label htmlFor='email'>Email</label>
                    <Input field={email} setField={setEmail} placeholder='Email'/>
                    <label htmlFor='password'>Password</label>
                    <Input field={password} setField={setPassword} placeholder='Password'/>
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
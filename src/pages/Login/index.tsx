import React, {useState, useCallback, useMemo} from 'react';
import { Container, Form } from '../../styles/GlobalStyle';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import InputUser from '../../components/InputUser';
import EditUser from '../EditUser';
import { IRootState } from '../../store/modules/rootReducer';
import {loginUser} from '../../store/modules/login/reducer';
import { AppThunkDispatch } from '../../store';

export default function Login(){
    const dispatch = useDispatch<AppThunkDispatch>();
    const isLoggedIn = useSelector((state: IRootState) => state.login.isLoggedIn);
    const user = useSelector((state: IRootState) => state.login.user);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState(user.password);
    const [loggedUser, setLoggedUser] = useState({
        ...user,
        email: email,
        password: password,
    });
    useMemo(() => {
        setLoggedUser({
            ...user,
            email: email,
            password: password,
        })
    }, [email, password, user]);
    const handleSubmit = useCallback((event: React.FormEvent) => {
        event.preventDefault();
        dispatch(loginUser(loggedUser));
    }, [dispatch, loggedUser]);
    return (
        <Container>
            {(!isLoggedIn && 
                (
                <Form onSubmit={handleSubmit}>
                    <h2>Login</h2>
                    <InputUser data={email} setData={setEmail} placeholder='email'/>
                    <InputUser data={password} setData={setPassword} placeholder='password'/>
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
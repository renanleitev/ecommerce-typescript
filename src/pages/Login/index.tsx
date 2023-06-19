import React, {useState, useCallback} from 'react';
import { Container, Form } from '../../styles/GlobalStyle';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import InputProduct from '../../components/Input';
import EditUser from '../EditUser';
import { IRootState } from '../../interfaces';
import {loginUser} from '../../store/modules/login/reducer';
import { AppThunkDispatch } from '../../store';

export default function Login(): JSX.Element {
    const dispatch = useDispatch<AppThunkDispatch>();
    const isLoggedIn = useSelector((state: IRootState) => state.login.isLoggedIn);
    const user = useSelector((state: IRootState) => state.login.user);
    const [loggedUser, setLoggedUser] = useState(user);
    const handleSubmit = useCallback((event: React.FormEvent) => {
        event.preventDefault();
        dispatch(loginUser(loggedUser));
    }, [dispatch, loggedUser]);
    return (
        <Container>
            {(!isLoggedIn && 
                (<Form onSubmit={handleSubmit}>
                    <h2>Login</h2>
                    <InputProduct data={loggedUser} setData={setLoggedUser} keyName='username' keyValue=''/>
                    <InputProduct data={loggedUser} setData={setLoggedUser} keyName='password' keyValue=''/>
                    <Link className='link' to='/register'>
                        Don't have an account? Click here to make a new one!
                    </Link>
                    <button type="submit">Login</button>
                </Form>))
                ||
                (<EditUser user={{...user}}/>)}
        </Container>
    );
}
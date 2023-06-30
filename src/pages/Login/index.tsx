import React, {useState, useCallback} from 'react';
import { Container, Form } from '../../styles/GlobalStyle';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import InputProduct from '../../components/Input';
import EditUser from '../EditUser';
import { IRootState } from '../../interfaces';
import {loginUser, initialUser} from '../../store/modules/users/reducer';
import { AppThunkDispatch } from '../../store';
import validationUser from '../../services/validationUser';
import { toast } from 'react-toastify';
import * as text from '../../services/variablesText';
import history from '../../services/history';

export default function Login(): JSX.Element {
    const dispatch = useDispatch<AppThunkDispatch>();
    const isLoggedIn = useSelector((state: IRootState) => state.users.isLoggedIn) || false;
    const user = useSelector((state: IRootState) => state.users.user) || initialUser;
    const [loggedUser, setLoggedUser] = useState(user);
    const handleSubmit = useCallback((event: React.FormEvent) => {
        event.preventDefault();
        const formErrors = validationUser(loggedUser);
        if(formErrors){
            toast.error(text.errorFormMessage);
        } else {
            toast.success(text.loginUserSuccessfully);
            history.push('/');
            dispatch(loginUser(loggedUser));
        }
    }, [dispatch, loggedUser]);
    return (
        <Container>
            {(!isLoggedIn && 
                (<Form onSubmit={handleSubmit}>
                    <h2>{text.loginUser}</h2>
                    <InputProduct data={loggedUser} setData={setLoggedUser} keyName='username' keyValue=''/>
                    <InputProduct data={loggedUser} setData={setLoggedUser} keyName='password' keyValue=''/>
                    <Link className='link' to='/register'>
                        {text.registerUser}
                    </Link>
                    <button type="submit">{text.loginUser}</button>
                </Form>))
                ||
                (<EditUser user={{...user}}/>)}
        </Container>
    );
}
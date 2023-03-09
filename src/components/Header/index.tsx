import React, {useCallback} from 'react';
import { 
    FaHome, 
    FaSignInAlt, 
    FaUserAlt, 
    FaUserEdit, 
    FaUserPlus,
    FaUserMinus, 
    FaShoppingCart, 
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Nav } from './styled';
import history from '../../services/history';
import {toast} from 'react-toastify';
import { IRootState } from '../../store/modules/rootReducer';
import {loginSuccess} from '../../store/modules/login/reducer';
import {removeCart} from '../../store/modules/products/reducer';

export default function Header(){
    const isLoggedIn = useSelector((state: IRootState) => state.login.isLoggedIn);
    const user = useSelector((state: IRootState) => state.login.user);
    const dispatch = useDispatch();
    const handleLogin = useCallback(() => {
        if (isLoggedIn) {
            dispatch(loginSuccess(user));
            dispatch(removeCart());
            toast.success('Logout sucessufully.');
            history.push('/');
        }
    }, [isLoggedIn, dispatch, user]);
    return (
        <Nav>
            <Link to="/">
                <FaHome size={24}/>
            </Link>
            <Link to="/login">
                {(isLoggedIn && (<FaUserEdit size={30}/>)) || (<FaUserAlt size={24}/>)}
            </Link>
            <Link to="/register">
                {(isLoggedIn && (<FaUserMinus size={30}/>)) || (<FaUserPlus size={30}/>)}
            </Link>
            <Link to="/shopping">
                {isLoggedIn && <FaShoppingCart size={24}/>}
            </Link>
            <Link to="/">
                {isLoggedIn && <FaSignInAlt onClick={handleLogin} size={24}/>}
            </Link>
            {isLoggedIn && <p><Link to='/login'>Welcome, {user.name}!</Link></p>}
        </Nav>
    );
}
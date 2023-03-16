import React, {useCallback} from 'react';
import { 
    FaHome, 
    FaSignInAlt, 
    FaUserAlt, 
    FaUserEdit, 
    FaUserPlus,
    FaShoppingCart, 
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Nav, Cart } from './styled';
import history from '../../services/history';
import {toast} from 'react-toastify';
import { IRootState } from '../../store/modules/rootReducer';
import {logoutSuccess} from '../../store/modules/login/reducer';
import {removeCart} from '../../store/modules/products/reducer';

export default function Header(){
    const isLoggedIn = useSelector((state: IRootState) => state.login.isLoggedIn);
    const user = useSelector((state: IRootState) => state.login.user);
    const cart = useSelector((state: IRootState) => state.products.cart);
    const dispatch = useDispatch();
    const handleLogin = useCallback(() => {
        if (isLoggedIn) {
            dispatch(logoutSuccess());
            dispatch(removeCart());
            toast.success('Logout sucessufully.');
            history.push('/');
        }
    }, [isLoggedIn, dispatch]);
    return (
        <Nav>
            <Link to="/">
                <FaHome size={24}/>
            </Link>
            {isLoggedIn ? (
                <Link to="/edit">
                    <FaUserEdit size={30}/>
                </Link>
                ) : (
                <Link to="/login">
                    <FaUserAlt size={24}/>
                </Link>
            )}
            {!isLoggedIn &&
            <Link to="/register">
                <FaUserPlus size={30}/>
            </Link>
            }
            <Link to="/shopping">
                {isLoggedIn && (
                    <Cart>
                        <p>{cart.length}</p>
                        <FaShoppingCart size={24}/>
                    </Cart>
                )}
            </Link>
            <Link to="/">
                {isLoggedIn && <FaSignInAlt onClick={handleLogin} size={24}/>}
            </Link>
            {isLoggedIn ? 
            (<p><Link to='/edit'>Welcome, {user.name}!</Link></p>) : 
            (<p><Link to='/login'>Login</Link></p>)}
        </Nav>
    );
}
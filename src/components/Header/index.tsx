import React, {useCallback} from 'react';
import { 
    FaHome, 
    FaSignInAlt, 
    FaUserAlt, 
    FaUserEdit, 
    FaUserPlus,
    FaShoppingCart,
    FaSearch, 
    FaShoppingBag,
    FaKey
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Nav, Cart } from './styled';
import history from '../../services/history';
import {toast} from 'react-toastify';
import { IRootState } from '../../interfaces';
import {logoutSuccess} from '../../store/modules/login/reducer';
import {removeAllProductsCart, resetShoppingList} from '../../store/modules/products/reducer';

export default function Header(): JSX.Element {
    const isLoggedIn = useSelector((state: IRootState) => state.login.isLoggedIn);
    const user = useSelector((state: IRootState) => state.login.user);
    const shoppingCart = useSelector((state: IRootState) => state.products.shoppingCart) || [];
    const dispatch = useDispatch();
    const handleLogin = useCallback(() => {
        if (isLoggedIn) {
            dispatch(logoutSuccess());
            dispatch(resetShoppingList());
            dispatch(removeAllProductsCart());
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
                <Link to="/auth/edit">
                    <FaUserEdit size={30}/>
                </Link>
                ) : (
                <Link to="/auth/login">
                    <FaUserAlt size={24}/>
                </Link>
            )}
            {!isLoggedIn &&
            <Link to="/register">
                <FaUserPlus size={30}/>
            </Link>
            }
            <Link to="/shoppingCart">
                {isLoggedIn && (
                    <Cart>
                        <p>{shoppingCart.length}</p>
                        <FaShoppingCart size={24}/>
                    </Cart>
                )}
            </Link>
            <Link to="/shoppingList">
                {isLoggedIn && (
                    <Cart>
                        <FaShoppingBag size={24}/>
                    </Cart>
                )}
            </Link>
            <Link to="/searching">
                <FaSearch size={24}/>
            </Link>
            {user.role === 'ROLE_ADMIN' ? 
            <Link to="/admin">
                <FaKey size={24}/>
            </Link> : <></>}
            <Link to="/">
                {isLoggedIn && <FaSignInAlt onClick={handleLogin} size={24}/>}
            </Link>
            {isLoggedIn ? 
            (<p><Link to='/edit'>Welcome, {user.name}!</Link></p>) : 
            (<p><Link to='/auth/login'>Login</Link></p>)}
        </Nav>
    );
}
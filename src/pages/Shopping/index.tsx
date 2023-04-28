import React, { useCallback, useEffect, useState } from 'react';
import {FaShoppingCart} from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { 
    CartContainer, 
    ShoppingContainer, 
    ButtonContainer, 
    ItemContainer,
    CheckoutContainer } from './styled';
import { Link } from 'react-router-dom';
import * as interfaces from '../../interfaces';
import {removeProductCart} from '../../store/modules/products/reducer';
import { addProductQuantity } from '../../services/addProductQuantity';
import { removeProductQuantity } from '../../services/removeProductQuantity';
import { checkoutCart } from '../../services/checkoutCart';

export default function Shopping(){
    const cart = useSelector((state: interfaces.IRootState) => state.products.cart);
    const isLoggedIn = useSelector((state: interfaces.IRootState) => state.login.isLoggedIn);
    const dispatch = useDispatch();
    const [shoppingCart, setShoppingCart] = useState([...cart]);
    useEffect(() => {
        setShoppingCart([...cart]);
    }, [cart]);
    const handleIncrement = useCallback((item: interfaces.Product) => { 
        addProductQuantity(item, dispatch);
        setShoppingCart([...cart]);
    }, [addProductQuantity]);
    const handleDecrement = useCallback((item: interfaces.Product) => {
        removeProductQuantity(item, dispatch);
        setShoppingCart([...cart]);
    }, [removeProductQuantity]);
    const handleRemove = useCallback((item: interfaces.Product) => {
        if (item !== undefined) dispatch(removeProductCart(item));
    }, [dispatch]);
    return (
        <CartContainer>
            {isLoggedIn ? (
                <CheckoutContainer onClick={() => checkoutCart(cart)}>
                    <FaShoppingCart size={30}/>
                </CheckoutContainer>
                ) : (<></>)}
            {isLoggedIn && shoppingCart.length >= 1 ? (
                shoppingCart.map((item: interfaces.Product, index: number) => (
                    <ItemContainer key={index}>
                        <ShoppingContainer key={index+1}>
                            <Link to={`product/${item.id}`} key={index+2}>{item.name}</Link>
                            <img key={index+3} src={item.images} alt=''/>
                            <p key={index+4}>Price: ${item.price}</p>
                            <p key={index+5}>Quantity: {item.quantity}</p>
                            <p key={index+6}>Total: ${item.totalPrice.toFixed(2)}</p>
                        </ShoppingContainer>
                        <ButtonContainer key={index+7}>
                                <button onClick={() => handleIncrement(item)}>+</button>
                                <button onClick={() => handleDecrement(item)}>-</button>
                                <button onClick={() => handleRemove(item)}>Remove item</button>
                        </ButtonContainer>
                    </ItemContainer>
                ))
            )
             : (
                <ItemContainer>
                    <h2>No products in your cart.</h2>
                </ItemContainer>
            )}
        </CartContainer> 
    )
}
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
import { toast } from 'react-toastify';
import { IRootState } from '../../store/modules/rootReducer';
import * as interfaces from '../../interfaces';
import {changeQuantity, removeItem} from '../../store/modules/products/reducer';

export default function Shopping(){
    const cart = useSelector((state: IRootState) => state.products.cart);
    const isLoggedIn = useSelector((state: IRootState) => state.login.isLoggedIn);
    const dispatch = useDispatch();
    const [shoppingCart, setShoppingCart] = useState([...cart]);
    useEffect(() => {
        setShoppingCart([...cart]);
    }, [cart]);
    const handleCheckout = useCallback(() => {
        let total = 0;
        cart.forEach((element: any) => {
            total += element.totalPrice;
        });
        toast.success(`Thank you! Your total is $${total}`);
    }, [cart]);
    const handleIncrement = useCallback((item: interfaces.Product) => {
        item.quantity++;
        item.totalPrice = item.price * item.quantity;
        dispatch(changeQuantity({...item}));
        toast.success(`Added ${item.name} successfully!`);
        setShoppingCart([...cart]);
    }, [cart, dispatch]);
    const handleDecrement = useCallback((item: interfaces.Product) => {
        item.quantity--;
        item.totalPrice = item.price * item.quantity;
        dispatch(changeQuantity({...item}));
        toast.success(`Removed ${item.name} successfully!`);
        setShoppingCart([...cart]);
    }, [cart, dispatch]);
    const handleRemove = useCallback((index: number) => {
        dispatch(removeItem(index));
        // toast.success(`Product ${item.name} removed successfully!`);
    }, [dispatch]);
    return (
        <CartContainer>
            {isLoggedIn ? (<CheckoutContainer onClick={handleCheckout}><FaShoppingCart size={30}/></CheckoutContainer>) : (<></>)}
            {isLoggedIn && shoppingCart.length > 1 ? (
                shoppingCart
                .slice(1)
                .map((item: any, index: number) => (
                    <ItemContainer key={index}>
                        <ShoppingContainer key={index+1}>
                            <Link to={`product/${item.id}`} key={index+2}>{item.name}</Link>
                            <img key={index+3} src={item.images} alt=''/>
                            <p key={index+4}>Price: ${item.price}</p>
                            <p key={index+5}>Quantity: {item.quantity}</p>
                            <p key={index+6}>Total: ${item.totalPrice}</p>
                        </ShoppingContainer>
                        <ButtonContainer key={index+7}>
                                <button onClick={() => handleIncrement(item)}>+</button>
                                <button onClick={() => handleDecrement(item)}>-</button>
                                <button onClick={() => handleRemove(index)}>Remove item</button>
                        </ButtonContainer>
                    </ItemContainer>
                ))
            ) : (
                <ItemContainer>
                    <h1>You must be logged in to visualize your cart.</h1>
                </ItemContainer>
            )}
        </CartContainer> 
    )
}
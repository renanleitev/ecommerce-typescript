import React, { useCallback, useEffect, useState } from 'react';
import {FaShoppingCart} from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/modules/products/actions';
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
        dispatch(actions.changeQuantity({...item}));
        toast.success(`Added ${item.name} successfully!`);
        setShoppingCart([...cart]);
    }, [cart, dispatch]);
    const handleDecrement = useCallback((item: interfaces.Product) => {
        item.quantity--;
        item.totalPrice = item.price * item.quantity;
        dispatch(actions.changeQuantity({...item}));
        toast.success(`Removed ${item.name} successfully!`);
        setShoppingCart([...cart]);
    }, [cart, dispatch]);
    const handleRemove = useCallback((item: interfaces.Product) => {
        dispatch(actions.removeProduct(item.id));
        toast.success(`Product ${item.name} removed successfully!`);
    }, [dispatch]);
    return (
        <CartContainer>
            {isLoggedIn ? (<CheckoutContainer onClick={handleCheckout}><FaShoppingCart size={30}/></CheckoutContainer>) : (<></>)}
            {isLoggedIn ? (
                shoppingCart.map((item: any) => (
                    <ItemContainer key={item.id}>
                        <ShoppingContainer key={item.id+1}>
                            <Link to={`product/${item.id}`} key={item.id+2}>{item.name}</Link>
                            <img key={item.id+3} src={item.images} alt=''/>
                            <p key={item.id+4}>Price: ${item.price}</p>
                            <p key={item.id+5}>Quantity: {item.quantity}</p>
                            <p key={item.id+6}>Total: ${item.totalPrice}</p>
                        </ShoppingContainer>
                        <ButtonContainer key={item.id+7}>
                                <button onClick={() => handleIncrement(item)}>+</button>
                                <button onClick={() => handleDecrement(item)}>-</button>
                                <button onClick={() => handleRemove(item)}>Remove item</button>
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
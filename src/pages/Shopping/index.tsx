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
import Loading from '../../components/Loading';

export default function Shopping(){
    const cart = useSelector((state: IRootState) => state.products.cart);
    const isLoggedIn = useSelector((state: IRootState) => state.login.isLoggedIn);
    const dispatch = useDispatch();
    const [shoppingCart, setShoppingCart] = useState([...cart]);
    useEffect(() => {
        setShoppingCart([...cart]);
    }, [cart]);
    const changeProductQuantity = useCallback(
        (item: interfaces.Product, operation: string) => {
        const newItem: interfaces.Product = {...item}; 
        if (operation === 'add') {
            newItem.quantity++;
            newItem.totalPrice = item.totalPrice + Number.parseFloat(item.price);
            toast.success(`Added ${item.name} successfully!`);
        }
        if (operation === 'remove' && item.quantity > 0){
            newItem.quantity--;
            newItem.totalPrice = item.totalPrice - Number.parseFloat(item.price);
            toast.success(`Removed ${item.name} successfully!`);
        }
        dispatch(changeQuantity({...newItem}));
        setShoppingCart([...cart]);
    }, [cart, dispatch])
    const handleCheckout = useCallback(() => {
        let total = 0;
        cart.forEach((item: interfaces.Product) => {
            if (item !== undefined) total += item.totalPrice;
        });
        toast.success(`Thank you! Your total is $${total}`);
    }, [cart]);
    const handleIncrement = useCallback((item: interfaces.Product) => { 
        changeProductQuantity(item, 'add');
    }, [changeProductQuantity]);
    const handleDecrement = useCallback((item: interfaces.Product) => {
        changeProductQuantity(item, 'remove');
    }, [changeProductQuantity]);
    const handleRemove = useCallback((item: interfaces.Product) => {
        if (item !== undefined) dispatch(removeItem(item));
    }, [dispatch]);
    return (
        <CartContainer>
            <Loading/>
            {isLoggedIn ? (
                <CheckoutContainer onClick={handleCheckout}>
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
            ) : (
                <ItemContainer>
                    <h2>No products in your cart.</h2>
                </ItemContainer>
            )}
        </CartContainer> 
    )
}
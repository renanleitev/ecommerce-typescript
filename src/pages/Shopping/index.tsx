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
    const handleIncrement = useCallback((product: interfaces.Product) => { 
        addProductQuantity(product, dispatch);
        setShoppingCart([...cart]);
    }, [addProductQuantity]);
    const handleDecrement = useCallback((product: interfaces.Product) => {
        removeProductQuantity(product, dispatch);
        setShoppingCart([...cart]);
    }, [removeProductQuantity]);
    const handleRemove = useCallback((product: interfaces.Product) => {
        if (product !== undefined) dispatch(removeProductCart(product));
    }, [dispatch]);
    return (
        <CartContainer>
            {isLoggedIn ? (
                <CheckoutContainer onClick={() => checkoutCart(cart)}>
                    <FaShoppingCart size={30}/>
                </CheckoutContainer>
                ) : (<></>)}
            {isLoggedIn && shoppingCart.length >= 1 ? 
                React.Children.toArray(
                    shoppingCart.map((product: interfaces.Product) => (
                        <ItemContainer>
                        <ShoppingContainer>
                            <Link to={`products/${product.id}`}>{product.name}</Link>
                            <img src={product.image} alt=''/>
                            <p>Price: ${product.price}</p>
                            <p>Quantity: {product.quantity}</p>
                            <p>Total: ${product.totalPrice.toFixed(2)}</p>
                        </ShoppingContainer>
                        <ButtonContainer>
                                <button onClick={() => handleIncrement(product)}>+</button>
                                <button onClick={() => handleDecrement(product)}>-</button>
                                <button onClick={() => handleRemove(product)}>Remove product</button>
                        </ButtonContainer>
                    </ItemContainer>
                )))
             : (
                <ItemContainer>
                    <h2>No products in your cart.</h2>
                </ItemContainer>
            )}
        </CartContainer> 
    )
}
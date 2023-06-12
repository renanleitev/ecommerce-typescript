import React, { useCallback, useEffect, useState } from 'react';
import {
    FaShoppingCart, 
    FaTrash,
    FaPlus,
    FaMinus,
} from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { 
    CartContainer, 
    ShoppingContainer, 
    ButtonContainer, 
    ItemContainer,
    CheckoutContainer } from './styled';
import { Link } from 'react-router-dom';
import * as interfaces from '../../interfaces';
import {removeProductCart, saveShoppings} from '../../store/modules/products/reducer';
import { addProductQuantity } from '../../services/addProductQuantity';
import { removeProductQuantity } from '../../services/removeProductQuantity';
import { AppThunkDispatch } from '../../store';
import FontAwesomeButton from '../../components/FontAwesomeButton';

export default function Shopping(): JSX.Element{
    const user = useSelector((state: interfaces.IRootState) => state.login.user);
    const cart = useSelector((state: interfaces.IRootState) => state.products.shoppingCart);
    const isLoggedIn = useSelector((state: interfaces.IRootState) => state.login.isLoggedIn);
    const dispatch = useDispatch<AppThunkDispatch>();
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
    const checkoutCart = useCallback((productsList: Array<interfaces.Product>, user: interfaces.User) => {
        const newShoppingCart: interfaces.ShoppingCart = {
            userId: 0,
            productId: 0,
            quantity: 0,
            totalPrice: 0,
        };
        const shoppingCartList: Array<interfaces.ShoppingCart> = [];
        productsList.map((product: interfaces.Product) => {
            newShoppingCart.userId = Number.parseInt(user.id);
            newShoppingCart.productId = Number.parseInt(product.id);
            newShoppingCart.quantity = product.quantity;
            newShoppingCart.totalPrice = product.totalPrice;
            shoppingCartList.push({...newShoppingCart});
        });
        dispatch(saveShoppings(shoppingCartList));
    }, [dispatch]);
    return (
        <>
        {isLoggedIn ? (
        <CheckoutContainer onClick={() => checkoutCart(cart, user)}>
            <FaShoppingCart size={30}/>
        </CheckoutContainer>
        ) : (<></>)}
        <CartContainer>
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
                                <FontAwesomeButton icon={FaPlus} onClickFunction={() => handleIncrement(product)}/>
                                <FontAwesomeButton icon={FaMinus} onClickFunction={() => handleDecrement(product)}/>
                                <FontAwesomeButton icon={FaTrash} onClickFunction={() => handleRemove(product)}/>
                        </ButtonContainer>
                    </ItemContainer>
                )))
                : (
                    <ItemContainer>
                    <h2>No products in your cart.</h2>
                </ItemContainer>
            )}
        </CartContainer> 
        </>
    )
}
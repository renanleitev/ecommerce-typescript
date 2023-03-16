import React, { useCallback, useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ItemContainer, CartButton } from './styled';
import {ProductContainer} from '../Home/styled';
import EditProduct from '../EditProduct';
import {toast} from 'react-toastify';
import { IRootState } from '../../store/modules/rootReducer';
import * as interfaces from '../../interfaces';
import {
    addItem,
    changeQuantity,
    removeItem
} from '../../store/modules/products/reducer';
import { showProduct } from '../../store/modules/products/reducer';
import Modal from '../../components/Modal';
import useModal from "../../hooks/useModal";
import { AppThunkDispatch } from '../../store';

export default function Product(){
    interface Url{
        id: string,
    }
    const url: Url = useParams();
    const dispatch = useDispatch<AppThunkDispatch>();
    const user = useSelector((state: IRootState) => state.login.user);
    const cart = useSelector((state: IRootState) => state.products.cart);
    const product = useSelector((state: IRootState) => state.products.product);
    const isLoggedIn = useSelector((state: IRootState) => state.login.isLoggedIn);
    const [quantity, setQuantity] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const { isOpen, toggle } = useModal();
    const [item, setItem] = useState<interfaces.Product>({
        ...product,
        totalPrice: totalPrice,
        quantity: quantity,
    });
    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
        if (user.name === 'admin') setIsAdmin(true);
    }, [user.name]);
    useMemo(() => {
        cart.forEach((element: interfaces.Product) => {
            if (element.id === item.id){
                item.totalPrice = element.totalPrice;
                item.quantity = element.quantity;
            } 
        });
    }, [cart, item]);
    useEffect(() => {
        dispatch(showProduct(url.id));
    }, [dispatch, url.id]);
    useMemo(() => {
        setItem({
                    ...product,
                    totalPrice: totalPrice,
                    quantity: quantity,
                })
    }, [product, quantity, totalPrice]);
    const changeItemQuantity = useCallback((operation: string) => {
        if (operation === 'add') {
            item.totalPrice = totalPrice + Number.parseFloat(item.price);
            item.quantity++;
            toast.success(`Added ${item.name} successfully!`);
        }
        if (operation === 'remove'){
            item.totalPrice = totalPrice - Number.parseFloat(item.price);
            item.quantity--;
            toast.success(`Removed ${item.name} successfully!`);
        }
        dispatch(changeQuantity({...item}));
        setQuantity(item.quantity);
        setTotalPrice(item.totalPrice);
    }, [dispatch, item, totalPrice]);
    const addProduct = useCallback(() => {
        if (isLoggedIn){
            const findItem = cart.find((product: interfaces.Product) => product.id === item.id);
            if (findItem) {
                changeItemQuantity('add');
            } else {
                changeItemQuantity('add');
                dispatch(addItem({...item}));
            } 
        }
        if (!isLoggedIn) toast.error('You must be logged in!');
    }, [isLoggedIn, cart, item, changeItemQuantity, dispatch]);
    const removeProduct = useCallback(() => {
        if (isLoggedIn){
            dispatch(removeItem(item));
            toast.success(`Removed ${item.name} successfully!`);
            setQuantity(0);
            setTotalPrice(0);
        }
        if (!isLoggedIn) toast.error('You must be logged in!');
    }, [dispatch, isLoggedIn, item]);
    const incrementQuantity = useCallback(() => {
        if (isLoggedIn && item.quantity > 0) changeItemQuantity('add');
        if (!isLoggedIn || item.quantity === 0) toast.error('Can not add the item.');
    }, [changeItemQuantity, isLoggedIn, item]);
    const decrementQuantity = useCallback(() => {
        if (isLoggedIn && item.quantity > 1) changeItemQuantity('remove');
        if (!isLoggedIn || item.quantity === 0) toast.error('Can not remove the item.');
    }, [changeItemQuantity, isLoggedIn, item]);
    return (
        <ProductContainer>
            <Modal isOpen={isOpen} toggle={toggle}>
                <EditProduct item={item}/>
            </Modal>
            <ItemContainer>
                <h1>Info</h1> 
                <p>Operational System: {item.os}</p>
                <p>Additional Features: {item.additionalFeatures}</p>
                <p>Description: {item.description}</p>
                <ProductContainer>
                    <CartButton onClick={addProduct}>Add to cart</CartButton>
                    <CartButton onClick={incrementQuantity}>+</CartButton>
                    <CartButton onClick={decrementQuantity}>-</CartButton>
                    <CartButton onClick={removeProduct}>Remove item</CartButton>
                    {isAdmin ? (<CartButton onClick={toggle}>Edit Product</CartButton>) : (<></>)}
                </ProductContainer>
            </ItemContainer> 
            <ItemContainer> 
                <p>{item.name}</p>
                <img src={item.images} alt=''/>
                <p>Price: ${item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Total: ${item.totalPrice.toFixed(2)}</p>
            </ItemContainer> 
        </ProductContainer>       
    )
}
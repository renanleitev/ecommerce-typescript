import React, { useCallback, useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ItemContainer, CartButton } from './styled';
import {ProductContainer} from '../Home/styled';
import EditProduct from '../EditProduct';
import {toast} from 'react-toastify';
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
import Loading from '../../components/Loading';

export default function Product(){
    interface Url{
        id: string,
    }
    const url: Url = useParams();
    const dispatch = useDispatch<AppThunkDispatch>();
    const user = useSelector((state: interfaces.IRootState) => state.login.user);
    const cart = useSelector((state: interfaces.IRootState) => state.products.cart);
    const product = useSelector((state: interfaces.IRootState) => state.products.product);
    const isLoggedIn = useSelector((state: interfaces.IRootState) => state.login.isLoggedIn);
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
    const changeProductQuantity = useCallback((operation: string) => {
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
                changeProductQuantity('add');
            } else {
                changeProductQuantity('add');
                dispatch(addItem({...item}));
            } 
        }
        if (!isLoggedIn) toast.error('You must be logged in!');
    }, [isLoggedIn, cart, item, changeProductQuantity, dispatch]);
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
        if (isLoggedIn && item.quantity > 0) changeProductQuantity('add');
        if (!isLoggedIn || item.quantity === 0) toast.error('Can not add the item.');
    }, [changeProductQuantity, isLoggedIn, item]);
    const decrementQuantity = useCallback(() => {
        if (isLoggedIn && item.quantity > 1) changeProductQuantity('remove');
        if (!isLoggedIn || item.quantity === 0) toast.error('Can not remove the item.');
    }, [changeProductQuantity, isLoggedIn, item]);
    return (
        <ProductContainer>
            <Loading/>
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
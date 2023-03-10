import React, { useCallback, useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ItemContainer, CartButton } from './styled';
import {ProductContainer} from '../Home/styled';
import {toast} from 'react-toastify';
import { IRootState } from '../../store/modules/rootReducer';
import * as interfaces from '../../interfaces';
import {
    findProduct, 
    addItem,
    changeQuantity,
    removeItem
} from '../../store/modules/products/reducer';
import { showProduct } from '../../api/products';

export default function Product(){
    interface Url{
        id: string,
    }
    const url: Url = useParams();
    const id = url.id;
    const dispatch = useDispatch();
    const cart = useSelector((state: IRootState) => state.products.cart);
    const product = useSelector((state: IRootState) => state.products.product);
    const isLoggedIn = useSelector((state: IRootState) => state.login.isLoggedIn);
    const [quantity, setQuantity] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [firsLoad, setFirstLoad] = useState(true);
    const [item, setItem] = useState<interfaces.Product>({
        ...product,
        totalPrice: totalPrice,
        quantity: quantity,
    });
    useEffect(() => {
        cart.forEach((element: interfaces.Product) => {
            if (element.id === item.id){
                item.quantity = element.quantity;
                item.totalPrice = element.totalPrice; 
            } 
        });
    }, [cart, item]);
    useEffect(() => {
        async function getProduct(){
            if (firsLoad){
                const response = await showProduct(id);
                dispatch(findProduct(response));
            } 
            setFirstLoad(false);
        }
        getProduct();
    }, [dispatch, firsLoad, id]);
    useMemo(() => {
        setItem({
                    ...product,
                    totalPrice: totalPrice,
                    quantity: quantity,
                })
    }, [product, quantity, totalPrice]);
    const addProduct = useCallback(() => {
        if (isLoggedIn){
            const findItem = cart.find((product: interfaces.Product) => product.id === item.id);
            if (findItem) {
                item.quantity++;
                setQuantity(item.quantity);
                item.totalPrice = totalPrice + Number.parseFloat(item.price);
                setTotalPrice(item.totalPrice);
                dispatch(changeQuantity({...item}));
            } else {
                item.quantity++;
                setQuantity(item.quantity);
                item.totalPrice = totalPrice + Number.parseFloat(item.price);
                setTotalPrice(item.totalPrice);
                dispatch(addItem({...item}));
            } 
            toast.success(`Added ${item.name} successfully!`);
            setQuantity(quantity+1);
            setTotalPrice(totalPrice + Number.parseFloat(item.price));
        }
        if (!isLoggedIn) toast.error('You must be logged in!');
    }, [cart, dispatch, isLoggedIn, item, quantity, totalPrice]);
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
        if (isLoggedIn && quantity > 0){
            item.quantity++;
            setQuantity(item.quantity);
            item.totalPrice = totalPrice + Number.parseFloat(item.price);
            setTotalPrice(item.totalPrice);
            dispatch(changeQuantity({...item}));
            toast.success(`Added ${item.name} successfully!`);
        }
        if (!isLoggedIn || quantity === 0) toast.error('Can not add the item.');
    }, [dispatch, isLoggedIn, item, quantity, totalPrice]);
    const decrementQuantity = useCallback(() => {
        if (isLoggedIn && quantity > 1){
            item.quantity--;
            setQuantity(item.quantity);
            item.totalPrice = totalPrice - Number.parseFloat(item.price);
            setTotalPrice(item.totalPrice);
            dispatch(changeQuantity({...item}));
            toast.success(`Removed ${item.name} successfully!`);
        }
        if (!isLoggedIn || quantity === 0) toast.error('Can not remove the item.');
    }, [dispatch, isLoggedIn, item, quantity, totalPrice]);
    return (
        <ProductContainer>
            <ItemContainer>
                <h1>Info</h1> 
                <p>Operational System: {item.os}</p>
                <p>Resolution: {item.display.screenResolution}</p>
                <p>Screen Size: {item.display.screenSize}</p>
                <p>Storage: {item.storage.hdd}</p>
                <p>Memory: {item.storage.ram}</p>
                <p>CPU: {item.hardware.cpu}</p>
                <p>Wifi: {item.connectivity.wifi}</p>
                <p>Description: {item.description}</p>
                <ProductContainer>
                    <CartButton onClick={addProduct}>Add to cart</CartButton>
                    <CartButton onClick={incrementQuantity}>+</CartButton>
                    <CartButton onClick={decrementQuantity}>-</CartButton>
                    <CartButton onClick={removeProduct}>Remove item</CartButton>
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
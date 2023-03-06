import React, { useEffect, useCallback, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/modules/products/actions';
import { ItemContainer, CartButton } from './styled';
import {ProductContainer} from '../Home/styled';
import {toast} from 'react-toastify';
import { IRootState } from '../../store/modules/rootReducer';
import * as interfaces from '../../interfaces';

export default function Product(){
    const url: any = useParams();
    const id = Number.parseInt(url.id);
    const dispatch = useDispatch();
    const cart = useSelector((state: IRootState) => state.products.cart);
    const isLoggedIn = useSelector((state: IRootState) => state.login.isLoggedIn);
    const [quantity, setQuantity] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const product = useSelector((state: IRootState) => state.products.product);
    const [item, setItem] = useState<interfaces.Product>({
        id: id,
        name: product.data.name,
        images: product.data.images,
        price: product.data.price,
        totalPrice: totalPrice,
        quantity: quantity,
    });
    useMemo(() => {
        setItem(
                {
                    id: id,
                    name: product.data.name,
                    images: product.data.images,
                    price: product.data.price,
                    totalPrice: totalPrice,
                    quantity: quantity,
                }
        )
    }, [id, product.data.images, product.data.name, product.data.price, quantity, totalPrice]);
    useEffect(() => {
        dispatch(actions.findProduct({id}));
    }, [dispatch, id]);
    const addProduct = useCallback(() => {
        if (isLoggedIn){
            const findItem = cart.find((product: any) => product.id === item.id);
            if (findItem) {
                item.quantity++;
                setQuantity(item.quantity);
                item.totalPrice = totalPrice + product.data.price;
                setTotalPrice(item.totalPrice);
            } else {
                item.quantity++;
                setQuantity(item.quantity);
                item.totalPrice = totalPrice + product.data.price;
                setTotalPrice(item.totalPrice);
                dispatch(actions.addProduct({...item}));
            } 
            toast.success(`Added ${item.name} successfully!`);
            setQuantity(quantity+1);
            setTotalPrice(totalPrice + product.data.price);
        }
        if (!isLoggedIn) toast.error('You must be logged in!');
    }, [cart, dispatch, isLoggedIn, item, product.data.price, quantity, totalPrice]);
    const removeProduct = useCallback(() => {
        if (isLoggedIn){
            dispatch(actions.removeProduct(id));
            toast.success(`Removed ${item.name} successfully!`);
            setQuantity(0);
            setTotalPrice(0);
        }
        if (!isLoggedIn) toast.error('You must be logged in!');
    }, [dispatch, id, isLoggedIn, item.name]);
    const incrementQuantity = useCallback(() => {
        if (isLoggedIn && quantity > 0){
            item.quantity++;
            setQuantity(item.quantity);
            item.totalPrice = totalPrice + item.price;
            setTotalPrice(item.totalPrice);
            dispatch(actions.changeQuantity({...item}));
            toast.success(`Added ${item.name} successfully!`);
        }
        if (!isLoggedIn || quantity === 0) toast.error('Can not add the item.');
    }, [dispatch, isLoggedIn, item, quantity, totalPrice]);
    const decrementQuantity = useCallback(() => {
        if (isLoggedIn && quantity > 1){
            item.quantity--;
            setQuantity(item.quantity);
            item.totalPrice = totalPrice - item.price;
            setTotalPrice(item.totalPrice);
            dispatch(actions.changeQuantity({...item}));
            toast.success(`Removed ${item.name} successfully!`);
        }
        if (!isLoggedIn || quantity === 0) toast.error('Can not remove the item.');
    }, [dispatch, isLoggedIn, item, quantity, totalPrice]);
    return (
        <ProductContainer>
            <ItemContainer>
                <h1>Info</h1> 
                <p>Operational System: {product.data.os}</p>
                <p>Resolution: {product.data.display.screenResolution}</p>
                <p>Screen Size: {product.data.display.screenSize}</p>
                <p>Storage: {product.data.storage.hdd}</p>
                <p>Memory: {product.data.storage.ram}</p>
                <p>CPU: {product.data.hardware.cpu}</p>
                <p>Wifi: {product.data.connectivity.wifi}</p>
                <p>Description: {product.data.description}</p>
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
                <p>Total: ${(item.totalPrice).toFixed(2)}</p>
            </ItemContainer> 
        </ProductContainer>       
    )
}
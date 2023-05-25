import React, { useCallback, useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ItemContainer, CartButton } from './styled';
import {ProductContainer} from '../Home/styled';
import EditProduct from '../EditProduct';
import {toast} from 'react-toastify';
import * as interfaces from '../../interfaces';
import {addProductCart, removeProductCart} from '../../store/modules/products/reducer';
import { showProduct } from '../../store/modules/products/reducer';
import Modal from '../../components/Modal';
import useModal from "../../hooks/useModal";
import { AppThunkDispatch } from '../../store';
import Loading from '../../components/Loading';
import { addProductQuantity } from '../../services/addProductQuantity';
import { removeProductQuantity } from '../../services/removeProductQuantity';

export default function Product(): JSX.Element {
    interface Url{id: string}
    const url: Url = useParams();
    const dispatch = useDispatch<AppThunkDispatch>();
    const isLoading = useSelector((state: interfaces.IRootState) => state.products.status);
    const user = useSelector((state: interfaces.IRootState) => state.login.user);
    const shoppingCart = useSelector((state: interfaces.IRootState) => state.products.shoppingCart);
    const product = useSelector((state: interfaces.IRootState) => state.products.product);
    const isLoggedIn = useSelector((state: interfaces.IRootState) => state.login.isLoggedIn);
    const { isOpen, toggle } = useModal();
    const [newProduct, setNewProduct] = useState<interfaces.Product>(
        {...product, quantity: 0, totalPrice: 0}
    );
    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
        if (user.role === 'ADMIN') setIsAdmin(true);
    }, [user.name]);
    useMemo(() => {
        shoppingCart.forEach((element: interfaces.Product) => {
            if (element.id === newProduct.id) {
                newProduct.quantity = element.quantity;
                newProduct.totalPrice = element.totalPrice;
            }
        });
    }, [shoppingCart, newProduct]);
    useEffect(() => {
        dispatch(showProduct(url.id));  
    }, []);
    useMemo(() => {
        setNewProduct({...product, quantity: 0, totalPrice: 0});
    }, [product]);
    const addProduct = useCallback(() => {
        if (isLoggedIn){
            const findnewProduct = shoppingCart.find((product: interfaces.Product) => product.id === newProduct.id);
            if (findnewProduct) {
                setNewProduct(addProductQuantity(newProduct, dispatch));
            } else {
                dispatch(addProductCart({...newProduct}));
                setNewProduct(addProductQuantity(newProduct, dispatch));
            } 
        }
        if (!isLoggedIn) toast.error('You must be logged in!');
    }, [isLoggedIn, shoppingCart, newProduct, addProductQuantity, dispatch]);
    const removeProduct = useCallback(() => {
        if (isLoggedIn){
            dispatch(removeProductCart(newProduct));
            newProduct.quantity = 0;
            newProduct.totalPrice = 0;
            toast.success(`Removed ${newProduct.name} successfully!`);
        }
        if (!isLoggedIn) toast.error('You must be logged in!');
    }, [dispatch, isLoggedIn, newProduct]);
    const incrementQuantity = useCallback(() => {
        if (isLoggedIn && newProduct.quantity > 0){
            setNewProduct(addProductQuantity(newProduct, dispatch));
        } 
        if (!isLoggedIn || newProduct.quantity === 0) toast.error('Can not add the product.');
    }, [addProductQuantity, isLoggedIn, newProduct]);
    const decrementQuantity = useCallback(() => {
        if (isLoggedIn && newProduct.quantity > 1) {
            setNewProduct(removeProductQuantity(newProduct, dispatch));
        }
        if (!isLoggedIn || newProduct.quantity === 0) toast.error('Can not remove the product.');
    }, [addProductQuantity, isLoggedIn, newProduct]);
    return (
        <ProductContainer>
            {isLoading === 'loading' ? <Loading/> : <>
            <Modal isOpen={isOpen} toggle={toggle}>
                <EditProduct product={newProduct}/>
            </Modal>
            <ItemContainer>
                <h1>{newProduct.name}</h1>
                <img src={newProduct.image} alt=''/>
                <ProductContainer>
                    <p>Price: ${newProduct.price}</p>
                    <p>Quantity: {newProduct.quantity}</p>
                    <p>Total: ${newProduct.totalPrice.toFixed(2)}</p>
                </ProductContainer>
                    <p>Operational System: {newProduct.os}</p>
                    <p>Additional Features: {newProduct.additionalFeatures}</p>
                    <p>Description: {newProduct.description}</p>
                <ProductContainer>
                    <CartButton onClick={addProduct}>Add to cart</CartButton>
                    <CartButton onClick={incrementQuantity}>+</CartButton>
                    <CartButton onClick={decrementQuantity}>-</CartButton>
                    <CartButton onClick={removeProduct}>Remove Product</CartButton>
                    {isAdmin ? (<CartButton onClick={toggle}>Edit Product</CartButton>) : (<></>)}
                </ProductContainer>
            </ItemContainer> 
            </>}
        </ProductContainer>       
    )
}
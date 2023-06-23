import React, { useCallback, useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
    FaArrowLeft,
    FaArrowRight
} from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { ItemContainer, CartButton } from './styled';
import {ProductContainer} from '../Home/styled';
import {toast} from 'react-toastify';
import * as interfaces from '../../interfaces';
import {addProductCart, removeProductCart} from '../../store/modules/products/reducer';
import { showProduct } from '../../store/modules/products/reducer';
import { AppThunkDispatch } from '../../store';
import Loading from '../../components/Loading';
import { addProductQuantity } from '../../services/addProductQuantity';
import { removeProductQuantity } from '../../services/removeProductQuantity';
import { Link } from 'react-router-dom';
import { initialProduct } from '../../store/modules/products/reducer';

export default function Product(): JSX.Element {
    interface Url{id: string}
    const url: Url = useParams();
    const dispatch = useDispatch<AppThunkDispatch>();
    const isLoading = useSelector((state: interfaces.IRootState) => state.products.status);
    const shoppingCart = useSelector((state: interfaces.IRootState) => state.products.shoppingCart);
    const product = useSelector((state: interfaces.IRootState) => state.products.product) || initialProduct;
    const isLoggedIn = useSelector((state: interfaces.IRootState) => state.users.isLoggedIn) || false;
    const [newProduct, setNewProduct] = useState<interfaces.Product>(
        {...product, quantity: 0, totalPrice: 0}
    );
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
    }, [url.id]);
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
        <>
        {isLoading === 'loading' ? <Loading/> : 
            <ProductContainer>
                <ItemContainer>
                    <h1>{newProduct.name}</h1>
                    <img src={newProduct.image} alt=''/>
                    <p>Price: ${newProduct.price}</p>
                    <p>Quantity: {newProduct.quantity}</p>
                    <p>Total: ${newProduct.totalPrice.toFixed(2)}</p>
                </ItemContainer> 
                <ItemContainer>
                    <h1>Description</h1>
                    <p>Operational System: {newProduct.os}</p>
                    <p>Additional Features: {newProduct.additionalFeatures}</p>
                    <p>Description: {newProduct.description}</p>
                    <ProductContainer>
                        <CartButton onClick={addProduct}>Buy</CartButton>
                        <CartButton onClick={incrementQuantity}>+</CartButton>
                        <CartButton onClick={decrementQuantity}>-</CartButton>
                        <CartButton onClick={removeProduct}>Remove</CartButton>
                    </ProductContainer>
                    <ProductContainer>
                            {Number.parseInt(url.id) > 1 && 
                            <Link to={`/products/${Number.parseInt(url.id)-1}`}>
                                <FaArrowLeft size={30}/>
                            </Link>}
                            <Link to={`/products/${Number.parseInt(url.id)+1}`}>
                                <FaArrowRight size={30}/>
                            </Link>
                    </ProductContainer>
                </ItemContainer>
            </ProductContainer>  
        }
        </>
    )
}
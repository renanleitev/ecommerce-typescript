import React, { useCallback} from "react";
import {FaShoppingCart} from 'react-icons/fa';
import * as interfaces from '../../interfaces';
import { AppThunkDispatch } from '../../store';
import {
    addProductCart, 
    changeProductQuantityCart,
} from '../../store/modules/products/reducer';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DivCartButton } from "../../pages/Product/styled";
import mapStockAddProduct from "../../services/mapStockAddProduct";
import mapStockRemoveProduct from "../../services/mapStockRemoveProduct";

const TableBody: React.FC<interfaces.TableBody> = (props: interfaces.TableBody) => {
    const dispatch = useDispatch<AppThunkDispatch>();
    const isLoggedIn = useSelector((state: interfaces.IRootState) => state.login.isLoggedIn);
    const cart = useSelector((state: interfaces.IRootState) => state.products.cart);
    const addProductQuantity = useCallback(
        (product: interfaces.Product) => {
            props.setStock(mapStockAddProduct(props.stock, product));
            props.setOriginalStock(mapStockAddProduct(props.originalStock, product));
    }, [props.stock]);
    const removeProductQuantity = useCallback(
        (product: interfaces.Product) => {
            props.setStock(mapStockRemoveProduct(props.stock, product));
            props.setOriginalStock(mapStockRemoveProduct(props.originalStock, product));
    }, [props.stock]);
    const handleCheckout = useCallback((product: interfaces.Product) => {
        if (!cart.some(({id}) => id === product.id) && product.quantity > 0) {
            dispatch(addProductCart(product));
        }
        if (cart.some(({id}) => id === product.id)) {
            dispatch(changeProductQuantityCart({...product}));
        } 
    }, [cart]);
    return (
        <tbody>
            {props.stock
            .map((product: interfaces.Product, index: number) => {
                return (
                    <tr className='product' key={index}> 
                        <td>
                            <Link key={index+2} to={`product/${product.id}`}>
                                {product.name}
                            </Link>
                        </td>
                        <td>
                            <img key={index+1} src={product.images} alt=''/>
                        </td>
                        <td>
                            <p key={index+2}>
                                {product.description}
                            </p>
                        </td>
                        <td>
                            <p key={index+3}>
                                ${product.price}
                            </p>
                        </td>
                        {isLoggedIn ? (
                        <>
                        <td>
                            <p key={index+4}>
                                {product.quantity}
                            </p>
                        </td>
                        <td>
                            <p key={index+5}>
                                ${product.totalPrice.toFixed(2)}
                            </p>
                        </td>
                        <td>
                            <DivCartButton className="dropdown">
                                <button className="dropbtn">
                                    ...
                                </button>
                                <div className="dropdown-content">
                                    <button 
                                    onClick={() => addProductQuantity(product)}
                                    className="hidden">+</button>
                                    <button 
                                    onClick={() => removeProductQuantity(product)}
                                    className="hidden">-</button>
                                    <button
                                    onClick={() => handleCheckout(product)}
                                    className="hidden"
                                    ><FaShoppingCart size={22}/></button>
                                </div>
                            </DivCartButton>
                        </td>
                        </>
                        ) : (<></>)}
                    </tr>
                )
            })}
        </tbody>
    )
}

export default TableBody;
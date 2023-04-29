import React, { useCallback, useEffect, useState } from "react";
import {
    FaShoppingCart, 
    FaTrash,
    FaEdit,
    FaPlus,
    FaMinus
} from 'react-icons/fa';
import * as interfaces from '../../interfaces';
import { AppThunkDispatch } from '../../store';
import {
    addProductCart, 
    removeProductCart,
    changeProductQuantityCart,
} from '../../store/modules/products/reducer';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DivCartButton } from "../../pages/Product/styled";
import mapStockAddProduct from "../../services/mapStockAddProduct";
import mapStockRemoveProduct from "../../services/mapStockRemoveProduct";
import { toast } from "react-toastify";
import useModal from "../../hooks/useModal";
import Modal from '../../components/Modal';
import EditProduct from '../../pages/EditProduct';
import { HiddenTd } from "./styled";

const TableBody: React.FC<interfaces.TableBody> = (props: interfaces.TableBody) => {
    const dispatch = useDispatch<AppThunkDispatch>();
    const isLoggedIn = useSelector((state: interfaces.IRootState) => state.login.isLoggedIn);
    const cart = useSelector((state: interfaces.IRootState) => state.products.cart);
    const user = useSelector((state: interfaces.IRootState) => state.login.user);
    const [isAdmin, setIsAdmin] = useState(false);
    const [editedProduct, setEditedProduct] = useState<interfaces.Product>();
    useEffect(() => {
        if (user.name === 'admin') setIsAdmin(true);
    }, [user.name]);
    useEffect(() => {
        props.stock.map((product) => {
                cart.map((productCart) => {
                    if (productCart.id === product.id) {
                        product.quantity = productCart.quantity;
                        product.totalPrice = productCart.totalPrice;
                    }
                })
            }
        );
    }, []);
    const { isOpen, toggle } = useModal();
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
    const removeProductFromCart = useCallback(
        (product: interfaces.Product) => {
            if (product.quantity > 0) {
                dispatch(removeProductCart(product));
                product.quantity = 0;
                product.totalPrice = 0;
                toast.success(`Removed ${product.name} successfully.`);
            } else {
                toast.error('Product is not in the cart.');
            }
    }, [props.stock]);
    const addProductToCart = useCallback((product: interfaces.Product) => {
        if (!cart.some(({id}) => id === product.id) && product.quantity > 0) {
            dispatch(addProductCart(product));
        }
        if (cart.some(({id}) => id === product.id)) {
            dispatch(changeProductQuantityCart({...product}));
        }
        if (product.quantity > 0) toast.success(`Added ${product.name} successfully.`);
    }, [cart]);
    return (
        <tbody>
            {React.Children.toArray(props.stock.map((product: interfaces.Product) => {
                return (
                        <tr className='product'> 
                            <HiddenTd hidden={!isOpen}>
                                <Modal isOpen={isOpen} toggle={toggle}>
                                    <EditProduct product={editedProduct}/>
                                </Modal>
                            </HiddenTd>
                            <td>
                                <Link to={`product/${product.id}`}>
                                    {product.name}
                                </Link>
                            </td>
                            <td>
                                <img src={product.images} alt=''/>
                            </td>
                            <td>
                                <p>
                                    {product.description}
                                </p>
                            </td>
                            <td>
                                <p>
                                    ${product.price}
                                </p>
                            </td>
                            {isLoggedIn ? (
                            <>
                                <td>
                                    <p>
                                        {product.quantity}
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        ${product.totalPrice.toFixed(2)}
                                    </p>
                                </td>
                                <td>
                                    <DivCartButton>
                                        <button className="dropbtn">
                                            ...
                                        </button>
                                        <div className="dropdown-content">
                                            <button 
                                            onClick={() => addProductQuantity(product)}
                                            className="hidden">
                                                <FaPlus size={18}/>
                                            </button>
                                            <button 
                                            onClick={() => removeProductQuantity(product)}
                                            className="hidden">
                                                <FaMinus size={18}/>
                                            </button>
                                            <button
                                            onClick={() => addProductToCart(product)}
                                            className="hidden">
                                                <FaShoppingCart size={22}/>
                                            </button>
                                            {isAdmin ? (
                                            <>
                                                <button 
                                                onClick={() => {
                                                    toggle();
                                                    setEditedProduct(product);
                                                }}
                                                className="hidden">
                                                    <FaEdit size={22}/>
                                                </button>
                                                <button 
                                                onClick={() => removeProductFromCart(product)}
                                                className="hidden">
                                                    <FaTrash size={22}/>
                                                </button>
                                            </>
                                            ) : (<></>)}
                                        </div>
                                    </DivCartButton>
                                </td>
                            </>) : (<></>)}
                        </tr>
                )
            }))}
        </tbody>
    )
}

export default TableBody;
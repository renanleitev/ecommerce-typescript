import React, { useCallback, useEffect, useState } from "react";
import {
    FaShoppingCart, 
    FaTrash,
    FaEdit,
    FaPlus,
    FaMinus,
    FaDatabase
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
import CreateProduct from "../../pages/CreateProduct";

const TableBody: React.FC<interfaces.TableBody> = (props: interfaces.TableBody) => {
    const dispatch = useDispatch<AppThunkDispatch>();
    const isLoggedIn = useSelector((state: interfaces.IRootState) => state.login.isLoggedIn);
    const shoppingCart = useSelector((state: interfaces.IRootState) => state.products.shoppingCart);
    const user = useSelector((state: interfaces.IRootState) => state.login.user);
    const [editedProduct, setEditedProduct] = useState<interfaces.Product>();
    const [option, setOption] = useState('');
    useEffect(() => {
        props.stock.map((product) => {
            shoppingCart.map((productCart) => {
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
        if (!shoppingCart.some(({id}) => id === product.id) && product.quantity > 0) {
            dispatch(addProductCart(product));
        }
        if (shoppingCart.some(({id}) => id === product.id)) {
            dispatch(changeProductQuantityCart({...product}));
        }
        if (product.quantity > 0) toast.success(`Added ${product.name} successfully.`);
    }, [shoppingCart]);
    return (
        <tbody>
            {React.Children.toArray(props.stock.map((product: interfaces.Product) => {
                return (
                        <tr className='product'> 
                            <HiddenTd hidden={!isOpen}>
                                <Modal isOpen={isOpen} toggle={toggle}>
                                    {option === 'edit' ? 
                                    <EditProduct product={editedProduct}/>:
                                    <CreateProduct/>
                                    }
                                </Modal>
                            </HiddenTd>
                            <td>
                                <Link to={`products/${product.id}`}>
                                    {product.name}
                                </Link>
                            </td>
                            <td><img src={product.image} alt=''/></td>
                            <td><p>{product.description}</p></td>
                            <td><p>${product.price}</p></td>
                            {isLoggedIn ? (
                            <>
                                <td><p>{product.quantity}</p></td>
                                <td><p>${product.totalPrice.toFixed(2)}</p></td>
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
                                            {user.role === "ROLE_ADMIN" ? (
                                            <>
                                                <button 
                                                onClick={() => {
                                                    toggle();
                                                    setOption('edit');
                                                    setEditedProduct(product);
                                                }}
                                                className="hidden">
                                                    <FaEdit size={22}/>
                                                </button>
                                                <button 
                                                onClick={() => {
                                                    toggle();
                                                    setOption('create');
                                                    setEditedProduct(product);
                                                }}
                                                className="hidden">
                                                    <FaDatabase size={22}/>
                                                </button>
                                            </>
                                            ) : (<></>)}
                                            <button 
                                            onClick={() => removeProductFromCart(product)}
                                            className="hidden">
                                                <FaTrash size={22}/>
                                            </button>
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
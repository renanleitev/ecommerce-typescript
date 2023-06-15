import React, { useCallback, useState } from "react";
import {
    FaShoppingCart, 
    FaTrash,
    FaEdit,
    FaPlus,
    FaMinus,
    FaDatabase
} from 'react-icons/fa';
import * as interfaces from '../../../interfaces';
import { AppThunkDispatch } from '../../../store';
import {
    addProductCart, 
    removeProductCart,
    changeProductQuantityCart,
} from '../../../store/modules/products/reducer';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import mapStockAddProduct from "../../../services/mapStockAddProduct";
import mapStockRemoveProduct from "../../../services/mapStockRemoveProduct";
import { toast } from "react-toastify";
import EditProduct from '../../EditProduct';
import ModalDialog from "../../../components/ModalDialog";
import CreateProduct from "../../CreateProduct";
import { initialProduct } from "../../../store/modules/products/reducer";
import FontAwesomeButton from "../../../components/FontAwesomeButton";
import { DivCartButton } from "./styled";

const TableBody: React.FC<interfaces.TableProduct> = (props: interfaces.TableProduct) => {
    const dispatch = useDispatch<AppThunkDispatch>();
    const isLoggedIn = useSelector((state: interfaces.IRootState) => state.login.isLoggedIn);
    const shoppingCart = useSelector((state: interfaces.IRootState) => state.products.shoppingCart);
    const user = useSelector((state: interfaces.IRootState) => state.login.user);
    const [editedProduct, setEditedProduct] = useState<interfaces.Product>(initialProduct);
    const addProductQuantity = useCallback(
        (product: interfaces.Product) => {
            props.setData(mapStockAddProduct(props.data, product));
    }, [props.data]);
    const removeProductQuantity = useCallback(
        (product: interfaces.Product) => {
            props.setData(mapStockRemoveProduct(props.data, product));
    }, [props.data]);
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
    }, [props.data]);
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
            {React.Children.toArray(props.data.map((product: interfaces.Product) => {
                return (
                        <tr className='product'> 
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
                                        <button className="dropbtn">...</button>
                                        <div className="dropdown-content">
                                            <FontAwesomeButton icon={FaPlus} onClickFunction={() => addProductQuantity(product)}/>
                                            <FontAwesomeButton icon={FaMinus} onClickFunction={() => removeProductQuantity(product)}/>
                                            <FontAwesomeButton icon={FaShoppingCart} onClickFunction={() => addProductToCart(product)}/>
                                            {user.role === "ROLE_ADMIN" ? (
                                            <>
                                                <ModalDialog iconToOpenModal={FaEdit} onClickFunction={() => setEditedProduct(product)}>
                                                    <EditProduct product={product}/>
                                                </ModalDialog>
                                                <ModalDialog iconToOpenModal={FaDatabase} onClickFunction={() => setEditedProduct(editedProduct)}>
                                                    <CreateProduct/>
                                                </ModalDialog>
                                            </>
                                            ) : (<></>)}
                                            <FontAwesomeButton icon={FaTrash} onClickFunction={() => removeProductFromCart(product)}/>
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
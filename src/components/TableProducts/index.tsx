import React, {useState, useMemo, useCallback} from "react";
import {FaShoppingCart} from 'react-icons/fa';
import { Table } from "./styled";
import * as interfaces from '../../interfaces';
import { AppThunkDispatch } from '../../store';
import {
    showStock, 
    addItem, 
    changeQuantity
} from '../../store/modules/products/reducer';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { DivCartButton } from "../../pages/Product/styled";
import mapStock from "../../services/mapStock";

const TableProducts: React.FC<interfaces.TableProducts> = (props: interfaces.TableProducts) => {
    const dispatch = useDispatch<AppThunkDispatch>();
    const isLoggedIn = useSelector((state: interfaces.IRootState) => state.login.isLoggedIn);
    const cart = useSelector((state: interfaces.IRootState) => state.products.cart);
    const [sorting, setSorting] = useState(true);
    const [stock, setStock] = useState([...props.stock]);
    const [originalStock, setOriginalStock] = useState([...props.stock]);
    useMemo(() => {
        dispatch(showStock());
    }, [dispatch]);
    const applySorting = useCallback((key: string) => {
        const sortedStock = stock.sort(
            (a: interfaces.Product, b: interfaces.Product) => {
            switch (key) {
                case 'name':
                    return a[key].localeCompare(b[key]);
                case 'images':
                    return a[key].localeCompare(b[key]);
                case 'price':
                    return Number.parseFloat(a[key]) - Number.parseFloat(b[key]);
                case 'quantity':
                    return a[key] - b[key];
                case 'totalPrice':
                    return a[key] - b[key];
                case 'description':
                    return a[key].localeCompare(b[key]);
                default:
                    break;
            }
        });
        setStock(sorting ? sortedStock : sortedStock.reverse());
        sorting ? setSorting(false) : setSorting(true);
    }, [sorting, stock]);
    const changeItemQuantity = useCallback(
        (product: interfaces.Product, operation: string) => {
            setStock(mapStock(stock, product, operation));
            setOriginalStock(mapStock(originalStock, product, operation));
    }, [stock]);
    const searchTable = useCallback((e: React.FormEvent<HTMLInputElement>) => {
        const searchTerm = e.currentTarget.value.toString().toLowerCase();
        searchTerm === '' ? 
        setStock(originalStock) : 
        setStock(stock.filter(
            product =>
            product.description.toLowerCase().indexOf(searchTerm) > -1,
        ));
    }, [stock]);
    const handleCheckout = useCallback((product: interfaces.Product) => {
        if (!cart.some(({id}) => id === product.id) && product.quantity > 0) {
            dispatch(addItem(product));
        }
        if (cart.some(({id}) => id === product.id)) {
            dispatch(changeQuantity({...product}));
        } 
    }, [cart]);
    return (
        <>
        <input
        onChange={searchTable}
        placeholder={'Search for products...'}
        />
        <Table>
            <thead>
                <tr>
                    <th onClick={() => applySorting("name")}>
                        Name {sorting ? <FaArrowDown/> : <FaArrowUp/>}
                    </th>
                    <th onClick={() => applySorting("images")}>
                        Images {sorting ? <FaArrowDown/> : <FaArrowUp/>}
                    </th>
                    <th onClick={() => applySorting("description")}>
                        Description {sorting ? <FaArrowDown/> : <FaArrowUp/>}
                    </th>
                    <th onClick={() => applySorting("price")}>
                        Price {sorting ? <FaArrowDown/> : <FaArrowUp/>}
                    </th>
                    {isLoggedIn ? (
                    <>
                        <th onClick={() => applySorting("quantity")}>
                            Quantity {sorting ? <FaArrowDown/> : <FaArrowUp/>}
                        </th>
                        <th onClick={() => applySorting("totalPrice")}>
                            Total Price {sorting ? <FaArrowDown/> : <FaArrowUp/>}
                        </th>
                        <th>
                            Add/Remove
                        </th>
                    </>
                    ) : (<></>)}
                </tr>
            </thead>
            <tbody>
                {stock.map((product: interfaces.Product, index: number) => {
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
                                        onClick={() => changeItemQuantity(product, 'add')}
                                        className="hidden"
                                        >
                                            +
                                        </button>
                                        <button 
                                        onClick={() => changeItemQuantity(product, 'remove')}
                                        className="hidden"
                                        >
                                            -
                                        </button>
                                        <button
                                        onClick={() => handleCheckout(product)}
                                        className="hidden"
                                        >
                                            <FaShoppingCart size={22}/>
                                        </button>
                                    </div>
                                </DivCartButton>
                            </td>
                            </>
                            ) : (<></>)}
                        </tr>
                    )
                })}
            </tbody>
        </Table>
        </>
    )
}

export default TableProducts;
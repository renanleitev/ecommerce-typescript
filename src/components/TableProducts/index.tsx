import React, {useState, useMemo, useCallback} from "react";
import {FaShoppingCart} from 'react-icons/fa';
import { Table } from "./styled";
import * as interfaces from '../../interfaces';
import { AppThunkDispatch } from '../../store';
import {
    showStock, 
    addProductCart, 
    changeProductQuantityCart,
    showStockPerPage
} from '../../store/modules/products/reducer';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { DivCartButton } from "../../pages/Product/styled";
import mapStockAddProduct from "../../services/mapStockAddProduct";
import mapStockRemoveProduct from "../../services/mapStockRemoveProduct";
import Pagination from '../../components/Pagination';

export default function TableProducts(){
    const dispatch = useDispatch<AppThunkDispatch>();
    const isLoggedIn = useSelector((state: interfaces.IRootState) => state.login.isLoggedIn);
    const cart = useSelector((state: interfaces.IRootState) => state.products.cart);
    const stockPerPage = useSelector((state: interfaces.IRootState) => state.products.stockPerPage.data);
    const [sorting, setSorting] = useState(true);
    const [stock, setStock] = useState([...stockPerPage.map((item: interfaces.Product) => {
        return {...item, quantity: 0, totalPrice: 0};
    })]);
    const [originalStock, setOriginalStock] = useState([...stockPerPage.map((item: interfaces.Product) => {
        return {...item, quantity: 0, totalPrice: 0};
    })]);
    const [pageStatus, setPageStatus] = useState<interfaces.PageNumberStatus>({
        currentPage: 1,
        productsPerPage: 3
    }); 
    useMemo(() => {
        dispatch(showStock());
        dispatch(showStockPerPage(pageStatus));
    }, [dispatch]);
    const applySorting = useCallback((key: string) => {
        const sortedStock = stock.sort(
            (previousProduct: interfaces.Product, nextProduct: interfaces.Product) => {
            switch (key) {
                case 'name':
                    return previousProduct[key].localeCompare(nextProduct[key]);
                case 'images':
                    return previousProduct[key].localeCompare(nextProduct[key]);
                case 'price':
                    return Number.parseFloat(previousProduct[key]) - Number.parseFloat(nextProduct[key]);
                case 'quantity':
                    return previousProduct[key] - nextProduct[key];
                case 'totalPrice':
                    return previousProduct[key] - nextProduct[key];
                case 'description':
                    return previousProduct[key].localeCompare(nextProduct[key]);
                default:
                    break;
            }
        });
        setStock(sorting ? sortedStock : sortedStock.reverse());
        sorting ? setSorting(false) : setSorting(true);
    }, [sorting, stock]);
    const addProductQuantity = useCallback(
        (product: interfaces.Product) => {
            setStock(mapStockAddProduct(stock, product));
            setOriginalStock(mapStockAddProduct(originalStock, product));
    }, [stock]);
    const removeProductQuantity = useCallback(
        (product: interfaces.Product) => {
            setStock(mapStockRemoveProduct(stock, product));
            setOriginalStock(mapStockRemoveProduct(originalStock, product));
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
            dispatch(addProductCart(product));
        }
        if (cart.some(({id}) => id === product.id)) {
            dispatch(changeProductQuantityCart({...product}));
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
                {stock
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
                                        className="hidden"
                                        >+</button>
                                        <button 
                                        onClick={() => removeProductQuantity(product)}
                                        className="hidden"
                                        >-</button>
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
        </Table>
        <Pagination
            dataLength={stock.length}
            pageStatus={pageStatus}
            setPageStatus={setPageStatus}
        ></Pagination>
        </>
    )
}
import React, {useState, useMemo, useCallback, useEffect} from "react";
import { Table } from "./styled";
import * as interfaces from '../../interfaces';
import { AppThunkDispatch } from '../../store';
import { 
    showStock, 
    addItem, 
    removeItem,
} from '../../store/modules/products/reducer';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { CartButton } from "../../pages/Product/styled";
import { changeProductQuantity } from "../../services/changeProductQuantity";

const TableProducts: React.FC<interfaces.TableProducts> = (props: interfaces.TableProducts) => {
    const dispatch = useDispatch<AppThunkDispatch>();
    const isLoggedIn = useSelector((state: interfaces.IRootState) => state.login.isLoggedIn);
    const cart = useSelector((state: interfaces.IRootState) => state.products.cart);
    const [sorting, setSorting] = useState(true);
    const [shoppingCart, setShoppingCart] = useState([...cart]);
    const [stock, setStock] = useState([...props.stock]);
    const [originalStock, setOriginalStock] = useState([...props.stock]);
    useEffect(() => {
        setShoppingCart([...cart]);
    }, [cart]);
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
    const changeQuantity = useCallback(
        (product: interfaces.Product, operation: string) => {
            function mapStock(stock: Array<interfaces.Product>) {
                return stock.map((item: interfaces.Product) => {
                    if (item.name === product.name) {
                        if (operation === 'add') {
                            return {...item, 
                                quantity: item.quantity + 1,
                                totalPrice: item.totalPrice + Number.parseFloat(item.price)
                            }
                        }
                        if (operation === 'remove') {
                            return {...item, 
                                quantity: item.quantity - 1,
                                totalPrice: item.totalPrice - Number.parseFloat(item.price)
                            }
                        }
                    }
                    return {...item};
                })
            }
            setStock(mapStock(stock));
            setOriginalStock(mapStock(originalStock));
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
                            {isLoggedIn ? (
                                <td>
                                <CartButton 
                                onClick={() => changeQuantity(product, 'add')}>
                                    +
                                </CartButton>
                                <CartButton 
                                onClick={() => changeQuantity(product, 'remove')}>
                                    -
                                </CartButton>
                            </td>
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
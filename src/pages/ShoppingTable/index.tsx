import React, { useMemo, useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as interfaces from '../../interfaces';
import { DivTable, Table } from '../SearchingTable/styled';
import Loading from '../../components/Loading';
import { AppThunkDispatch } from '../../store';
import { showShoppings } from '../../store/modules/products/reducer';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

export default function ShoppingTable(): JSX.Element{
    const user = useSelector((state: interfaces.IRootState) => state.login.user);
    const isLoading = useSelector((state: interfaces.IRootState) => state.products.status);
    const shoppingList = useSelector((state: interfaces.IRootState) => state.products.shoppingList);
    const [sorting, setSorting] = useState(true);
    const [firstLoad, setFirstLoad] = useState(true);
    const [finalShoppingList, setFinalShoppingList] = useState([...shoppingList]);
    const dispatch = useDispatch<AppThunkDispatch>();
    useEffect(() => {
        dispatch(showShoppings(user.id));
    }, []);
    useMemo(() => {
        setFinalShoppingList([...shoppingList]);
    }, [shoppingList]);
    const applySorting = useCallback((key: string) => {
        if (!firstLoad){
            const sortedStock = finalShoppingList.sort(
                (previousItem: interfaces.ShoppingList, nextItem: interfaces.ShoppingList) => {
                switch (key) {
                    case 'userName':
                        return previousItem[key].localeCompare(nextItem[key]);
                    case 'productName':
                        return previousItem[key].localeCompare(nextItem[key]);
                    case 'quantity':
                        return previousItem[key] - nextItem[key];
                    case 'totalPrice':
                        return previousItem[key] - nextItem[key];
                    case 'dateCreated':
                        return previousItem[key].localeCompare(nextItem[key]);
                    default:
                        break;
                }
            });
            setFinalShoppingList(sorting ? [...sortedStock] : [...sortedStock.reverse()]);        
            sorting ? setSorting(false) : setSorting(true);
        }
        setFirstLoad(false);
    }, [sorting, firstLoad]);
    return (
            <DivTable>
            {isLoading === 'loading' ? <Loading /> : <>
            <Table>
            <thead>
                <tr>
                    <th onClick={() => applySorting("userName")}>
                        User {sorting ? <FaArrowDown/> : <FaArrowUp/>}
                    </th>
                    <th onClick={() => applySorting("productName")}>
                        Product {sorting ? <FaArrowDown/> : <FaArrowUp/>}
                    </th>
                    <th onClick={() => applySorting("quantity")}>
                        Quantity {sorting ? <FaArrowDown/> : <FaArrowUp/>}
                    </th>
                    <th onClick={() => applySorting("totalPrice")}>
                        Total Price {sorting ? <FaArrowDown/> : <FaArrowUp/>}
                    </th>
                    <th onClick={() => applySorting("dateCreated")}>
                        Date {sorting ? <FaArrowDown/> : <FaArrowUp/>}
                    </th>
                </tr>
            </thead>
            <tbody>
            {React.Children.toArray(finalShoppingList.map((item: interfaces.ShoppingList) => {
                return (
                    <tr>
                        <td><p>{item.userName}</p></td>
                        <td><p>{item.productName}</p></td>
                        <td><p>{item.quantity}</p></td>
                        <td><p>{item.totalPrice}</p></td>
                        <td><p>{item.dateCreated}</p></td>
                    </tr>
                )}))}
            </tbody>
            </Table>
            </>}
        </DivTable>
    );
}

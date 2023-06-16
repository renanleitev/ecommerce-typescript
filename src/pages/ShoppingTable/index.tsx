import React, { useMemo, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as interfaces from '../../interfaces';
import { DivTable, Table } from '../SearchingTable/styled';
import Loading from '../../components/Loading';
import { AppThunkDispatch } from '../../store';
import { changeProductPageStatus, showShoppings } from '../../store/modules/products/reducer';
import Pagination from '../../components/Pagination';
import TableBody from './TableBody';
import TableHead from './TableHead';

export default function ShoppingTable(): JSX.Element{
    const user = useSelector((state: interfaces.IRootState) => state.login.user);
    const isLoading = useSelector((state: interfaces.IRootState) => state.products.status);
    const shoppingListPerPage = useSelector((state: interfaces.IRootState) => state.products.shoppingList);
    const dispatch = useDispatch<AppThunkDispatch>();
    const pageStatus: interfaces.PageNumberStatus = {
        id: user.id,
        currentPage: 0,
        itemsPerPage: 3,
        type: 'shopping'
    };
    useEffect(() => {
        dispatch(changeProductPageStatus(pageStatus));
        dispatch(showShoppings(pageStatus));
    }, []);
    const [shoppingList, setShoppingList] = useState([...shoppingListPerPage.data.map((shoppingListItem: interfaces.ShoppingList) => {
        return { ...shoppingListItem };
    })]);
    useMemo(() => {
        setShoppingList([...shoppingListPerPage.data.map((shoppingListItem: interfaces.ShoppingList) => {
            return { ...shoppingListItem };
        })]);
    }, [shoppingListPerPage]);
    return (
            <DivTable>
            {isLoading === 'loading' ? <Loading /> : <>
            <Table>
            <TableHead/>
            <TableBody data={shoppingList} setData={setShoppingList}/>
            </Table>
            </>}
            <Pagination data={shoppingListPerPage} pageStatus={{...pageStatus}} type='shopping'/>
        </DivTable>
    );
}

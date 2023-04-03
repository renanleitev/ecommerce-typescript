import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as interfaces from '../../interfaces';
import { AppThunkDispatch } from '../../store';
import { showStock } from '../../store/modules/products/reducer';
import TableProducts from '../../components/TableProducts';
import { DivTable } from './styled';

export default function ShowTable(){
    const dispatch = useDispatch<AppThunkDispatch>();
    const stock = useSelector((state: interfaces.IRootState) => state.products.stock);
    useMemo(() => {
        dispatch(showStock());
    }, [dispatch]);
    const currentStock = stock.data.map((item: interfaces.Product) => {
            return {...item, quantity: 0, totalPrice: 0};
    });
    return (
        <DivTable>
            <TableProducts stock={currentStock}/>
        </DivTable>
    )
}
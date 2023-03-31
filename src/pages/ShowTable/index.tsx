import React, { useState, useCallback, useMemo } from 'react';
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
    const [currentStock, setCurrentStock] = useState(stock.data);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const searchTable = useCallback((e: React.FormEvent<HTMLInputElement>) => {
        const searchTerm = e.currentTarget.value.toString().toLowerCase();
        setSearchValue(searchTerm);
        const filtered = currentStock.filter(
            product =>
                product.description.toLowerCase().indexOf(searchTerm) > -1,
        );
        setFilteredProducts(filtered);
    }, []);
    return (
        <DivTable>
            <input
            onChange={searchTable}
            placeholder={'Search for products...'}
            />
            {searchValue ? (
                <TableProducts stock={filteredProducts} setStock={setFilteredProducts}/>
            ) : (
                <TableProducts stock={currentStock} setStock={setCurrentStock}/>
            )}
        </DivTable>
    )
}
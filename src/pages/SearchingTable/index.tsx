import React, { useState, useMemo, useCallback } from 'react';
import { DivTable, Table } from './styled';
import { useSelector, useDispatch } from 'react-redux';
import * as interfaces from '../../interfaces';
import TableHead from '../../components/TableHead';
import TableBody from '../../components/TableBody';
import Pagination from '../../components/Pagination';
import Loading from '../../components/Loading';
import { AppThunkDispatch } from '../../store';
import { changePageStatus } from '../../store/modules/products/reducer';
import switchOptionSearch from '../../services/switchOptionSearch';
import Select from '../../components/Select';
import { debounce } from 'lodash';

export default function SearchingTable(): JSX.Element {
    const dispatch = useDispatch<AppThunkDispatch>();
    const productsPerPage = useSelector((state: interfaces.IRootState) => state.products.productsPerPage) || 
    { data: [], total_pages: 0, total_items: 0 };
    const isLoading = useSelector((state: interfaces.IRootState) => state.products.status);
    const pageStatus = useSelector((state: interfaces.IRootState) => state.products.pageStatus);
    const [stock, setStock] = useState([...productsPerPage.data.map((product: interfaces.Product) => {
        return { ...product, quantity: 0, totalPrice: 0 };
    })]);
    useMemo(() => {
        setStock([...productsPerPage.data.map((product: interfaces.Product) => {
            return { ...product, quantity: 0, totalPrice: 0 };
        })]);
    }, [productsPerPage]);
    let option = '';
    let search = '';
    let price = '';
    let operator = '';
    const handleDefaultOptions = useCallback((event: React.FormEvent<HTMLSelectElement>) => {
        option = event.currentTarget.value;
    }, []);
    const handlePriceOptions = useCallback((event: React.FormEvent<HTMLSelectElement>) => {
        if (option.includes('Price')) operator = event.currentTarget.value;
    }, []);
    const handlePriceValue = useCallback((event: React.FormEvent<HTMLInputElement>) => {
        price = event.currentTarget.value;
    }, []);
    const handleInputSearch = useCallback((e: React.FormEvent<HTMLInputElement>) => {
        // 1000 = 1 second
        const delayTime = 1000;
        const searching = debounce((value) => {
            search = value;
        }, delayTime);
        searching(e.currentTarget.value.toString().toLowerCase());        
    }, []);
    const handleButtonSearch = useCallback(() => {
        const newPageStatus: interfaces.PageNumberStatus = {
            ...pageStatus, 
            searching: search,
            option: option,
            price: price,
            operator: operator
        }
        dispatch(changePageStatus(newPageStatus));
        switchOptionSearch(newPageStatus, dispatch);
    }, []); 
    const defaultOptions = ['Name', 'Description', 'Additional Features', 'Operational System', 'Price'];
    const priceOptions = ['LessThan', 'LessThanOrEqualTo', 'EqualTo', 'GreaterThan', 'GreaterThanOrEqualTo'];
    return (
        <>
        <DivTable>
            {isLoading === 'loading' ? <Loading /> : <>
                <input
                onChange={handleInputSearch}
                placeholder={'Search for products...'}
                className='search-bar'/>
                <Select onChangeFunction={handleDefaultOptions} options={defaultOptions}/>
                <Select onChangeFunction={handlePriceOptions} options={priceOptions}/>
                <input type='number' step="0.01" onChange={handlePriceValue}/>
                <button onClick={handleButtonSearch}>Search</button>
                <Table>
                    <TableHead
                        stock={stock}
                        setStock={setStock} />
                    <TableBody
                        stock={stock}
                        setStock={setStock}/>
                </Table>
            </>}
        </DivTable>
        <Pagination data={productsPerPage} type={'product'}/>
        </>
    )
}
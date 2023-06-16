import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { DivTable, Table } from './styled';
import { useSelector, useDispatch } from 'react-redux';
import * as interfaces from '../../interfaces';
import TableHead from './TableHead';
import TableBody from './TableBody';
import Pagination from '../../components/Pagination';
import Loading from '../../components/Loading';
import { AppThunkDispatch } from '../../store';
import { changeProductPageStatus, showProductsPerPage } from '../../store/modules/products/reducer';
import switchOptionSearch from '../../services/switchOptionSearch';
import Select from '../../components/Select';
import { debounce } from 'lodash';

export default function SearchingTable(): JSX.Element {
    const dispatch = useDispatch<AppThunkDispatch>();
    const productsPerPage = useSelector((state: interfaces.IRootState) => state.products.productsPerPage) || 
    { data: [], total_pages: 0, total_items: 0 };
    const isLoading = useSelector((state: interfaces.IRootState) => state.products.status);
    const pageStatus: interfaces.PageNumberStatus = {
        currentPage: 0,
        itemsPerPage: 3,
        searching: localStorage.getItem('searchingProduct'),
        option: localStorage.getItem('optionProduct'),
        operator: localStorage.getItem('operatorProduct'),
        price: localStorage.getItem('priceProduct')
    };
    const [data, setData] = useState([...productsPerPage.data.map((product: interfaces.Product) => {
        return { ...product, quantity: 0, totalPrice: 0 };
    })]);
    useMemo(() => {
        setData([...productsPerPage.data.map((product: interfaces.Product) => {
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
            operator: operator,
            type: 'product'
        };
        localStorage.setItem('optionProduct', option);
        localStorage.setItem('priceProduct', price);
        localStorage.setItem('operatorProduct', operator);
        localStorage.setItem('searchingProduct', search);
        switchOptionSearch({...newPageStatus}, dispatch);
    }, []); 
    const defaultOptions = ['Name Product', 'Description', 'Additional Features', 'Operational System', 'Price'];
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
                <input type='number' step="0.01" onChange={handlePriceValue} className='number'/>
                <button onClick={handleButtonSearch}>Search</button>
                <Table>
                    <TableHead
                        data={data}
                        setData={setData} />
                    <TableBody
                        data={data}
                        setData={setData}/>
                </Table>
            </>}
        </DivTable>
        <Pagination data={productsPerPage} type={'product'} pageStatus={{...pageStatus}}/>
        </>
    )
}
import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { DivTable, Table } from './styled';
import { useSelector, useDispatch } from 'react-redux';
import * as interfaces from '../../interfaces';
import TableHead from './TableHead';
import TableBody from './TableBody';
import Pagination from '../../components/Pagination';
import Loading from '../../components/Loading';
import { AppThunkDispatch } from '../../store';
import switchOptionSearch from '../../services/switchOptionSearch';
import Select from '../../components/Select';
import { showProductsPerPage } from '../../store/modules/products/reducer';
import DataNotAvailable from '../DataNotAvailable';

export default function SearchingTable(): JSX.Element {
    const dispatch = useDispatch<AppThunkDispatch>();
    const productsPerPage = useSelector((state: interfaces.IRootState) => state.products.productsPerPage) || 
    { data: [], total_pages: 0, total_items: 0 };
    const isLoading = useSelector((state: interfaces.IRootState) => state.products.status);
    const pageStatus: interfaces.PageNumberStatus = {
        currentPage: 0,
        itemsPerPage: 3,
        type: 'product'
    };
    useEffect(() => {
        dispatch(showProductsPerPage({...pageStatus}));
    }, []);
    const [data, setData] = useState([...productsPerPage.data.map((product: interfaces.Product) => {
        return { ...product, quantity: 0, totalPrice: 0 };
    })]);
    useMemo(() => {
        setData([...productsPerPage.data.map((product: interfaces.Product) => {
            return { ...product, quantity: 0, totalPrice: 0 };
        })]);
    }, [productsPerPage]);
    const option = useRef<HTMLSelectElement>();
    const operator = useRef<HTMLSelectElement>();
    const searching = useRef<HTMLInputElement>();
    const price = useRef<HTMLInputElement>();
    const handleButtonSearch = useCallback(() => {
        localStorage.setItem('optionProduct', option.current.value);
        localStorage.setItem('priceProduct', price.current.value);
        localStorage.setItem('operatorProduct', operator.current.value);
        localStorage.setItem('searchingProduct', searching.current.value);
        switchOptionSearch({...pageStatus,
            searching: searching.current.value,
            option: option.current.value,
            price:  price.current.value,
            operator: operator.current.value,
        }, dispatch);
    }, []); 
    const handleResetSearch = useCallback(() => {
        localStorage.setItem('optionProduct', '');
        localStorage.setItem('priceProduct', '');
        localStorage.setItem('operatorProduct', '');
        localStorage.setItem('searchingProduct', '');
        dispatch(showProductsPerPage({...pageStatus}));
    }, []);
    const defaultOptions = ['Name Product', 'Description', 'Additional Features', 'Operational System', 'Price'];
    const priceOptions = ['LessThan', 'LessThanOrEqualTo', 'EqualTo', 'GreaterThan', 'GreaterThanOrEqualTo'];
    return (
        <>
        {productsPerPage.data === undefined || productsPerPage.total_pages === 0 ? 
            <DataNotAvailable/> : 
            <>
                <DivTable>
                {isLoading === 'loading' ? <Loading /> : <>
                <input
                    ref={searching}
                    placeholder={'Search for products...'}
                    className='searching-bar'/>
                    <Select inputRef={option} options={defaultOptions}/>
                    <Select inputRef={operator} options={priceOptions}/>
                    <input type='number' step="0.01" ref={price} className='number'/>
                    <button onClick={handleButtonSearch}>Search</button>
                    <button onClick={handleResetSearch} className='reset'>Reset</button>
                    <Table>
                        <TableHead pageStatus={{...pageStatus}}/>
                        <TableBody
                            data={data}
                            setData={setData}/>
                    </Table>
                </>}
                </DivTable>
                <Pagination data={productsPerPage} pageStatus={{...pageStatus}}/>
            </>}
        </>
    )
}
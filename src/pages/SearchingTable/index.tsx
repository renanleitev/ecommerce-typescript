import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { DivTable, Table } from './styled';
import { useSelector, useDispatch } from 'react-redux';
import * as interfaces from '../../interfaces';
import TableHead from './TableHead';
import TableBody from './TableBody';
import Pagination from '../../components/Pagination';
import Loading from '../../components/Loading';
import { AppThunkDispatch } from '../../store';
import { changeProductsPageStatus, showProductsPerPage } from '../../store/modules/products/reducer';
import Select from '../../components/Select';
import switchOptionSearch from '../../services/switchOptionSearch';

export default function SearchingTable(): JSX.Element {
    const dispatch = useDispatch<AppThunkDispatch>();
    const productsPerPage = useSelector((state: interfaces.IRootState) => state.products.productsPerPage) || { data: [], total_pages: 0, total_items: 0 };
    const isLoading = useSelector((state: interfaces.IRootState) => state.products.status);
    const searchingRef = useRef<HTMLInputElement>(null);
    const optionRef = useRef<HTMLSelectElement>(null);
    const operatorRef = useRef<HTMLSelectElement>(null);
    const priceValueRef = useRef<HTMLInputElement>(null);
    const [pageStatus, setPageStatus] = useState<interfaces.PageNumberStatus>({
        currentPage: 0,
        itemsPerPage: 3,
        searching: '',
        price: '',
        operator: '',
        option: '',
        type: 'product'
    });
    useEffect(() => {
        dispatch(showProductsPerPage(pageStatus));
    }, []);
    const [stock, setStock] = useState([...productsPerPage.data.map((product: interfaces.Product) => {
        return { ...product, quantity: 0, totalPrice: 0 };
    })]);
    useMemo(() => {
        setStock([...productsPerPage.data.map((product: interfaces.Product) => {
            return { ...product, quantity: 0, totalPrice: 0 };
        })]);
    }, [productsPerPage]);
    const handleButtonSearch = useCallback(() => {
        const newPageStatus = {
            ...pageStatus, 
            searching: searchingRef.current.value, 
            option: optionRef.current.value,
            operator: operatorRef.current.value,
            price: priceValueRef.current.value
        };
        setPageStatus(newPageStatus);
        switchOptionSearch('product', dispatch);
    }, []);
    const defaultOptions = ['Name Product', 'Description', 'Additional Features', 'Operational System', 'Price'];
    const priceOptions = ['LessThan', 'LessThanOrEqualTo', 'EqualTo', 'GreaterThan', 'GreaterThanOrEqualTo'];
    return (
        <>
        <DivTable>
            {isLoading === 'loading' ? <Loading /> : <>
                <input
                ref={searchingRef}
                placeholder={'Search for products...'}
                className='search-bar'/>
                <Select inputRef={optionRef} options={defaultOptions}/>
                <Select inputRef={operatorRef} options={priceOptions}/>
                <input type='number' step="0.01" ref={priceValueRef} className='number'/>
                <button onClick={handleButtonSearch}>Search</button>
                <Table>
                    <TableHead
                        data={stock}
                        setData={setStock} />
                    <TableBody
                        data={stock}
                        setData={setStock}/>
                </Table>
            </>}
        </DivTable>
        <Pagination data={productsPerPage} type={'product'}/>
        </>
    )
}
import React, { useState, useMemo, useEffect } from 'react';
import { DivTable, Table } from './styled';
import { useSelector, useDispatch } from 'react-redux';
import { AppThunkDispatch } from '../../store';
import * as interfaces from '../../interfaces';
import TableHead from '../../components/TableHead';
import TableBody from '../../components/TableBody';
import Pagination from '../../components/Pagination';
import InputSearch from '../../components/InputSearch';
import Loading from '../../components/Loading';
import { searchProductByName, showProductsPerPage } from '../../store/modules/products/reducer';

export default function SearchingTable(): JSX.Element {
    const dispatch = useDispatch<AppThunkDispatch>();
    const productsPerPage = useSelector((state: interfaces.IRootState) => state.products.productsPerPage) || 
    { data: [], total_pages: 0, total_items: 0 };
    const isLoading = useSelector((state: interfaces.IRootState) => state.products.status);
    const [pageStatus, setPageStatus] = useState<interfaces.PageNumberStatus>({
        currentPage: 0,
        itemsPerPage: 3
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [stock, setStock] = useState([...productsPerPage.data.map((product: interfaces.Product) => {
        return { ...product, quantity: 0, totalPrice: 0 };
    })]);
    useEffect(() => {
        if (searchTerm === ''){
            dispatch(showProductsPerPage(pageStatus));
        } else {
            dispatch(searchProductByName(pageStatus));
        }
    }, [pageStatus]);
    useMemo(() => {
        setStock([...productsPerPage.data.map((product: interfaces.Product) => {
            return { ...product, quantity: 0, totalPrice: 0 };
        })]);
    }, [productsPerPage]);
    return (
        <DivTable>
            {isLoading === 'loading' ? <Loading /> : <>
                <InputSearch pageStatus={pageStatus} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
                <Table>
                    <TableHead
                        stock={stock}
                        setStock={setStock} />
                    <TableBody
                        stock={stock}
                        setStock={setStock}/>
                </Table>
                <Pagination pageStatus={{...pageStatus, searching: searchTerm}} setPageStatus={setPageStatus} data={productsPerPage}/>
            </>}
        </DivTable>
    )
}
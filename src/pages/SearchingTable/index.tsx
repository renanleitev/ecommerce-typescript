import React, {useState, useMemo, useEffect} from 'react';
import { DivTable, Table } from './styled';
import { useSelector, useDispatch } from 'react-redux';
import { AppThunkDispatch } from '../../store';
import * as interfaces from '../../interfaces';
import TableHead from '../../components/TableHead';
import TableBody from '../../components/TableBody';
import Pagination from '../../components/Pagination';
import InputSearch from '../../components/InputSearch';
import Loading from '../../components/Loading';
import { showStockPerPage } from '../../store/modules/products/reducer';

export default function SearchingTable(){
    const dispatch = useDispatch<AppThunkDispatch>();
    const stockPerPage = useSelector((state: interfaces.IRootState) => state.products.stockPerPage);
    const isLoading = useSelector((state: interfaces.IRootState) => state.products.status);
    const [pageStatus, setPageStatus] = useState<interfaces.PageNumberStatus>({
        currentPage: 1,
        productsPerPage: 3
    });
    const [stock, setStock] = useState([...stockPerPage.data.map((product: interfaces.Product) => {
        return {...product, quantity: 0, totalPrice: 0};
    })]);
    const [originalStock, setOriginalStock] = useState([...stockPerPage.data.map((product: interfaces.Product) => {
        return {...product, quantity: 0, totalPrice: 0};
    })]);
    useEffect(() => {
        dispatch(showStockPerPage(pageStatus));
    }, []);
    useMemo(() => {
        setStock([...stockPerPage.data.map((product: interfaces.Product) => {
            return {...product, quantity: 0, totalPrice: 0};
        })]);
        setOriginalStock([...stockPerPage.data.map((product: interfaces.Product) => {
            return {...product, quantity: 0, totalPrice: 0};
        })]);
    }, [stockPerPage]);
    return (
        <DivTable>
            {isLoading === 'loading' ? <Loading/> : <>
            <InputSearch
            stock={stock} 
            setStock={setStock}
            originalStock={originalStock}
            setOriginalStock={setOriginalStock}/>
            <Table>
                <TableHead 
                stock={stock} 
                setStock={setStock}/>
                <TableBody 
                stock={stock} 
                setStock={setStock}
                originalStock={originalStock}
                setOriginalStock={setOriginalStock}/>
            </Table>
            <Pagination pageStatus={pageStatus} setPageStatus={setPageStatus}/>
            </>}
        </DivTable>
    )
}
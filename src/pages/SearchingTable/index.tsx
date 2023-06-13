import React, { useState, useMemo, useCallback } from 'react';
import { DivTable, Table } from './styled';
import { useSelector, useDispatch } from 'react-redux';
import * as interfaces from '../../interfaces';
import TableHead from '../../components/TableHead';
import TableBody from '../../components/TableBody';
import Pagination from '../../components/Pagination';
import Loading from '../../components/Loading';
import { AppThunkDispatch } from '../../store';
import { searchProductByName,
    searchProductByAdditionalFeatures,
    searchProductByDescription,
    searchProductByOs, 
    showProductsPerPage,
    changePageStatus 
} from '../../store/modules/products/reducer';

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
    const handleOptions = useCallback((event: React.FormEvent<HTMLSelectElement>) => {
        option = event.currentTarget.value;
    }, []);
    const searchTable = useCallback((e: React.FormEvent<HTMLInputElement>) => {
        search = e.currentTarget.value.toString().toLowerCase();
        const newPageStatus: interfaces.PageNumberStatus = {
            ...pageStatus, 
            searching: search,
            option: option
        }
        dispatch(changePageStatus(newPageStatus));
        if (newPageStatus.searching === ''){
            dispatch(showProductsPerPage(newPageStatus));
        } else {
            console.log('InputSearch', newPageStatus);
            switch(newPageStatus.option){
                case 'Name':
                    dispatch(searchProductByName({...newPageStatus}));
                    break;
                case 'Description':
                    dispatch(searchProductByDescription({...newPageStatus}));
                    break;
                case 'Additional Features':
                    dispatch(searchProductByAdditionalFeatures({...newPageStatus}));
                    break;
                case 'Operational System':
                    dispatch(searchProductByOs({...newPageStatus}));
                    break;
                default:
                    dispatch(showProductsPerPage({...newPageStatus}));
                    break;
            }
        }
    }, []);
    return (
        <>
        <DivTable>
            {isLoading === 'loading' ? <Loading /> : <>
            <input
            onKeyUp={(event) => {
                if (event.key === "Enter") searchTable(event);
            }}
            placeholder={'Search for products...'}/>
                <select 
                onChange={handleOptions}>
                    <option value='' key=''>-</option>
                    <option value='Name' key='Name'>Name</option>
                    <option value='Description' key='Description'>Description</option>
                    <option value='Additional Features' key='Additional Features'>Additional Features</option>
                    <option value='Operational System' key='Operational System'>Operational System</option>
                </select>
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
        <Pagination data={productsPerPage}/>
        </>
    )
}
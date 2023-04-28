import React, { useCallback } from 'react';
import * as interfaces from '../../interfaces';
import {PaginationContainer} from './styled';
import { useDispatch, useSelector } from 'react-redux';
import { AppThunkDispatch } from '../../store';
import { showStockPerPage } from '../../store/modules/products/reducer';

const Pagination: React.FC<interfaces.Pagination> = (props: interfaces.Pagination) => {
    const dispatch = useDispatch<AppThunkDispatch>();
    const stock = useSelector((state: interfaces.IRootState) => state.products.stock);
    const pageStatus = props.pageStatus;
    const pageNumbers: Array<number> = [];
    for (let i = 1; i <= Math.ceil(stock.data.length/pageStatus.productsPerPage); i++) {
        pageNumbers.push(i);
    }
    const paginationProduct = useCallback((numberOfPage: number) => {
        pageStatus.currentPage = numberOfPage;
        dispatch(showStockPerPage({...pageStatus}));
        props.setPageStatus({...pageStatus});
    }, [pageStatus]);
    return (
        <PaginationContainer>
            {pageNumbers.map((numberOfPage: number) => {
                return (
                    <button
                    key={numberOfPage+1} 
                    onClick={() => paginationProduct(numberOfPage)}>
                        {numberOfPage}
                    </button>
                )
            })}
        </PaginationContainer>
    )
}

export default Pagination;
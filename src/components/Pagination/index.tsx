import React, { useState, useCallback } from 'react';
import * as interfaces from '../../interfaces';
import {PaginationContainer} from './styled';
import { useDispatch } from 'react-redux';
import { AppThunkDispatch } from '../../store';
import { showStockPerPage } from '../../store/modules/products/reducer';

const Pagination: React.FC<interfaces.ProductPagination> = (props: interfaces.ProductPagination) => {
    const dispatch = useDispatch<AppThunkDispatch>();
    const [pageStatus] = useState<interfaces.PageNumberStatus>(props.pageStatus);    
    const pageNumbers: Array<number> = [];
    for (let i = 1; i <= Math.ceil(props.dataLength/pageStatus.productsPerPage); i++) {
        pageNumbers.push(i);
    }
    const paginationProduct = useCallback((numberOfPage: number) => {
        pageStatus.currentPage = numberOfPage;
        dispatch(showStockPerPage(pageStatus));
        props.setPageStatus(pageStatus);
    }, []);
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
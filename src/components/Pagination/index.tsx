import React, { useCallback } from 'react';
import * as interfaces from '../../interfaces';
import { PaginationContainer } from './styled';
import { useDispatch } from 'react-redux';
import { AppThunkDispatch } from '../../store';
import { searchProductByName, showProductsPerPage } from '../../store/modules/products/reducer';
import { showUsersPerPage } from '../../store/modules/login/reducer';

const Pagination: React.FC<interfaces.Pagination> = (props: interfaces.Pagination) => {
    const dispatch = useDispatch<AppThunkDispatch>();
    const pageStatus = props.pageStatus;
    const pageNumbers: Array<number> = [];
    function isProductDataType(object: interfaces.ProductData | interfaces.UserData): object is interfaces.ProductData {
        return true;
    }
    for (let i = 0; i < props.data.total_pages; i++) {
        pageNumbers.push(i);        
    }
    const paginationData = useCallback((numberOfPage: number) => {
        pageStatus.currentPage = numberOfPage;
        if (isProductDataType(props.data)){
            if (props.pageStatus.searching === '') {
                dispatch(showProductsPerPage({ ...pageStatus }));
            } else {
                dispatch(searchProductByName({...pageStatus}));
            }
        } else {
            dispatch(showUsersPerPage({ ...pageStatus }));
        }
        props.setPageStatus({ ...pageStatus });
    }, [pageStatus]);
    return (
        <PaginationContainer>
            {pageNumbers.map((numberOfPage: number) => {
                return (
                    <button
                        key={numberOfPage + 1}
                        onClick={() => paginationData(numberOfPage)}>
                        {numberOfPage+1}
                    </button>
                )
            })}
        </PaginationContainer>
    )
}

export default Pagination;
import React, { useState, useCallback } from 'react';
import * as interfaces from '../../interfaces';
import {PaginationContainer} from './styled';

const Pagination: React.FC<interfaces.ProductPagination> = (props: interfaces.ProductPagination) => {
    const [pageStatus] = useState({
        currentPage: props.currentPage,
        productsPerPage: props.productsPerPage,
        firstProduct: 0,
        lastProduct: 0
    });    
    const pageNumbers: Array<number> = [];
    for (let i = 1; i <= Math.ceil(props.dataLength/pageStatus.productsPerPage); i++) {
        pageNumbers.push(i);
    }
    const paginationProduct = useCallback((numberOfPage: number) => {
        pageStatus.currentPage = numberOfPage;
        pageStatus.lastProduct = pageStatus.currentPage * pageStatus.productsPerPage;
        pageStatus.firstProduct = pageStatus.lastProduct - pageStatus.productsPerPage
        props.setIndexOfFirstProduct(pageStatus.firstProduct);
        props.setIndexOfLastProduct(pageStatus.lastProduct);
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
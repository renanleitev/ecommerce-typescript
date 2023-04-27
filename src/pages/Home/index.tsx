import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from '../../styles/GlobalStyle';
import { ProductContainer, HomeContainer } from './styled';
import { showStock, showStockPerPage } from '../../store/modules/products/reducer';
import * as interfaces from '../../interfaces';
import { AppThunkDispatch } from '../../store';
import Pagination from '../../components/Pagination';
import Loading from '../../components/Loading';

export default function Home(){
    const dispatch = useDispatch<AppThunkDispatch>();
    const stockPerPage = useSelector((state: interfaces.IRootState) => state.products.stockPerPage);
    const isLoading = useSelector((state: interfaces.IRootState) => state.products.status);
    const pageStatus = {
        currentPage: 1,
        productsPerPage: 3
    };
    useMemo(() => {
        dispatch(showStock());
    }, []);
    useMemo(() => {
        dispatch(showStockPerPage(pageStatus));
    }, []);
    return (
        <HomeContainer>
            {isLoading === 'loading' ?
            <Loading/> :
            <ProductContainer>
            {stockPerPage.data
            .map((product: interfaces.Product, index: number) => {
                return (
                    <Container key={index}> 
                        <Link key={index+1} to={`product/${product.id}`}>{product.name}</Link>
                        <img key={index+2} src={product.images} alt=''/>
                        <p key={index+3}>${product.price}</p>
                    </Container>          
                )
            })}
            </ProductContainer>}
            {!stockPerPage && <Container>No products.</Container>}
            <Pagination pageStatus={pageStatus}/>
        </HomeContainer>    
    )
}
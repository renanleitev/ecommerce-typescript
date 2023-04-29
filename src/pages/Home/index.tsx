import React, { useEffect, useState } from 'react';
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
    const stock = useSelector((state: interfaces.IRootState) => state.products.stock);
    const stockPerPage = useSelector((state: interfaces.IRootState) => state.products.stockPerPage);
    const isLoading = useSelector((state: interfaces.IRootState) => state.products.status);
    const [pageStatus, setPageStatus] = useState<interfaces.PageNumberStatus>({
        currentPage: 1,
        productsPerPage: 3
    });
    useEffect(() => {
        if (stock.data.length === 1) dispatch(showStock());
    }, []);
    useEffect(() => {
        dispatch(showStockPerPage(pageStatus));
    }, []);
    return (
        <HomeContainer>
            {isLoading === 'loading' ?
            <Loading/> :
            <ProductContainer>
            {React.Children.toArray(
                stockPerPage.data.map((product: interfaces.Product) => {
                return (
                    <Container> 
                        <Link to={`product/${product.id}`}>{product.name}</Link>
                        <img src={product.images} alt=''/>
                        <p>${product.price}</p>
                    </Container>          
                )
            }))}
            </ProductContainer>}
            <Pagination pageStatus={pageStatus} setPageStatus={setPageStatus}/>
        </HomeContainer>    
    )
}
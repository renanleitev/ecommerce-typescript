import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Loading from '../../components/Loading';
import Pagination from '../../components/Pagination';
import * as interfaces from '../../interfaces';
import { Container } from '../../styles/GlobalStyle';
import { HomeContainer, ProductContainer } from './styled';
import { AppThunkDispatch } from '../../store';
import { showStockPerPage } from '../../store/modules/products/reducer';

export default function Home(): JSX.Element {
    const stockPerPage = useSelector((state: interfaces.IRootState) => state.products.stockPerPage) || { data: [], total_pages: 0, total_items: 0 };
    const isLoading = useSelector((state: interfaces.IRootState) => state.products.status);
    const [pageStatus, setPageStatus] = useState<interfaces.PageNumberStatus>({
        currentPage: 0,
        productsPerPage: 3
    });
    const dispatch = useDispatch<AppThunkDispatch>();
    useEffect(() => {
        dispatch(showStockPerPage(pageStatus));
    }, [pageStatus]);
    return (
        <HomeContainer>
            {isLoading === 'loading' ?
                <Loading /> :
                <ProductContainer>
                    {React.Children.toArray(
                        stockPerPage.data.map((product: interfaces.Product) => {
                            return (
                                <Container>
                                    <Link to={`products/${product.id}`}>{product.name}</Link>
                                    <img src={product.image} alt='' />
                                    <p>${product.price}</p>
                                </Container>
                            )
                        }))}
                </ProductContainer>}
            <Pagination pageStatus={pageStatus} setPageStatus={setPageStatus} />
        </HomeContainer>
    )
}
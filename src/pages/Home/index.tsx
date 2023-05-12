import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loading from '../../components/Loading';
import Pagination from '../../components/Pagination';
import * as interfaces from '../../interfaces';
import { Container } from '../../styles/GlobalStyle';
import { HomeContainer, ProductContainer } from './styled';

export default function Home(): JSX.Element {
    const stockPerPage = useSelector((state: interfaces.IRootState) => state.products.stockPerPage) || { data: [], total_pages: 0, total_items: 0 };
    const isLoading = useSelector((state: interfaces.IRootState) => state.products.status);
    const [pageStatus, setPageStatus] = useState<interfaces.PageNumberStatus>({
        currentPage: 1,
        productsPerPage: 3
    });

    return (
        <HomeContainer>
            {isLoading === 'loading' ?
                <Loading /> :
                <ProductContainer>
                    {React.Children.toArray(
                        stockPerPage.data.map((product: interfaces.Product) => {
                            return (
                                <Container>
                                    <Link to={`product/${product.id}`}>{product.name}</Link>
                                    <img src={product.images} alt='' />
                                    <p>${product.price}</p>
                                </Container>
                            )
                        }))}
                </ProductContainer>}
            <Pagination pageStatus={pageStatus} setPageStatus={setPageStatus} />
        </HomeContainer>
    )
}
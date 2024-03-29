import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Loading from '../../components/Loading';
import Pagination from '../../components/Pagination';
import * as interfaces from '../../interfaces';
import { HomeContainer, ProductContainer, ItemContainer } from './styled';
import { AppThunkDispatch } from '../../store';
import { showProductsPerPage } from '../../store/modules/products/reducer';
import DataNotAvailable from '../DataNotAvailable';

export default function Home(): JSX.Element {
    const dispatch = useDispatch<AppThunkDispatch>();
    const productsPerPage = useSelector((state: interfaces.IRootState) => state.products.productsPerPage) 
    || { data: [], total_pages: 0, total_items: 0 };
    const isLoading = useSelector((state: interfaces.IRootState) => state.products.status);
    const pageStatus: interfaces.PageNumberStatus = {
        currentPage: 0,
        itemsPerPage: 3,
        type: 'product'
    };
    useEffect(() => {
        // Set default search options
        localStorage.setItem('optionProduct', '');
        localStorage.setItem('priceProduct', '');
        localStorage.setItem('operatorProduct', '');
        localStorage.setItem('searchingProduct', '');
        dispatch(showProductsPerPage(pageStatus));
    }, []);
    return (
        <>
        {productsPerPage.data === undefined || productsPerPage.total_pages === 0 ? 
        <DataNotAvailable/> :
        <HomeContainer>
            {isLoading === 'loading' ?
                <Loading /> :
                <ProductContainer>
                    {React.Children.toArray(
                        productsPerPage.data.map((product: interfaces.Product) => {
                            return (
                                <ItemContainer>
                                    <Link to={`products/${product.id}`}>{product.name}</Link>
                                    <img src={product.image} alt='' />
                                    <p>${product.price}</p>
                                </ItemContainer>
                            )
                        }))}
                </ProductContainer>}
            <Pagination data={productsPerPage} pageStatus={{...pageStatus}}/>
        </HomeContainer>}
        </>
    )
}
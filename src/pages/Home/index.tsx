import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from '../../styles/GlobalStyle';
import { ProductContainer } from './styled';
import { showStock } from '../../store/modules/products/reducer';
import * as interfaces from '../../interfaces';
import { AppThunkDispatch } from '../../store';
import Pagination from '../../components/Pagination';
import { HomeContainer } from './styled';

export default function Home(){
    const dispatch = useDispatch<AppThunkDispatch>();
    const stock = useSelector((state: interfaces.IRootState) => state.products.stock);
    const [firstProduct, setFirstProduct] = useState(0);
    const [lastProduct, setLastProduct] = useState(3);
    useMemo(() => {
        dispatch(showStock());
    }, [dispatch]);
    return (
        <HomeContainer>
            <ProductContainer>
                {stock.data
                .slice(firstProduct, lastProduct)
                .map((product: interfaces.Product, index: number) => {
                    return (
                        <Container key={index}> 
                            <Link key={index+1} to={`product/${product.id}`}>{product.name}</Link>
                            <img key={index+2} src={product.images} alt=''/>
                            <p key={index+3}>${product.price}</p>
                        </Container>          
                    )
                })}
            </ProductContainer>     
            <Pagination
                data={stock.data}
                currentPage={1}
                productsPerPage={3}
                setIndexOfFirstProduct={setFirstProduct}
                setIndexOfLastProduct={setLastProduct}
            ></Pagination>
        </HomeContainer>    
    )
}
import React, { useCallback, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from '../../styles/GlobalStyle';
import { ProductContainer, ArrowLeft, ArrowRight } from './styled';
import { IRootState } from '../../store/modules/rootReducer';
import {findStock} from '../../store/modules/products/reducer';
import * as interfaces from '../../interfaces';
import { showStock } from '../../api/products';

export default function Home(){
    const dispatch = useDispatch();
    const [count, setCount] = useState(0);
    const [limit, setLimit] = useState(5);
    const [firsLoad, setFirstLoad] = useState(true);
    useEffect(() => {
        async function getStock(){
            if (firsLoad){   
                const stock = await showStock();
                dispatch(findStock(stock));
            }
            setFirstLoad(false);
        }
        getStock();
    }, [dispatch, firsLoad]);
    const stock = useSelector((state: IRootState) => state.products.stock);
    const handlePrevious = useCallback(() => {
        if (limit >= 5) setLimit(5);
        if (count >= 5) setCount(0);
    }, [count, limit]);
    const handleNext = useCallback(() => {
        if (limit === 5) setLimit(limit+5);
        if (count === 0) setCount(count+5);
    }, [count, limit]);
    return (    
        <>
            <ProductContainer>
                {stock.data
                .slice(0+count,limit+count)
                .map((product: interfaces.Product, index: number) => {
                    return (
                        <Container key={index}> 
                            <Link key={index+1} to={`product/${product.id}`}>{product.name}</Link>
                            <img key={index+2} src={product.images} alt=''/>
                        </Container> 
                    )
                })}
            </ProductContainer>     
            <ArrowLeft onClick={handlePrevious}/>
            <ArrowRight onClick={handleNext}/>
        </>  
    )
}
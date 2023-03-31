import React, { useCallback, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from '../../styles/GlobalStyle';
import { ProductContainer, ArrowLeft, ArrowRight } from './styled';
import { showStock } from '../../store/modules/products/reducer';
import * as interfaces from '../../interfaces';
import { AppThunkDispatch } from '../../store';

export default function Home(){
    const dispatch = useDispatch<AppThunkDispatch>();
    const [count, setCount] = useState(0);
    const stock = useSelector((state: interfaces.IRootState) => state.products.stock);
    useMemo(() => {
        dispatch(showStock());
    }, [dispatch]);
    const handlePrevious = useCallback(() => {
        if (count >= 5) setCount(0);
    }, [count]);
    const handleNext = useCallback(() => {
        if (count === 0) setCount(count+5);
    }, [count]);
    return (    
        <>
            <ProductContainer>
                {stock.data
                .slice(0+count,5+count)
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
            <ArrowLeft onClick={handlePrevious}/>
            <ArrowRight onClick={handleNext}/>
        </>  
    )
}
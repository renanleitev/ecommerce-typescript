import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from '../../styles/GlobalStyle';
import { ProductContainer, ArrowLeft, ArrowRight } from './styled';
import { IRootState } from '../../store/modules/rootReducer';
import {findStock} from '../../store/modules/products/reducer';
import axios from '../../services/axios';
import * as interfaces from '../../interfaces';

export default function Home(){
    const dispatch = useDispatch();
    const [count, setCount] = useState(0);
    const [limit, setLimit] = useState(5);
    const [firsLoad, setFirstLoad] = useState(true);
    async function getData(){
        try{
            if (firsLoad){   
                const product = await axios.get('/products/');
                dispatch(findStock(product));
            }
            setFirstLoad(false);
        }
        catch(e){console.log(e);}
    }
    if (firsLoad){getData();}
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
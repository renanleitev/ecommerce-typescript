import React, { useCallback, useState } from 'react';
import { Form } from '../../styles/GlobalStyle';
import Input from '../../components/Input';
import * as interfaces from '../../interfaces';
import {createProduct} from '../../store/modules/products/reducer';
import { useDispatch } from 'react-redux';
import { AppThunkDispatch } from '../../store';
import { initialProduct } from '../../store/modules/products/reducer';

export default function CreateProduct(): JSX.Element{
    const dispatch = useDispatch<AppThunkDispatch>();
    const [product, setProduct] = useState<interfaces.Product>(initialProduct);
    const handleSubmit = useCallback((event: React.FormEvent) => {
        event.preventDefault();
        dispatch(createProduct({...product}));
    }, [dispatch, product]);
    return (
        <Form onSubmit={handleSubmit}>
            <h1>Create Product</h1> 
            <Input data={product} setData={setProduct} keyName='name' keyValue={initialProduct.name}/>
            <Input data={product} setData={setProduct} keyName='price' keyValue={initialProduct.price}/>
            <Input data={product} setData={setProduct} keyName='image' keyValue={initialProduct.image}/>
            <Input data={product} setData={setProduct} keyName='os' keyValue={initialProduct.os}/>
            <Input data={product} setData={setProduct} keyName='additionalFeatures' keyValue={initialProduct.additionalFeatures}/>
            <Input data={product} setData={setProduct} keyName='description' keyValue={initialProduct.description}/>
            <button type="submit">New Product</button>
        </Form>
    )
}
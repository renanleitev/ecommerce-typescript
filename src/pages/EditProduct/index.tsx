import React, { useCallback, useState } from 'react';
import { Form } from '../../styles/GlobalStyle';
import Input from '../../components/Input';
import * as interfaces from '../../interfaces';
import {editProduct} from '../../store/modules/products/reducer';
import { useDispatch } from 'react-redux';
import { AppThunkDispatch } from '../../store';

const EditProduct: React.FC<interfaces.EditProduct> = (props: interfaces.EditProduct) => {
    const dispatch = useDispatch<AppThunkDispatch>();
    const [product, setProduct] = useState<interfaces.Product>(props.product);
    const handleSubmit = useCallback((event: React.FormEvent) => {
        event.preventDefault();
        dispatch(editProduct({...product}));
    }, [dispatch, product]);
    return (
        <Form onSubmit={handleSubmit}>
            <h1>Edit Product</h1> 
            <Input data={product} setData={setProduct} keyName='name' keyValue={props.product.name}/>
            <Input data={product} setData={setProduct} keyName='price' keyValue={props.product.price}/>
            <Input data={product} setData={setProduct} keyName='image' keyValue={props.product.image}/>
            <Input data={product} setData={setProduct} keyName='os' keyValue={props.product.os}/>
            <Input data={product} setData={setProduct} keyName='additionalFeatures' keyValue={props.product.additionalFeatures}/>
            <Input data={product} setData={setProduct} keyName='description' keyValue={props.product.description}/>
            <button type="submit">Edit Product</button>
        </Form>
    )
}
export default EditProduct;
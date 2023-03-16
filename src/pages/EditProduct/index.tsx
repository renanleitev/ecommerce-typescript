import React, { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { Form } from '../../styles/GlobalStyle';
import InputProduct from '../../components/InputProduct';
import * as interfaces from '../../interfaces';
import {editProduct} from '../../store/modules/products/reducer';
import { useDispatch } from 'react-redux';
import { AppThunkDispatch } from '../../store';

const EditProduct: React.FC<interfaces.Item> = (props: interfaces.Item) => {
    const dispatch = useDispatch<AppThunkDispatch>();
    const [item, setItem] = useState<interfaces.Product>(props.item);
    const [confirmEdit, setConfirmEdit] = useState(false);
    const handleSubmit = useCallback((event: React.FormEvent) => {
        event.preventDefault();
        if(confirmEdit){
            dispatch(editProduct({...item}));
        } else {
            toast.success('Do you confirm the changes?');
            setConfirmEdit(true);
        }
    }, [confirmEdit, dispatch, item]);
    return (
        <Form onSubmit={handleSubmit}>
            <h1>Edit Product</h1> 
            <InputProduct data={item} setData={setItem} keyName='name' keyValue={props.item.name}/>
            <InputProduct data={item} setData={setItem} keyName='price' keyValue={props.item.price}/>
            <InputProduct data={item} setData={setItem} keyName='images' keyValue={props.item.images}/>
            <InputProduct data={item} setData={setItem} keyName='os' keyValue={props.item.os}/>
            <InputProduct data={item} setData={setItem} keyName='description' keyValue={props.item.description}/>
            <button type="submit">Edit Product</button>
        </Form>
    )
}
export default EditProduct;
import React, { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { Form } from '../../styles/GlobalStyle';
import InputProduct from '../../components/InputProduct';
import * as interfaces from '../../interfaces';
import {editProduct} from '../../api/products';
import {editItem} from '../../store/modules/products/reducer';
import { useDispatch } from 'react-redux';

const EditProduct: React.FC<interfaces.Item> = (props: interfaces.Item) => {
    const dispatch = useDispatch();
    const [item, setItem] = useState<interfaces.Product>(props.item);
    const [confirmEdit, setConfirmEdit] = useState(false);
    const handleSubmit = useCallback((event: React.FormEvent) => {
        event.preventDefault();
        if(confirmEdit){
            editProduct(item);
            dispatch(editItem(item));
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
            <InputProduct data={item} setData={setItem} keyName='screenResolution' keyValue={props.item.display.screenResolution}/>
            <InputProduct data={item} setData={setItem} keyName='screenSize' keyValue={props.item.display.screenSize}/>
            <InputProduct data={item} setData={setItem} keyName='hdd' keyValue={props.item.storage.hdd}/>
            <InputProduct data={item} setData={setItem} keyName='ram' keyValue={props.item.storage.ram}/>
            <InputProduct data={item} setData={setItem} keyName='cpu' keyValue={props.item.hardware.cpu}/>
            <InputProduct data={item} setData={setItem} keyName='wifi' keyValue={props.item.connectivity.wifi}/>
            <InputProduct data={item} setData={setItem} keyName='description' keyValue={props.item.description}/>
            <button type="submit">Edit Product</button>
        </Form>
    )
}
export default EditProduct;
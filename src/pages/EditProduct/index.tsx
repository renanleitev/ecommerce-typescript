import React, { useCallback, useState, useMemo } from 'react';
import { toast } from 'react-toastify';
import { Form } from '../../styles/GlobalStyle';
import Input from '../../components/Input';
import * as interfaces from '../../interfaces';
import {editProduct} from '../../api/products';
import {editItem} from '../../store/modules/products/reducer';
import { useDispatch } from 'react-redux';

export default function EditProduct(props: any){
    const item: interfaces.Product = props.item;
    const dispatch = useDispatch();
    const [name, setName] = useState(item.name);
    const [price, setPrice] = useState(item.price);
    const [images, setImages] = useState(item.images);
    const [opSystem, setOpSystem] = useState(item.os);
    const [resolution, setResolution] = useState(item.display.screenResolution);
    const [screenSize, setScreenSize] = useState(item.display.screenSize);
    const [storage, setStorage] = useState(item.storage.ram);
    const [memory, setMemory] = useState(item.storage.ram);
    const [cpu, setCpu] = useState(item.hardware.cpu);
    const [wifi, setWifi] = useState(item.connectivity.wifi);
    const [description, setDescription] = useState(item.description);
    const [editedProduct, setEditedProduct] = useState<interfaces.Product>({...item});
    const [confirmEdit, setConfirmEdit] = useState(false);
    useMemo(() => {
        setEditedProduct({
            ...item,
            name: name,
            price: price,
            images: images,
            os: opSystem,
            display: {
                screenResolution: resolution,
                screenSize: screenSize,
            },
            storage: {
                hdd: storage,
                ram: memory,
            },
            hardware: {
                cpu: cpu,
            },
            connectivity: {
                wifi: wifi,
            },
            description: description,
        })
    }, [cpu, description, images, item, memory, name, opSystem, price, resolution, screenSize, storage, wifi]);
    const handleSubmit = useCallback((event: React.FormEvent) => {
        event.preventDefault();
        if(confirmEdit){
            editProduct(editedProduct);
            dispatch(editItem(editedProduct));
        } else {
            toast.success('Do you confirm the changes?');
            setConfirmEdit(true);
        }
    }, [confirmEdit, dispatch, editedProduct]);
    return (
        <Form onSubmit={handleSubmit}>
            <h1>Edit Product</h1> 
            <Input field={name} setField={setName} placeholder='name'/>
            <Input field={price} setField={setPrice} placeholder='price'/>
            <Input field={images} setField={setImages} placeholder='images'/>
            <Input field={opSystem} setField={setOpSystem} placeholder='operational system'/>
            <Input field={resolution} setField={setResolution} placeholder='resolution'/>
            <Input field={screenSize} setField={setScreenSize} placeholder='screen size'/>
            <Input field={storage} setField={setStorage} placeholder='storage'/>
            <Input field={memory} setField={setMemory} placeholder='memory'/>
            <Input field={cpu} setField={setCpu} placeholder='cpu'/>
            <Input field={wifi} setField={setWifi} placeholder='wifi'/>
            <Input field={description} setField={setDescription} placeholder='description'/>
            <button type="submit">Edit Product</button>
        </Form>
    )
}
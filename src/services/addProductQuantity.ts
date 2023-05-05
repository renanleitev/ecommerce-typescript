import * as interfaces from '../interfaces';
import { AppThunkDispatch } from '../store';
import {changeProductQuantityCart} from '../store/modules/products/reducer';
import { toast } from 'react-toastify';

export function addProductQuantity(
    product: interfaces.Product,
    dispatch: AppThunkDispatch,
): interfaces.Product {
    const newProduct: interfaces.Product = {...product}; 
    newProduct.totalPrice += Number.parseFloat(newProduct.price);
    newProduct.quantity++;
    toast.success(`Added ${newProduct.name} successfully!`);
    dispatch(changeProductQuantityCart({...newProduct}));
    return newProduct;
}
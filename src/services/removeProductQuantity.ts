import * as interfaces from '../interfaces';
import { AppThunkDispatch } from '../store';
import {changeProductQuantityCart} from '../store/modules/products/reducer';
import { toast } from 'react-toastify';

export function removeProductQuantity(
    product: interfaces.Product,
    dispatch: AppThunkDispatch,
) {
    const newProduct: interfaces.Product = {...product}; 
    newProduct.totalPrice -= Number.parseFloat(newProduct.price);
    newProduct.quantity--;
    toast.success(`Removed ${newProduct.name} successfully!`);
    dispatch(changeProductQuantityCart({...newProduct}));
    return newProduct;
}
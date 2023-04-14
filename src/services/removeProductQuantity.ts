import * as interfaces from '../interfaces';
import { AppThunkDispatch } from '../store';
import {changeProductQuantityCart} from '../store/modules/products/reducer';
import { toast } from 'react-toastify';

export function removeProductQuantity(
    item: interfaces.Product,
    dispatch: AppThunkDispatch,
) {
    const newItem: interfaces.Product = {...item}; 
    newItem.totalPrice -= Number.parseFloat(newItem.price);
    newItem.quantity--;
    toast.success(`Removed ${newItem.name} successfully!`);
    dispatch(changeProductQuantityCart({...newItem}));
    return newItem;
}
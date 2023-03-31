import * as interfaces from '../interfaces';
import { AppThunkDispatch } from '../store';
import {changeQuantity} from '../store/modules/products/reducer';
import { toast } from 'react-toastify';

export function changeProductQuantity(
    item: interfaces.Product,
    operation: string,
    dispatch: AppThunkDispatch,
) {
    const newItem: interfaces.Product = {...item}; 
    if (operation === 'add') {
        newItem.totalPrice += Number.parseFloat(newItem.price);
        newItem.quantity++;
        toast.success(`Added ${newItem.name} successfully!`);
    }
    if (operation === 'remove'){
        newItem.totalPrice -= Number.parseFloat(newItem.price);
        newItem.quantity--;
        toast.success(`Removed ${newItem.name} successfully!`);
    }
    dispatch(changeQuantity({...newItem}));
    return newItem;
}
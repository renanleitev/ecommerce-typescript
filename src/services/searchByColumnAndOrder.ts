import * as interfaces from '../interfaces';
import switchOptionSearch from './switchOptionSearch';

export default function searchByColumnAndOrder(
    column: string, 
    order: string, 
    type: string,
    dispatch: CallableFunction,
): void {
    if (type === 'product'){
        localStorage.setItem('columnProduct', column);
        localStorage.setItem('orderProduct', order);
        localStorage.setItem('optionProduct', 'Order');
    } else if (type === 'user'){
        localStorage.setItem('columnUser', column);
        localStorage.setItem('orderUser', order);
        localStorage.setItem('optionUser', 'Order');
    }
    const newPageStatus: interfaces.PageNumberStatus = {
        currentPage: 0,
        itemsPerPage: 3,
        column: column,
        order: order,
        option: 'Order',
        type: type
    };
    switchOptionSearch(newPageStatus, dispatch);
}
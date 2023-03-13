import axios from '../../services/axios';
import * as interfaces from '../../interfaces';
import { toast } from 'react-toastify';
import history from '../../services/history';

export const showProduct = async (id: string) => {
    try{
        const product = await axios.get(`/products/${id}`);
        return product.data;
    }
    catch(e){console.log(e);}
}

export const showStock = async () => {
    try{
        const stock = await axios.get('/products/');
        return stock;
    }
    catch(e){console.log(e);}
}

export const editProduct = async (product: interfaces.Product) => {
    try{
        await axios.put(`/products/${product.id}`, product);
        toast.success('Edit product successfully.');
        history.push('/');
    }
    catch(e){console.log(e);}
}
import axios from '../../services/axios';

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
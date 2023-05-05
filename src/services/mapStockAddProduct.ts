import * as interfaces from '../interfaces';

export default function mapStockAddProduct(
    stock: Array<interfaces.Product>,
    product: interfaces.Product
    ):  Array<interfaces.Product> {
    const updateProduct = (item: interfaces.Product) => {
        if (item.name === product.name) {
            return {...item, 
                quantity: item.quantity + 1,
                totalPrice: item.totalPrice + Number.parseFloat(item.price)
            }
        }
        return {...item};
    }
    const updatedStock = stock.map(updateProduct);
    return updatedStock;
}
import * as interfaces from '../interfaces';

export default function mapStockRemoveProduct(
    stock: Array<interfaces.Product>,
    product: interfaces.Product
    ) {
    return stock.map((item: interfaces.Product) => {
        if (item.name === product.name && product.quantity > 0) {
            return {...item, 
                quantity: item.quantity - 1,
                totalPrice: item.totalPrice - Number.parseFloat(item.price)
            }
        }
        return {...item};
    })
}
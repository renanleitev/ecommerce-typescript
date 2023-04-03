import * as interfaces from '../interfaces';

export default function mapStock(
    stock: Array<interfaces.Product>,
    product: interfaces.Product,
    operation: string,
    ) {
    return stock.map((item: interfaces.Product) => {
        if (item.name === product.name) {
            if (operation === 'add') {
                return {...item, 
                    quantity: item.quantity + 1,
                    totalPrice: item.totalPrice + Number.parseFloat(item.price)
                }
            }
            if (operation === 'remove' && item.quantity >= 1) {
                return {...item, 
                    quantity: item.quantity - 1,
                    totalPrice: item.totalPrice - Number.parseFloat(item.price)
                }
            }
        }
        return {...item};
    })
}
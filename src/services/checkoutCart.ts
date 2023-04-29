import { Product } from "../interfaces";
import { toast } from "react-toastify";

export function checkoutCart(cart: Array<Product>) {
    let total = 0;
    cart.forEach((product: Product) => {
        if (product !== undefined) total += product.totalPrice;
    });
    toast.success(`Thank you! Your total is $${total.toFixed(2)}`);
    return total;
}
import { Product } from "../interfaces";
import { toast } from "react-toastify";

export function checkoutCart(cart: Array<Product>) {
    let total = 0;
    cart.forEach((item: Product) => {
        if (item !== undefined) total += item.totalPrice;
    });
    toast.success(`Thank you! Your total is $${total.toFixed(2)}`);
    return total;
}
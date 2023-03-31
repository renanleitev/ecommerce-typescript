import { mockProduct } from "../services/_utils";
import { checkoutCart } from "../services/checkoutCart";

describe('Testing checkoutCart', () => {
    it('should sum the total price of all products', () => {
        const total = checkoutCart([{...mockProduct}]);
        expect(total).toBe(mockProduct.totalPrice);
    })
})
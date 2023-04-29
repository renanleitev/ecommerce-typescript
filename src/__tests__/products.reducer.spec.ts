import {
    initialState,
    initialProduct,
    inventoryReducer,
    addProductCart,
    changeProductQuantityCart,
    removeProductCart,
    removeAllProductsCart,
    showStock,
    showProduct,
    editProduct
} from '../store/modules/products/reducer';
import { 
    dispatchProductEx,
    mockProduct,
    mockProductStateCart,
    storeProduct,
} from '../services/_utils';
import axios from '../services/axios';
import * as interfaces from '../interfaces';

jest.mock('../services/axios');

afterEach(() => {
    jest.clearAllMocks();
});

describe('Testing initialState', () => {
    it('should have status', () => {
        expect(initialState).toHaveProperty(['status']);
    });
    it('should have error', () => {
        expect(initialState).toHaveProperty(['error']);
    });
    it('should have stock', () => {
        expect(initialState).toHaveProperty(['stock']);
    });
    it('should have product', () => {
        expect(initialState).toHaveProperty(['product']);
    });
    it('should have cart', () => {
        expect(initialState).toHaveProperty(['cart']);
    });
    it('status should be idle', () => {
        expect(initialState.status).toBe('idle');
    });
    it('error should be empty string', () => {
        expect(initialState.error).toBe('');
    });
    it('stock.data should be an array of Product', () => {
        expect(initialState.stock.data).toEqual([{...initialProduct}]);
    });
    it('product.id should be an empty string', () => {
        expect(initialState.product.id).toBe('');
    });
    it('product.name should be an empty string', () => {
        expect(initialState.product.name).toBe('');
    });
    it('product.images should be an empty string', () => {
        expect(initialState.product.images).toBe('');
    });
    it('product.price should be an empty string', () => {
        expect(initialState.product.price).toBe('');
    });
    it('product.quantity should be 0', () => {
        expect(initialState.product.quantity).toBe(0);
    });
    it('product.totalPrice should be 0', () => {
        expect(initialState.product.totalPrice).toBe(0);
    });
    it('product.os should be an empty string', () => {
        expect(initialState.product.os).toBe('');
    });
    it('product.description should be an empty string', () => {
        expect(initialState.product.description).toBe('');
    });
    it('product.additionalFeatures should be an empty string', () => {
        expect(initialState.product.additionalFeatures).toEqual('');
    });
    it('cart should be an empty array', () => {
        expect(initialState.cart).toEqual([]);
    });
});

describe('Testing products reducers', () => {
    it('should return initialState', () => {
        expect(inventoryReducer(undefined, { type: undefined })).toEqual(initialState);
    });
    it('should add product to cart', () => {
        expect(inventoryReducer(initialState, addProductCart(mockProduct))).toEqual(mockProductStateCart);
    });
    it('should change product quantity', () => {
        expect(inventoryReducer(mockProductStateCart, changeProductQuantityCart({
            ...mockProduct,
            quantity: 2,
            totalPrice: 400.11,
        }))).toEqual({
            ...mockProductStateCart,
            cart: [{
                ...mockProduct,
                quantity: 2,
                totalPrice: 400.11,
            }]
        });
    });
    it('should remove product of cart', () => {
        expect(inventoryReducer(mockProductStateCart, removeProductCart(mockProduct))).toEqual(initialState);
    });
    it('should remove all products of cart', () => {
        expect(inventoryReducer(mockProductStateCart, removeAllProductsCart())).toEqual(initialState);
    });
});

describe('Testing products async thunks', () => {
    it('should get stock of products', async () => {
        const expectedResult = {data: {...mockProduct}};
        axios.get = jest.fn().mockResolvedValue(expectedResult);
        const result = await dispatchProductEx(showStock());
        expect(result.payload.data).toEqual(mockProduct);
        expect(storeProduct.getState().stock.data).toEqual(mockProduct);
    });
    it('should get product', async () => {
        const expectedResult = {data: {...mockProduct}};
        axios.get = jest.fn().mockResolvedValue(expectedResult);
        await dispatchProductEx(showProduct('1'));
        expect(storeProduct.getState().product).toEqual(mockProduct);
    });
    it('should edit product', async () => {
        const editedProduct: interfaces.Product = {
            ...mockProduct,
            price: '777.77',
        };
        axios.put = jest.fn().mockResolvedValue(editedProduct);
        await dispatchProductEx(editProduct(editedProduct));
        expect(storeProduct.getState().product).toEqual(editedProduct);
    });
});
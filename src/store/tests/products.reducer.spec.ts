import {
    initialState,
    inventoryReducer,
    addItem,
    changeQuantity,
    removeItem,
    removeCart,
    showStock,
    showProduct,
    editProduct
} from '../modules/products/reducer';
import { 
    dispatchEx,
    mockProduct,
    mockState,
    store,
} from '../utils';
import axios from '../../services/axios';
import * as interfaces from '../../interfaces';

jest.mock('../../services/axios');

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
    it('stock.data should be an array of object', () => {
        expect(initialState.stock.data).toEqual([{}]);
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
    it('should add item to cart', () => {
        expect(inventoryReducer(initialState, addItem(mockProduct))).toEqual(mockState);
    });
    it('should change item quantity', () => {
        expect(inventoryReducer(mockState, changeQuantity({
            ...mockProduct,
            quantity: 2,
            totalPrice: 400.11,
        }))).toEqual({
            ...mockState,
            cart: [{
                ...mockProduct,
                quantity: 2,
                totalPrice: 400.11,
            }]
        });
    });
    it('should remove item of cart', () => {
        expect(inventoryReducer(mockState, removeItem(mockProduct))).toEqual(initialState);
    });
    it('should remove all items of cart', () => {
        expect(inventoryReducer(mockState, removeCart())).toEqual(initialState);
    });
});

describe('Testing products async thunks', () => {
    it('should get stock of products', async () => {
        const expectedResult = {data: {...mockProduct}};
        axios.get = jest.fn().mockResolvedValue(expectedResult);
        const result = await dispatchEx(showStock());
        expect(result.payload.data).toEqual(mockProduct);
        expect(store.getState().stock.data).toEqual(mockProduct);
    });
    it('should get product', async () => {
        const expectedResult = {data: {...mockProduct}};
        axios.get = jest.fn().mockResolvedValue(expectedResult);
        await dispatchEx(showProduct('1'));
        expect(store.getState().product).toEqual(mockProduct);
    });
    it('should edit product', async () => {
        const editedProduct: interfaces.Product = {
            ...mockProduct,
            price: '777.77',
        };
        axios.put = jest.fn().mockResolvedValue(editedProduct);
        await dispatchEx(editProduct(editedProduct));
        expect(store.getState().product).toEqual(editedProduct);
    });
});
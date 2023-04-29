import React from 'react';
import {screen, render, fireEvent} from '@testing-library/react';
import Product from '../pages/Product';
import {
    mockStore,
    mockStoreProductCart,
    mockProduct,
} from '../services/_utils';
import { RenderComponent } from '../services/_utilsComponents';

afterEach(() => {
    jest.clearAllMocks();
});

describe('Testing Product page', () => {
    it('should be initial render', () => {
        render(RenderComponent(<Product/>, mockStoreProductCart));
        // Description
        const description = screen.getByText(/description/i);
        expect(description.innerHTML).toBe(`Description: ${mockProduct.description}`);
        // Operational System
        const opSystemProduct = screen.getByText(/operational/i);
        expect(opSystemProduct.innerHTML).toBe(`Operational System: ${mockProduct.os}`);  
        // Additional Features
        const addFeatures = screen.getByText(/additional/i);
        expect(addFeatures.innerHTML).toBe(`Additional Features: ${mockProduct.additionalFeatures}`);  
        // Image
        const imgProduct = screen.getByRole('img').getAttribute('src');  
        expect(imgProduct).toBe(`${mockProduct.images}`);  
        // Price
        const priceProduct = screen.getByText(/price/i);
        expect(priceProduct.innerHTML).toBe(`Price: $${mockProduct.price}`);  
        // Total Price
        const totalPriceProduct = screen.getByText(/total/i);
        expect(totalPriceProduct.innerHTML).toBe(`Total: $${mockProduct.totalPrice}`);
        // Quantity
        const quantProduct = screen.getByText(/quantity/i);
        expect(quantProduct.innerHTML).toBe(`Quantity: ${mockProduct.quantity}`); 
    });
    it('should add quantity of product (previously added)', async () => {
        render(RenderComponent(<Product/>, mockStoreProductCart));
        const quantProduct = screen.getByText(/quantity/i);
        // addProduct
        const addProduct = screen.getByText(/\+/i);
        fireEvent.click(addProduct);
        expect(quantProduct.innerHTML).toBe(`Quantity: ${mockProduct.quantity + 1}`); 
        // addProduct with toast
        const addProductToast = await screen.findByText(/added/i);
        expect(addProductToast.innerHTML).toBe(`Added ${mockProduct.name} successfully!`);
    });
    it('should remove quantity of product, but product.quantity === 1', async () => {
        render(RenderComponent(<Product/>, mockStoreProductCart));
        const quantProduct = screen.getByText(/quantity/i); 
        // removeProduct
        const removeProduct = screen.getByText(/-/i);
        fireEvent.click(removeProduct);
        expect(quantProduct.innerHTML).toBe(`Quantity: ${mockProduct.quantity - 1}`); 
        // Trying to removeProduct with product.quantity === 1
        const removeProductToast = await screen.findByText(/can not/i); 
        expect(removeProductToast.innerHTML).toBe(`Can not remove the product.`);
    });
    it('should remove product of cart', async () => {
        render(RenderComponent(<Product/>, mockStoreProductCart));
        const quantProduct = screen.getByText(/quantity/i); 
        // removeProduct
        const removeProduct = screen.getByText(/remove/i);
        fireEvent.click(removeProduct);
        expect(quantProduct.innerHTML).toBe(`Quantity: ${mockProduct.quantity - 1}`); 
    });
    it('should add quantity of product (product not added)', async () => {
        render(RenderComponent(<Product/>, mockStore));
        const quantProduct = screen.getByText(/quantity/i);
        // Can not addProduct, if was not added to the cart
        const addProduct = screen.getByText(/\+/i);
        fireEvent.click(addProduct);
        expect(quantProduct.innerHTML).toBe(`Quantity: 0`); 
        // addProduct with toast
        const addProductToast = await screen.findByText(/can not/i); 
        expect(addProductToast.innerHTML).toBe(`Can not add the product.`); 
    });
});
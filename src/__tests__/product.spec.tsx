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
        const opSystem = screen.getByText(/operational/i);
        expect(opSystem.innerHTML).toBe(`Operational System: ${mockProduct.os}`);  
        // Additional Features
        const addFeatures = screen.getByText(/additional/i);
        expect(addFeatures.innerHTML).toBe(`Additional Features: ${mockProduct.additionalFeatures}`);  
        // Image
        const imgItem = screen.getByRole('img').getAttribute('src');  
        expect(imgItem).toBe(`${mockProduct.images}`);  
        // Price
        const priceItem = screen.getByText(/price/i);
        expect(priceItem.innerHTML).toBe(`Price: $${mockProduct.price}`);  
        // Total Price
        const totalItem = screen.getByText(/total/i);
        expect(totalItem.innerHTML).toBe(`Total: $${mockProduct.totalPrice}`);
        // Quantity
        const quantItem = screen.getByText(/quantity/i);
        expect(quantItem.innerHTML).toBe(`Quantity: ${mockProduct.quantity}`); 
    });
    it('should add quantity of item (previously added)', async () => {
        render(RenderComponent(<Product/>, mockStoreProductCart));
        const quantItem = screen.getByText(/quantity/i);
        // addItem
        const addItem = screen.getByText(/\+/i);
        fireEvent.click(addItem);
        expect(quantItem.innerHTML).toBe(`Quantity: ${mockProduct.quantity + 1}`); 
        // addItem with toast
        const addItemToast = await screen.findByText(/added/i);
        expect(addItemToast.innerHTML).toBe(`Added ${mockProduct.name} successfully!`);
    });
    it('should remove quantity of item, but item.quantity === 1', async () => {
        render(RenderComponent(<Product/>, mockStoreProductCart));
        const quantItem = screen.getByText(/quantity/i); 
        // removeItem
        const removeItem = screen.getByText(/-/i);
        fireEvent.click(removeItem);
        expect(quantItem.innerHTML).toBe(`Quantity: ${mockProduct.quantity - 1}`); 
        // Trying to removeItem with item.quantity === 1
        const removeItemToast = await screen.findByText(/can not/i); 
        expect(removeItemToast.innerHTML).toBe(`Can not remove the item.`);
    });
    it('should remove item of cart', async () => {
        render(RenderComponent(<Product/>, mockStoreProductCart));
        const quantItem = screen.getByText(/quantity/i); 
        // removeItem
        const removeItem = screen.getByText(/remove/i);
        fireEvent.click(removeItem);
        expect(quantItem.innerHTML).toBe(`Quantity: ${mockProduct.quantity - 1}`); 
    });
    it('should add quantity of item (item not added)', async () => {
        render(RenderComponent(<Product/>, mockStore));
        const quantItem = screen.getByText(/quantity/i);
        // Can not addItem, if was not added to the cart
        const addItem = screen.getByText(/\+/i);
        fireEvent.click(addItem);
        expect(quantItem.innerHTML).toBe(`Quantity: 0`); 
        // addItem with toast
        const addItemToast = await screen.findByText(/can not/i); 
        expect(addItemToast.innerHTML).toBe(`Can not add the item.`);
    });
});
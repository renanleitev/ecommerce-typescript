import React from 'react';
import {screen, render, fireEvent} from '@testing-library/react';
import Shopping from '../pages/Shopping';
import {
    mockStore, 
    mockStoreUserLoggedIn,
    mockProduct,
} from '../services/_utils';
import { RenderComponent } from '../services/_utilsComponents';

afterEach(() => {
    jest.clearAllMocks();
});

describe('Testing Shopping page', () => {
    it('should be initial render', () => {
        render(RenderComponent(<Shopping/>, mockStore));
        const emptyCart = screen.getByRole('heading');
        expect(emptyCart.innerHTML).toBe('No products in your cart.');  
    });
    it('should have one item in cart', () => {
        render(RenderComponent(<Shopping/>, mockStoreUserLoggedIn));
        const linkItem = screen.getByRole('link');
        expect(linkItem.innerHTML).toBe(`${mockProduct.name}`);  
        const imgItem = screen.getByRole('img').getAttribute('src');
        expect(imgItem).toBe(`${mockProduct.images}`); 
        const priceItem = screen.getByText(/price/i);
        expect(priceItem.innerHTML).toBe(`Price: $${mockProduct.price}`);  
        const quantItem = screen.getByText(/quantity/i);
        expect(quantItem.innerHTML).toBe(`Quantity: ${mockProduct.quantity}`);  
        const totalItem = screen.getByText(/total/i);
        expect(totalItem.innerHTML).toBe(`Total: $${mockProduct.totalPrice}`);
    });
    it('should add quantity of item in cart', async () => {
        render(RenderComponent(<Shopping/>, mockStoreUserLoggedIn));
        const quantItem = screen.getByText(/quantity/i);
        // addItem
        const addItem = screen.getByText(/\+/i);
        fireEvent.click(addItem);
        expect(quantItem.innerHTML).toBe(`Quantity: ${mockProduct.quantity + 1}`); 
        // addItem with toast
        const addItemToast = await screen.findByText(/added/i);
        expect(addItemToast.innerHTML).toBe(`Added ${mockProduct.name} successfully!`);
    });
    it('should remove quantity of item in cart', async () => {
        render(RenderComponent(<Shopping/>, mockStoreUserLoggedIn));
        const quantItem = screen.getByText(/quantity/i); 
        // removeItem
        const removeItem = screen.getByText(/-/i);
        fireEvent.click(removeItem);
        expect(quantItem.innerHTML).toBe(`Quantity: ${mockProduct.quantity}`); 
        // removeItem with toast
        const removeItemToast = await screen.findByText(/removed/i);
        expect(removeItemToast.innerHTML).toBe(`Removed ${mockProduct.name} successfully!`);
    });
    it('should remove item of cart', () => {
        render(RenderComponent(<Shopping/>, mockStoreUserLoggedIn));
        const removeItem = screen.getByText(/remove/i);
        fireEvent.click(removeItem);
        const emptyCart = screen.getByRole('heading');
        expect(emptyCart.innerHTML).toBe('No products in your cart.');  
    });
    it('should checkout cart', async () => {
        render(RenderComponent(<Shopping/>, mockStoreUserLoggedIn));
        const cartButton = screen.getByRole('button');
        fireEvent.click(cartButton);
        const cartButtonToast = await screen.findByText(/thank you/i);
        expect(cartButtonToast.innerHTML).toBe("Thank you! Your total is $0.00"); 
    });
});
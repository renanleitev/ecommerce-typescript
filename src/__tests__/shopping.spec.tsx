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
    it('should have one Product in cart', () => {
        render(RenderComponent(<Shopping/>, mockStoreUserLoggedIn));
        // URL 
        const linkProduct = screen.getByRole('link');
        expect(linkProduct.innerHTML).toBe(`${mockProduct.name}`);  
        // Image 
        const imgProduct = screen.getByRole('img').getAttribute('src');
        expect(imgProduct).toBe(`${mockProduct.image}`);
        // Price   
        const priceProduct = screen.getByText(/price/i);
        expect(priceProduct.innerHTML).toBe(`Price: $${mockProduct.price}`);  
        // Quantity
        const quantProduct = screen.getByText(/quantity/i);
        expect(quantProduct.innerHTML).toBe(`Quantity: ${mockProduct.quantity}`);  
        // Total Price
        const totalProduct = screen.getByText(/total/i);
        expect(totalProduct.innerHTML).toBe(`Total: $${mockProduct.totalPrice}`);
    });
    it('should add quantity of Product in cart', async () => {
        render(RenderComponent(<Shopping/>, mockStoreUserLoggedIn));
        const quantProduct = screen.getByText(/quantity/i);
        // addProduct
        const addProduct = screen.getByText(/\+/i);
        fireEvent.click(addProduct);
        expect(quantProduct.innerHTML).toBe(`Quantity: ${mockProduct.quantity + 1}`); 
        // addProduct with toast
        const addProductToast = await screen.findByText(/added/i);
        expect(addProductToast.innerHTML).toBe(`Added ${mockProduct.name} successfully!`);
    });
    it('should remove quantity of Product in cart', async () => {
        render(RenderComponent(<Shopping/>, mockStoreUserLoggedIn));
        const quantProduct = screen.getByText(/quantity/i); 
        // removeProduct
        const removeProduct = screen.getByText(/-/i);
        fireEvent.click(removeProduct);
        expect(quantProduct.innerHTML).toBe(`Quantity: ${mockProduct.quantity}`); 
        // removeProduct with toast
        const removeProductToast = await screen.findByText(/removed/i);
        expect(removeProductToast.innerHTML).toBe(`Removed ${mockProduct.name} successfully!`);
    });
    it('should remove Product of cart', () => {
        render(RenderComponent(<Shopping/>, mockStoreUserLoggedIn));
        const removeProduct = screen.getByText(/remove/i);
        fireEvent.click(removeProduct);
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
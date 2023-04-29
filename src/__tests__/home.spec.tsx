import React from 'react';
import {screen, render} from '@testing-library/react';
import Home from '../pages/Home';
import {mockProduct, mockStoreProductCart} from '../services/_utils';
import { RenderComponent } from '../services/_utilsComponents';

afterEach(() => {
    jest.clearAllMocks();
});

describe('Testing Home page', () => {
    it('should be initial render', () => {
        render(RenderComponent(<Home/>, mockStoreProductCart));
        const linkProduct = screen.getByRole('link');
        expect(linkProduct.innerHTML).toBe(`${mockProduct.name}`);  
        const imgProduct = screen.getByRole('img').getAttribute('src');  
        expect(imgProduct).toBe(`${mockProduct.images}`); 
    });
});
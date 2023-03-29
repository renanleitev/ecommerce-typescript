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
        const linkItem = screen.getByRole('link');
        expect(linkItem.innerHTML).toBe(`${mockProduct.name}`);  
        const imgItem = screen.getByRole('img').getAttribute('src');  
        expect(imgItem).toBe(`${mockProduct.images}`); 
    });
});
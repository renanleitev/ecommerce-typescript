import React from 'react';
import {screen, render} from '@testing-library/react';
import Home from '../pages/Home';
import {
    mockStore, 
    mockStoreUserLoggedIn,
    mockProduct,
} from '../services/_utils';
import { RenderComponent } from '../services/_utilsComponents';

jest.mock('../pages/Home');

afterEach(() => {
    jest.clearAllMocks();
});

describe('Testing Home page', () => {
    it('should be initial render', () => {
        render(RenderComponent(<Home/>, mockStoreUserLoggedIn));
        const linkItem = screen.getByRole('link');
        expect(linkItem.innerHTML).toBe(`${mockProduct.name}`);  
        const imgItem = screen.getByRole('img').getAttribute('src'); 
        expect(imgItem).toBe(`${mockProduct.images}`); 
        expect(1).toBe(1);
    });
});
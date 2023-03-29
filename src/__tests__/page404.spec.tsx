import React from 'react';
import {screen, render} from '@testing-library/react';
import Page404 from '../pages/Page404';
import {
    mockStoreUserLoggedIn,
    mockProduct,
} from '../services/_utils';
import { RenderComponent } from '../services/_utilsComponents';

afterEach(() => {
    jest.clearAllMocks();
});

describe('Testing Page404', () => {
    it('should be initial render', () => {
        render(RenderComponent(<Page404/>, mockStoreUserLoggedIn));
        const errorMsg = screen.getByRole('heading');
        expect(errorMsg.innerHTML).toBe('Error. Page not found.');  
        expect(1).toBe(1); 
    });
});
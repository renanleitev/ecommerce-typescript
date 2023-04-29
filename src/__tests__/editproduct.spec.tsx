import React from 'react';
import { render, screen } from '@testing-library/react';
import EditProduct from '../pages/EditProduct';
import { RenderComponent } from '../services/_utilsComponents';
import { mockProduct, mockStore } from '../services/_utils';

describe('Testing EditProduct page', () => {
    it('should be initial render', () => {
        render(RenderComponent(<EditProduct product={mockProduct}/>, mockStore));
        // Submit button
        const editButton = screen.getByRole('button');
        expect(editButton.innerHTML).toBe('Edit Product');
        // Inputs
        expect(screen.getByLabelText('Name').getAttribute("placeholder")).toBe('Name');
        expect(screen.getByLabelText('Price').getAttribute("placeholder")).toBe('Price');
        expect(screen.getByLabelText('Images').getAttribute("placeholder")).toBe('Images');
        expect(screen.getByLabelText('Os').getAttribute("placeholder")).toBe('Os');
        expect(screen.getByLabelText('Description').getAttribute("placeholder")).toBe('Description'); 
    });
});
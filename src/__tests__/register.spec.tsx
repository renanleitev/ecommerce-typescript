import React from 'react';
import {screen, render} from '@testing-library/react';
import Register from '../pages/Register';
import {mockStoreUserLoggedIn} from '../services/_utils';
import { RenderComponent } from '../services/_utilsComponents';

afterEach(() => {
    jest.clearAllMocks();
});

describe('Testing Register page', () => {
    it('should be initial render', () => {
        render(RenderComponent(<Register/>, mockStoreUserLoggedIn));
        // Title
        const title = screen.getByRole('heading');
        expect(title.innerHTML).toBe('Create an account');
        // Submit button
        const submitButton = screen.getByRole('button');
        expect(submitButton.innerHTML).toBe('Create');
        // Inputs
        expect(screen.getByLabelText('Name').getAttribute("placeholder")).toBe('Name');
        expect(screen.getByLabelText('Surname').getAttribute("placeholder")).toBe('Surname');
        expect(screen.getByLabelText('Address').getAttribute("placeholder")).toBe('Address');
        expect(screen.getByLabelText('Email').getAttribute("placeholder")).toBe('Email');
        expect(screen.getByLabelText('Password').getAttribute("placeholder")).toBe('Password');
    });
});
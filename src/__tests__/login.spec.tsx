import React from 'react';
import {screen, render} from '@testing-library/react';
import Login from '../pages/Login';
import {
    mockStore,
    mockStoreUserLoggedIn,
} from '../services/_utils';
import { RenderComponent } from '../services/_utilsComponents';

afterEach(() => {
    jest.clearAllMocks();
});

describe('Testing Login page', () => {
    it('should be initial render (user not loggedin)', () => {
        render(RenderComponent(<Login/>, mockStore));
        // Title
        const title = screen.getByRole('heading');
        expect(title.innerHTML).toBe('Login');
        // Submit button
        const submitButton = screen.getByRole('button');
        expect(submitButton.innerHTML).toBe('Login');
        // Link to register
        const linkRegister = screen.getByRole('link');
        expect(linkRegister.innerHTML).toBe("Don't have an account? Click here to make a new one!");
        // Inputs
        expect(screen.getByLabelText('Email').getAttribute("placeholder")).toBe('Email');
        expect(screen.getByLabelText('Password').getAttribute("placeholder")).toBe('Password');
    });
    it('should render edit page (user loggedin)', () => {
        render(RenderComponent(<Login/>, mockStoreUserLoggedIn));
        const buttons = screen.getAllByRole('button');
        // Title
        const title = screen.getByRole('heading');
        expect(title.innerHTML).toBe('Edit');
        // Edit button
        expect(buttons[0].innerHTML).toBe('Edit');
        // Delete button
        expect(buttons[1].innerHTML).toBe('Delete');
        // Inputs
        expect(screen.getByLabelText('Name').getAttribute("placeholder")).toBe('Name');
        expect(screen.getByLabelText('Surname').getAttribute("placeholder")).toBe('Surname');
        expect(screen.getByLabelText('Address').getAttribute("placeholder")).toBe('Address');
        expect(screen.getByLabelText('Email').getAttribute("placeholder")).toBe('Email');
        expect(screen.getByLabelText('Password').getAttribute("placeholder")).toBe('Password');
    });
});
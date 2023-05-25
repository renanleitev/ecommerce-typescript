import React from 'react';
import {screen, render} from '@testing-library/react';
import Header from "../components/Header";
import {
    mockStore, 
    mockStoreUserLoggedIn,
    mockUser,
} from '../services/_utils';
import { RenderComponent } from '../services/_utilsComponents';

describe('Testing Header', () => {
    it('should be initial render', () => {
        render(RenderComponent(<Header/>, mockStore));
        const test = 't';
        expect(screen.queryByText(test)).toBeNull();
    });
    it('should get all links, but user is not loggedin', async () => {
        render(RenderComponent(<Header/>, mockStore));
        const getLinks = await screen.findAllByRole('link', { hidden: true});
        expect(getLinks.length).toBeGreaterThanOrEqual(4);
        expect(getLinks[0].toString()).toEqual('http://localhost/'); 
        expect(getLinks[1].toString()).toEqual('http://localhost/auth/login'); 
        expect(getLinks[2].toString()).toEqual('http://localhost/register'); 
        expect(getLinks[3].toString()).toEqual('http://localhost/shopping');  
        expect(screen.queryByText(/login/i).toString()).toBe('http://localhost/auth/login');
        expect(screen.queryByText(/login/i).innerHTML).toBe('Login');
        expect(mockStore.getState().products.shoppingCart.length).toBe(0);
    }); 
    it('should get all links, but user is loggedin', async () => {
        render(RenderComponent(<Header/>, mockStoreUserLoggedIn));
        const getLinks = await screen.findAllByRole('link');
        expect(getLinks.length).toBeGreaterThanOrEqual(2);
        expect(getLinks[0].toString()).toEqual('http://localhost/'); 
        expect(getLinks[1].toString()).toEqual('http://localhost/edit'); 
        expect(screen.queryByText(/welcome/i).innerHTML).toBe(`Welcome, ${mockUser.name}!`); 
        expect(mockStoreUserLoggedIn.getState().products.shoppingCart.length).toBe(1); 
    });
});
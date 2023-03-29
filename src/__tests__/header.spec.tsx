import React from 'react';
import {screen, render} from '@testing-library/react';
import Header from "../components/Header";
import {mockStore, mockStoreUserLoggedIn} from '../services/_utils';
import { RenderComponent } from '../services/_utilsComponents';

describe('Testing Header', () => {
    it('should get all links, but user is not loggedin', async () => {
        render(RenderComponent(<Header/>, mockStore));
        const getLinks = await screen.findAllByRole('link', { hidden: true});
        expect(getLinks[0].toString()).toEqual('http://localhost/'); 
        expect(getLinks[1].toString()).toEqual('http://localhost/login'); 
        expect(getLinks[2].toString()).toEqual('http://localhost/register'); 
        expect(getLinks[3].toString()).toEqual('http://localhost/shopping');  
    });
    it('should get all links, but user is loggedin', async () => {
        render(RenderComponent(<Header/>, mockStoreUserLoggedIn));
        const getLinks = await screen.findAllByRole('link', { hidden: true});
        expect(getLinks[0].toString()).toEqual('http://localhost/'); 
        expect(getLinks[1].toString()).toEqual('http://localhost/edit'); 
    });
});
import React from 'react';
import {screen, render} from '@testing-library/react';
import Input from '../components/Input';
import {
    mockStoreUserLoggedIn,
    mockProduct,
    mockUser
} from '../services/_utils';
import { RenderComponent } from '../services/_utilsComponents';

afterEach(() => {
    jest.clearAllMocks();
});

describe('Testing Input component', () => {
    it('should use input of mockUser', () => {
        render(RenderComponent(
        <Input
        data={mockUser}
        setData={jest.fn()}
        keyName={"name"}
        keyValue={mockUser.name}
        />, mockStoreUserLoggedIn));
        // Input
        expect(screen.getByLabelText('Name').getAttribute("placeholder")).toBe('Name');
    });
    it('should use input of mockProduct', () => {
        render(RenderComponent(
        <Input
        data={mockProduct}
        setData={jest.fn()}
        keyName={"name"}
        keyValue={mockProduct.name}
        />, mockStoreUserLoggedIn));
        // Input
        expect(screen.getByLabelText('Name').getAttribute("placeholder")).toBe('Name');
    });
});
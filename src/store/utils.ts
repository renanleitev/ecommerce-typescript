import { ThunkDispatch, AnyAction } from '@reduxjs/toolkit';
import * as products from './modules/products/reducer';
import * as login from './modules/login/reducer';
import * as interfaces from '../interfaces';
import { configureStore } from '@reduxjs/toolkit';

export const mockProduct: interfaces.Product = {
    id: '1',
    name: 'Celular',
    images: 'imagem',
    price: '200.56',
    quantity: 1,
    totalPrice: 200.56,
    os: 'Android',
    description: 'Teste',
    additionalFeatures: 'Qualquer'
};

export const mockUser: interfaces.User = {
    id: '1',
    name: 'Fulano',
    surname: 'Detal',
    address: 'Rua da Felicidade',
    email: 'fulanodetal@email.com',
    password: '123456'
};

export const storeProduct = configureStore({
    reducer: products.inventoryReducer,
});

export const storeLogin = configureStore({
    reducer: login.userReducer,
});

export const mockProductState = {...products.initialState, cart: [mockProduct]};

export const mockUserState = {...login.initialState, user: {...mockUser}};

type ThunkDispatchType = ThunkDispatch<unknown, unknown, AnyAction>;

export const dispatchProductEx = storeProduct.dispatch as ThunkDispatchType;

export const dispatchLoginEx = storeLogin.dispatch as ThunkDispatchType;
import { ThunkDispatch, AnyAction } from '@reduxjs/toolkit';
import * as products from '../store/modules/products/reducer';
import * as login from '../store/modules/login/reducer';
import * as interfaces from '../interfaces';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from "redux";

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

export const mockProductStateCart = {
    ...products.initialState,
    cart: [{ ...mockProduct }],
};

export const mockProductStateStock = {
    ...products.initialState,
    stock: {
        data: [{ ...mockProduct }],
        total_pages: 1,
        total_items: 1
    },
    product: { ...mockProduct },
    cart: [{ ...mockProduct }],
};

export const mockUserState = {
    ...login.initialState,
    user: { ...mockUser },
    isLoggedIn: true,
};
export const mockStore = configureStore({
    reducer: combineReducers({
        login: login.userReducer,
        products: products.inventoryReducer,
    })
});

export const mockStoreUserLoggedIn = configureStore({
    reducer: combineReducers({
        login: login.userReducer,
        products: products.inventoryReducer,
    }),
    preloadedState: {
        login: mockUserState,
        products: mockProductStateCart,
    },
});

export const mockStoreProductCart = configureStore({
    reducer: combineReducers({
        login: login.userReducer,
        products: products.inventoryReducer,
    }),
    preloadedState: {
        login: mockUserState,
        products: mockProductStateStock,
    },
});

type ThunkDispatchType = ThunkDispatch<unknown, unknown, AnyAction>;

export const dispatchProductEx = storeProduct.dispatch as ThunkDispatchType;

export const dispatchLoginEx = storeLogin.dispatch as ThunkDispatchType;
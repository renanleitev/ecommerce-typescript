import { ThunkDispatch, AnyAction } from '@reduxjs/toolkit';
import * as products from '../store/modules/products/reducer';
import * as users from '../store/modules/users/reducer';
import * as interfaces from '../interfaces';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from "redux";

export const mockProduct: interfaces.Product = {
    id: '1',
    name: 'Celular',
    image: 'imagem',
    price: '200.56',
    quantity: 1,
    totalPrice: 200.56,
    os: 'Android',
    description: 'Teste',
    additionalFeatures: 'Qualquer'
};

export const mockUser: interfaces.User = {
    id: '1',
    username: 'fulanodetal',
    name: 'Fulano',
    surname: 'Silva',
    address: 'Rua da Felicidade',
    email: 'fulanosilva@email.com',
    password: '123456',
    role: 'ROLE_USER'
};

export const storeProduct = configureStore({
    reducer: products.productsReducer,
});

export const storeLogin = configureStore({
    reducer: users.usersReducer,
});

export const mockProductStateCart = {
    ...products.initialState,
    shoppingCart: [{ ...mockProduct }],
};

export const mockProductStateStock = {
    ...products.initialState,
    stock: {
        data: [{ ...mockProduct }],
        total_pages: 1,
        total_items: 1
    },
    product: { ...mockProduct },
    shoppingCart: [{ ...mockProduct }],
};

export const mockUserState = {
    ...users.initialState,
    user: { ...mockUser },
    isLoggedIn: true,
};
export const mockStore = configureStore({
    reducer: combineReducers({
        users: users.usersReducer,
        products: products.productsReducer,
    })
});

export const mockStoreUserLoggedIn = configureStore({
    reducer: combineReducers({
        users: users.usersReducer,
        products: products.productsReducer,
    }),
    preloadedState: {
        users: mockUserState,
        products: mockProductStateCart,
    },
});

export const mockStoreProductCart = configureStore({
    reducer: combineReducers({
        users: users.usersReducer,
        products: products.productsReducer,
    }),
    preloadedState: {
        users: mockUserState,
        products: mockProductStateStock,
    },
});

type ThunkDispatchType = ThunkDispatch<unknown, unknown, AnyAction>;

export const dispatchProductEx = storeProduct.dispatch as ThunkDispatchType;

export const dispatchLoginEx = storeLogin.dispatch as ThunkDispatchType;
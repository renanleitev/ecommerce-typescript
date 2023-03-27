import { ThunkDispatch, AnyAction } from '@reduxjs/toolkit';
import { initialState } from './modules/products/reducer';
import * as interfaces from '../interfaces';
import { configureStore } from '@reduxjs/toolkit';
import { inventoryReducer } from './modules/products/reducer';

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

export const store = configureStore({
    reducer: inventoryReducer,
});

export const mockState = {...initialState, cart: [mockProduct]};

type ThunkDispatchType = ThunkDispatch<unknown, unknown, AnyAction>;

export const dispatchEx = store.dispatch as ThunkDispatchType;
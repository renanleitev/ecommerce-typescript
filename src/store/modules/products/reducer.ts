import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as interfaces from '../../../interfaces';

interface InitialState {
    stock: {
        data: Array<object>,
    },
    product: {
        id: string,
        name: string,
        images: string,
        price: number,
        quantity: number,
        totalPrice: number,
        os: string,
        display: {
            screenResolution: string,
            screenSize: string,
        },
        storage: {
            hdd: string,
            ram: string,
        },
        hardware: {
            cpu: string,
        },
        connectivity: {
            wifi: string,
        },
        description: string,
    },
    cart: [{}],
}

const initialState: (InitialState) = {
    stock: {
        data: [{}],
    },
    product: {
            id: '',
            name: '',
            images: '',
            price: 0,
            quantity: 0,
            totalPrice: 0,
            os: '',
            display: {
                screenResolution: '',
                screenSize: '',
            },
            storage: {
                hdd: '',
                ram: '',
            },
            hardware: {
                cpu: '',
            },
            connectivity: {
                wifi: '',
            },
            description: '',
    },
    cart: [{}],
};
export const inventorySlice = createSlice({
    name: 'inventory',
    initialState: initialState,
    reducers: {
        findStock: (state, action: PayloadAction<interfaces.Stock>) => {
            // Para zerar o estado no first load
            // state.cart = initialState.cart;
            state.stock.data = action.payload.data;
        },
        findProduct: (state, action: PayloadAction<interfaces.Product>) => {
            state.product = {...action.payload};
        },
        addItem: (state, action: PayloadAction<interfaces.Product>) => {
            state.cart.push({...action.payload});
        },
        changeQuantity: (state, action: PayloadAction<interfaces.Product>) => {
            state.cart.forEach((item: any) =>{
                if (item.id === action.payload.id) {
                    item.quantity = action.payload.quantity;
                    item.totalPrice = action.payload.totalPrice;
                }
            });
        },
        removeItem: (state, action: PayloadAction<number>) => {
            state.cart.splice(action.payload, 1); 
        },
    }
})

export const { 
    findStock, 
    findProduct, 
    addItem,
    changeQuantity,
    removeItem,
} = inventorySlice.actions;

export const inventoryReducer = inventorySlice.reducer;
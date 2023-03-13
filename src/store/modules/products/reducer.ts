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
        price: string,
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
    cart: Array<object>,
}

const initialState: (InitialState) = {
    stock: {
        data: [{}],
    },
    product: {
            id: '',
            name: '',
            images: '',
            price: '',
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
    cart: [],
};
export const inventorySlice = createSlice({
    name: 'inventory',
    initialState: initialState,
    reducers: {
        findStock: (state, action: PayloadAction<interfaces.Stock>) => {
            state.stock.data = action.payload.data;
        },
        findProduct: (state, action: PayloadAction<interfaces.Product>) => {
            state.product = {...action.payload};
        },
        addItem: (state, action: PayloadAction<interfaces.Product>) => {            
            state.cart.push({...action.payload});
        },
        changeQuantity: (state, action: PayloadAction<interfaces.Product>) => {
            state.cart.forEach((item: interfaces.Product) =>{
                if (item.id === action.payload.id) {
                    item.quantity = action.payload.quantity;
                    item.totalPrice = action.payload.totalPrice;
                }
            });
        },
        removeItem: (state, action: PayloadAction<interfaces.Product>) => {
            state.cart.forEach((item: interfaces.Product, index: number) => {
                if (item.id === action.payload.id) state.cart.splice(index, 1);
            })
        },
        editItem: (state, action: PayloadAction<interfaces.Product>) => {
            state.product = {...action.payload};
        },
        removeCart: (state) => {
            state.cart = initialState.cart;
        }
    }
})

export const { 
    findStock, 
    findProduct, 
    addItem,
    changeQuantity,
    removeItem,
    removeCart,
    editItem,
} = inventorySlice.actions;

export const inventoryReducer = inventorySlice.reducer;
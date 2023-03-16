import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import * as interfaces from '../../../interfaces';
import { toast } from 'react-toastify';
import axios from '../../../services/axios';

interface InitialState {
    stock: {
        data: Array<object>,
    },
    product: (interfaces.Product),
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
            description: '',
            additionalFeatures: '',
    },
    cart: [],
};

export const showStock = createAsyncThunk(
    'inventory/showStock',
    async () => {
        const stock = await axios.get('/products/');
        return stock;
});

export const showProduct = createAsyncThunk(
    'inventory/showProduct',
    async (id: string) => {
        const product = await axios.get(`/products/${id}`);
        return product.data;
});

export const editProduct = createAsyncThunk(
    'inventory/editProduct', 
    async (product: interfaces.Product) => {
        await axios.put(`/products/${product.id}`, product);
        toast.success('Edit product successfully.');
        return product;
});

export const inventorySlice = createSlice({
    name: 'inventory',
    initialState: initialState,
    reducers: {
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
        removeCart: (state) => {
            state.cart = initialState.cart;
        }
    },
    extraReducers(builder){
        builder
            .addCase(
                editProduct.fulfilled, 
                (state, action: PayloadAction<interfaces.Product>) => {
                    state.product = {...action.payload};
            })
            .addCase(
                showProduct.fulfilled,
                (state,  action: PayloadAction<interfaces.Product>) => {
                    state.product = {...action.payload};
            })
            .addCase(
                showStock.fulfilled,
                (state, action: PayloadAction<interfaces.Stock>) => {
                    state.stock.data = action.payload.data;
                }
            )
    }
})

export const { 
    addItem,
    changeQuantity,
    removeItem,
    removeCart,
} = inventorySlice.actions;

export const inventoryReducer = inventorySlice.reducer;
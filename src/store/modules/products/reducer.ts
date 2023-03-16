import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import * as interfaces from '../../../interfaces';
import { toast } from 'react-toastify';
import axios from '../../../services/axios';

interface InitialState {
    status: string,
    error: string,
    stock: {
        data: Array<object>,
    },
    product: (interfaces.Product),
    cart: Array<object>,
}

const initialState: (InitialState) = {
    status: 'idle',
    error: '',
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
        try{
            const stock = await axios.get('/products/');
            return stock;
        }
        catch(error){ return error.message; }
});

export const showProduct = createAsyncThunk(
    'inventory/showProduct',
    async (id: string) => {
        try{
            const product = await axios.get(`/products/${id}`);
            return product.data;
        }
        catch(error){ return error.message; }
});

export const editProduct = createAsyncThunk(
    'inventory/editProduct', 
    async (product: interfaces.Product) => {
        try{
            await axios.put(`/products/${product.id}`, product);
            toast.success('Edit product successfully.');
            return product;
        }
        catch(error){ return error.message; }
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
            // editProduct asyncThunk
            .addCase(
                editProduct.fulfilled, 
                (state, action: PayloadAction<interfaces.Product>) => {
                    state.product = {...action.payload};
            })
            .addCase(editProduct.pending, (state) => {state.status = 'loading';})
            .addCase(editProduct.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            // showProduct asyncThunk
            .addCase(
                showProduct.fulfilled,
                (state,  action: PayloadAction<interfaces.Product>) => {
                    state.product = {...action.payload};
                    state.status = 'succeeded';
            })
            .addCase(showProduct.pending, (state) => {state.status = 'loading';})
            .addCase(showProduct.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            // showStock asyncThunk
            .addCase(
                showStock.fulfilled,
                (state, action: PayloadAction<interfaces.Stock>) => {
                    state.stock.data = action.payload.data;
                }
            )
            .addCase(showStock.pending, (state) => {state.status = 'loading';})
            .addCase(showStock.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})

export const { 
    addItem,
    changeQuantity,
    removeItem,
    removeCart,
} = inventorySlice.actions;

export const inventoryReducer = inventorySlice.reducer;
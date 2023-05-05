import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import * as interfaces from '../../../interfaces';
import { toast } from 'react-toastify';
import axios from '../../../services/axios';
import { InitialStateProduct, Product } from '../../../interfaces';

export const initialProduct: Product = {
    id: '',
    name: '',
    images: '',
    price: '',
    quantity: 0,
    totalPrice: 0,
    os: '',
    description: '',
    additionalFeatures: '',
}

export const initialState: InitialStateProduct = {
    status: 'idle',
    error: '',
    stock: {
        data: [{...initialProduct}],
    },
    stockPerPage: {
        data: [{...initialProduct}],
    },
    pageStatus: {
        currentPage: 1,
        productsPerPage: 3
    },
    product: initialProduct,
    cart: [],
};

export const showStock = createAsyncThunk(
    'inventory/showStock',
    async () => {
        try{
            const url = '/products/';
            const stock = await axios.get(url);
            return stock;
        }
        catch(error){ return error.message; }
});

export const showStockPerPage = createAsyncThunk(
    'inventory/showStockPerPage',
    async (pageStatus: interfaces.PageNumberStatus) => {
        try{
            const url = `/products?_page=${pageStatus.currentPage}&_limit=${pageStatus.productsPerPage}`;
            const stockPerPage = await axios.get(url);
            return stockPerPage;
        }
        catch(error){ return error.message; }
});

export const showProduct = createAsyncThunk(
    'inventory/showProduct',
    async (id: string) => {
        try{
            const url = `/products/${id}`;
            const product = await axios.get(url);
            return product.data;
        }
        catch(error){ return error.message; }
});

export const editProduct = createAsyncThunk(
    'inventory/editProduct', 
    async (product: interfaces.Product) => {
        try{
            const url = `/products/${product.id}`;
            await axios.put(url, product);
            toast.success('Edit product successfully.');
            return product;
        }
        catch(error){ return error.message; }
});

export const inventorySlice = createSlice({
    name: 'inventory',
    initialState: initialState,
    reducers: {
        addProductCart: (state, action: PayloadAction<interfaces.Product>) => {            
            state.cart.push({...action.payload});
        },
        changeProductQuantityCart: (state, action: PayloadAction<interfaces.Product>) => {
            state.cart.forEach((product: interfaces.Product) =>{
                if (product.id === action.payload.id) {
                    product.quantity = action.payload.quantity;
                    product.totalPrice = action.payload.totalPrice;
                }
            });
        },
        removeProductCart: (state, action: PayloadAction<interfaces.Product>) => {
            state.cart.forEach((product: interfaces.Product, index: number) => {
                if (product.id === action.payload.id) state.cart.splice(index, 1);
            })
        },
        removeAllProductsCart: (state) => {
            state.cart = initialState.cart;
        },
        resetPageStatus: (state) => {
            state.pageStatus = initialState.pageStatus;
        },
        changePageStatus: (state, action: PayloadAction<interfaces.PageNumberStatus>) => {
            state.pageStatus = action.payload
        }
    },
    extraReducers(builder){
        builder
            // editProduct asyncThunk
            .addCase(
                editProduct.fulfilled, 
                (state, action: PayloadAction<interfaces.Product>) => {
                    state.status = 'succeeded';
                    state.product = {...action.payload};
            })
            .addCase(editProduct.pending, (state) => {state.status = 'loading';})
            .addCase(editProduct.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || "Something went wrong";
            })
            // showProduct asyncThunk
            .addCase(
                showProduct.fulfilled,
                (state,  action: PayloadAction<interfaces.Product>) => {
                    state.status = 'succeeded';
                    state.product = {...action.payload};
            })
            .addCase(showProduct.pending, (state) => {state.status = 'loading';})
            .addCase(showProduct.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || "Something went wrong";
            })
            // showStock asyncThunk
            .addCase(
                showStock.fulfilled,
                (state, action: PayloadAction<interfaces.StockData>) => {
                    state.status = 'succeeded';
                    state.stock = action.payload;
                }
            )
            .addCase(showStock.pending, (state) => {state.status = 'loading';})
            .addCase(showStock.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || "Something went wrong";
            })
            // showStockPerPage asyncThunk
            .addCase(
                showStockPerPage.fulfilled,
                (state, action: PayloadAction<interfaces.StockData>) => {
                    state.status = 'succeeded';
                    state.stockPerPage = action.payload;
                }    
            )
            .addCase(showStockPerPage.pending, (state) => {state.status = 'loading';})
            .addCase(showStockPerPage.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || "Something went wrong";
            })
    }
})

export const { 
    addProductCart,
    changeProductQuantityCart,
    removeProductCart,
    removeAllProductsCart,
    resetPageStatus,
    changePageStatus,
} = inventorySlice.actions;

export const inventoryReducer = inventorySlice.reducer;
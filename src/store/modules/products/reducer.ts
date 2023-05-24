import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import * as interfaces from '../../../interfaces';
import { toast } from 'react-toastify';
import {axiosInstance, getAuthorizationHeader} from '../../../services/axios';
import { InitialStateProduct, Product } from '../../../interfaces';

export const initialProduct: Product = {
    id: '',
    name: '',
    image: '',
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
    stockPerPage: {
        data: [{ ...initialProduct }],
        total_pages: 1,
        total_items: 1
    },
    pageStatus: {
        currentPage: 1,
        productsPerPage: 3
    },
    product: initialProduct,
    cart: [],
    shoppingList: []
};

export const showStockPerPage = createAsyncThunk(
    'inventory/showStockPerPage',
    async (pageStatus: interfaces.PageNumberStatus) => {
        try {
            const url = `/products/pagination?_page=${pageStatus.currentPage}&_limit=${pageStatus.productsPerPage}`;
            const response = await axiosInstance.get(url, {
                headers: { Authorization: getAuthorizationHeader() }
            });
            return {
                data: response.data,
                total_pages: Number(response.headers['x-total-pages']),
                total_items: Number(response.headers['x-total-count'])
            };
        }
        catch (error) { return error.message; }
    });

export const showProduct = createAsyncThunk(
    'inventory/showProduct',
    async (id: string) => {
        try {
            const url = `/products/${id}`;
            const response = await axiosInstance.get(url, {
                headers: { Authorization: getAuthorizationHeader() }
            });
            return response.data;
        }
        catch (error) { return error.message; }
    });

export const editProduct = createAsyncThunk(
    'inventory/editProduct',
    async (product: interfaces.Product) => {
        try {
            const url = `/products/${product.id}`;
            await axiosInstance.put(url, product, {
                headers: { Authorization: getAuthorizationHeader() }
            });
            toast.success('Edit product successfully.');
            return product;
        }
        catch (error) { return error.message; }
    });

export const showShoppings = createAsyncThunk(
    'inventory/showShoppings',
    async (id: string) => {
        try {
            const url = `/shoppings/${id}`;
            const response = await axiosInstance.get(url, {
                headers: { Authorization: getAuthorizationHeader() }
            });
            return response.data;
        }
        catch (error) { return error.message; }
    });

export const saveShoppings = createAsyncThunk(
    'inventory/saveShoppings',
    async (shoppingCart: Array<interfaces.ShoppingCart>) => {
        try {
            const url = '/shoppings';
            await axiosInstance.post(url, shoppingCart, {
                headers: { Authorization: getAuthorizationHeader() }
            });
            return shoppingCart;
        }
        catch (error) { return error.message; }
    }
);

export const inventorySlice = createSlice({
    name: 'inventory',
    initialState: initialState,
    reducers: {
        addProductCart: (state, action: PayloadAction<interfaces.Product>) => {
            state.cart.push({ ...action.payload });
        },
        changeProductQuantityCart: (state, action: PayloadAction<interfaces.Product>) => {
            state.cart.forEach((product: interfaces.Product) => {
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
        },
        resetShoppingList: (state) => {
            state.shoppingList = initialState.shoppingList;
        },
    },
    extraReducers(builder) {
        builder
            // showShoppings asyncThunk
            .addCase(showShoppings.fulfilled, (state, action: PayloadAction<Array<interfaces.ShoppingList>>) => {
                state.status = 'succeeded';
                state.shoppingList = action.payload;
            })
            .addCase(showShoppings.pending, (state) => { state.status = 'loading'; })
            .addCase(showShoppings.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || "Something went wrong";
            })
            // saveShoppings asyncThunk
            .addCase(
                saveShoppings.fulfilled,
                (state) => {
                    state.status = 'succeeded';
                    state.cart = initialState.cart;
                })
            .addCase(saveShoppings.pending, (state) => { state.status = 'loading'; })
            .addCase(saveShoppings.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || "Something went wrong";
            })
            // editProduct asyncThunk
            .addCase(
                editProduct.fulfilled,
                (state, action: PayloadAction<interfaces.Product>) => {
                    state.status = 'succeeded';
                    state.product = { ...action.payload };
                })
            .addCase(editProduct.pending, (state) => { state.status = 'loading'; })
            .addCase(editProduct.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || "Something went wrong";
            })
            // showProduct asyncThunk
            .addCase(
                showProduct.fulfilled,
                (state, action: PayloadAction<interfaces.Product>) => {
                    state.status = 'succeeded';
                    state.product = { ...action.payload };
                })
            .addCase(showProduct.pending, (state) => { state.status = 'loading'; })
            .addCase(showProduct.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || "Something went wrong";
            })
            .addCase(
                showStockPerPage.fulfilled,
                (state, action: PayloadAction<interfaces.StockData>) => {
                    state.status = 'succeeded';
                    state.stockPerPage = action.payload;
                }
            )
            .addCase(showStockPerPage.pending, (state) => { state.status = 'loading'; })
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
    resetShoppingList,
} = inventorySlice.actions;

export const inventoryReducer = inventorySlice.reducer;
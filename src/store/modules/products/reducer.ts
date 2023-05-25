import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import * as interfaces from '../../../interfaces';
import { toast } from 'react-toastify';
import {axiosInstance, getAuthorizationHeader} from '../../../services/axios';

export const initialProduct: interfaces.Product = {
    id: '',
    name: '',
    image: '',
    price: '',
    quantity: 0,
    totalPrice: 0,
    os: '',
    description: '',
    additionalFeatures: '',
};

export const initialState: interfaces.InitialStateProduct = {
    status: 'idle',
    error: '',
    productsPerPage: {
        data: [{ ...initialProduct }],
        total_pages: 1,
        total_items: 1
    },
    pageStatus: {
        currentPage: 1,
        itemsPerPage: 3
    },
    product: initialProduct,
    shoppingCart: [],
    shoppingList: []
};

export const showProductsPerPage = createAsyncThunk(
    'products/showProductsPerPage',
    async (pageStatus: interfaces.PageNumberStatus) => {
        try {
            const url = `/products/pagination?_page=${pageStatus.currentPage}&_limit=${pageStatus.itemsPerPage}`;
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
    'products/showProduct',
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
    'products/editProduct',
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

export const createProduct = createAsyncThunk(
    'products/createProduct',
    async (product: interfaces.Product) => {
        try{
            const url = '/products';
            await axiosInstance.post(url, product, {
                headers: { Authorization: getAuthorizationHeader() }
            });
            toast.success('Create product successfully.');
            return product;
        }
        catch (error) { return error.message; }
    }
)

export const showShoppings = createAsyncThunk(
    'products/showShoppings',
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
    'products/saveShoppings',
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
    name: 'products',
    initialState: initialState,
    reducers: {
        addProductCart: (state, action: PayloadAction<interfaces.Product>) => {
            state.shoppingCart.push({ ...action.payload });
        },
        changeProductQuantityCart: (state, action: PayloadAction<interfaces.Product>) => {
            state.shoppingCart.forEach((product: interfaces.Product) => {
                if (product.id === action.payload.id) {
                    product.quantity = action.payload.quantity;
                    product.totalPrice = action.payload.totalPrice;
                }
            });
        },
        removeProductCart: (state, action: PayloadAction<interfaces.Product>) => {
            state.shoppingCart.forEach((product: interfaces.Product, index: number) => {
                if (product.id === action.payload.id) state.shoppingCart.splice(index, 1);
            })
        },
        removeAllProductsCart: (state) => {
            state.shoppingCart = initialState.shoppingCart;
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
                    state.shoppingCart = initialState.shoppingCart;
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
            // createProduct asyncThunk
            .addCase(
                createProduct.fulfilled,
                (state, action: PayloadAction<interfaces.Product>) => {
                    state.status = 'succeeded';
                    state.product = { ...action.payload };
                })
            .addCase(createProduct.pending, (state) => { state.status = 'loading'; })
            .addCase(createProduct.rejected, (state, action) => {
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
            // showProductsPerPage asyncThunk
            .addCase(
                showProductsPerPage.fulfilled,
                (state, action: PayloadAction<interfaces.ProductData>) => {
                    state.status = 'succeeded';
                    state.productsPerPage = action.payload;
                }
            )
            .addCase(showProductsPerPage.pending, (state) => { state.status = 'loading'; })
            .addCase(showProductsPerPage.rejected, (state, action) => {
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
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import * as interfaces from '../../../interfaces';
import { toast } from 'react-toastify';
import {axiosInstance, getAuthorizationHeader} from '../../../services/axios';
import history from '../../../services/history';

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
    shoppingList: {
        data: [],
        total_pages: 1,
        total_items: 1
    }
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
    async (pageStatus: interfaces.PageNumberStatus) => {
        try {
            const url = `/shoppings/${pageStatus.id}?_page=${pageStatus.currentPage}&_limit=${pageStatus.itemsPerPage}`;
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

export const saveShoppings = createAsyncThunk(
    'products/saveShoppings',
    async (shoppingCart: Array<interfaces.ShoppingCart>) => {
        try {
            const url = '/shoppings';
            await axiosInstance.post(url, shoppingCart, {
                headers: { Authorization: getAuthorizationHeader() }
            });
            toast.success('Purchase products successfully.');
            history.push('/');
            return shoppingCart;
        }
        catch (error) { return error.message; }
    }
);

export const searchProductByName = createAsyncThunk(
    'products/searchProductByName',
    async (pageStatus: interfaces.PageNumberStatus) => {
        try {
            const url = `/products?_name=${pageStatus.searching}&_page=${pageStatus.currentPage}&_limit=${pageStatus.itemsPerPage}`;
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

export const searchProductByOs = createAsyncThunk(
    'products/searchProductByOs',
    async (pageStatus: interfaces.PageNumberStatus) => {
        try {
            const url = `/products?_os=${pageStatus.searching}&_page=${pageStatus.currentPage}&_limit=${pageStatus.itemsPerPage}`;
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

export const searchProductByDescription = createAsyncThunk(
    'products/searchProductByDescription',
    async (pageStatus: interfaces.PageNumberStatus) => {
        try {
            const url = `/products?_description=${pageStatus.searching}&_page=${pageStatus.currentPage}&_limit=${pageStatus.itemsPerPage}`;
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

export const searchProductByAdditionalFeatures = createAsyncThunk(
    'products/searchProductByAdditionalFeatures',
    async (pageStatus: interfaces.PageNumberStatus) => {
        try {
            const url = `/products?_additionalFeatures=${pageStatus.searching}&_page=${pageStatus.currentPage}&_limit=${pageStatus.itemsPerPage}`;
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

export const searchProductByPrice = createAsyncThunk(
    'products/searchProductByPrice',
    async (pageStatus: interfaces.PageNumberStatus) => {
        try {
            const url = `/products?_price=${pageStatus.price}&_operator=${pageStatus.operator}&_page=${pageStatus.currentPage}&_limit=${pageStatus.itemsPerPage}`;
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
            state.pageStatus = action.payload;
        },
        resetShoppingList: (state) => {
            state.shoppingList = initialState.shoppingList;
        },
    },
    extraReducers(builder) {
        builder
            // searchProductByPrice asyncThunk
            .addCase(searchProductByPrice.fulfilled, (state, action: PayloadAction<interfaces.ProductData>) => {
                state.status = 'succeeded';
                state.productsPerPage = action.payload;
            })
            .addCase(searchProductByPrice.pending, (state) => { state.status = 'loading'; })
            .addCase(searchProductByPrice.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || "Something went wrong";
            })
            // searchProductByAdditionalFeatures asyncThunk
            .addCase(searchProductByAdditionalFeatures.fulfilled, (state, action: PayloadAction<interfaces.ProductData>) => {
                state.status = 'succeeded';
                state.productsPerPage = action.payload;
            })
            .addCase(searchProductByAdditionalFeatures.pending, (state) => { state.status = 'loading'; })
            .addCase(searchProductByAdditionalFeatures.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || "Something went wrong";
            })
            // searchProductByOs asyncThunk
            .addCase(searchProductByOs.fulfilled, (state, action: PayloadAction<interfaces.ProductData>) => {
                state.status = 'succeeded';
                state.productsPerPage = action.payload;
            })
            .addCase(searchProductByOs.pending, (state) => { state.status = 'loading'; })
            .addCase(searchProductByOs.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || "Something went wrong";
            })
            // searchProductByDescription asyncThunk
            .addCase(searchProductByDescription.fulfilled, (state, action: PayloadAction<interfaces.ProductData>) => {
                state.status = 'succeeded';
                state.productsPerPage = action.payload;
            })
            .addCase(searchProductByDescription.pending, (state) => { state.status = 'loading'; })
            .addCase(searchProductByDescription.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || "Something went wrong";
            })
            // searchProductByName asyncThunk
            .addCase(searchProductByName.fulfilled, (state, action: PayloadAction<interfaces.ProductData>) => {
                state.status = 'succeeded';
                state.productsPerPage = action.payload;
            })
            .addCase(searchProductByName.pending, (state) => { state.status = 'loading'; })
            .addCase(searchProductByName.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || "Something went wrong";
            })
            // showShoppings asyncThunk
            .addCase(showShoppings.fulfilled, (state, action: PayloadAction<interfaces.ShoppingListData>) => {
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
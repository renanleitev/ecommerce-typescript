import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
    isLoggedIn: boolean,
    user: {
        id: number,
        name: string,
        surname: string,
        address: string,
        email: string,
        password: string,
    },
}

interface User {
    id: 0,
    name: '',
    surname: '',
    address: '',
    email: '',
    password: '',
}

const initialState: (InitialState) = {
    isLoggedIn: false,
    user: {
        id: 0,
        name: '',
        surname: '',
        address: '',
        email: '',
        password: '',
    },
};

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<User>) => {
            state.isLoggedIn = !state.isLoggedIn;
            state.user = action.payload;
        },
        editSuccess: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
        registerSuccess: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
        deleteSuccess: (state, action: PayloadAction<User>) => {
            state.isLoggedIn = !state.isLoggedIn;
            state.user = action.payload;
        },
    }
})

export const { 
    loginSuccess, 
    editSuccess, 
    registerSuccess,
    deleteSuccess,
} = userSlice.actions;

export const userReducer = userSlice.reducer;
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as interfaces from '../../../interfaces';

interface InitialState {
    isLoggedIn: boolean,
    user: (interfaces.User),
}

const initialState: (InitialState) = {
    isLoggedIn: false,
    user: {
        id: '',
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
        loginSuccess: (state, action: PayloadAction<interfaces.User>) => {
            state.isLoggedIn = !state.isLoggedIn;
            state.user = action.payload;
        },
        editSuccess: (state, action: PayloadAction<interfaces.User>) => {
            state.user = action.payload;
        },
        registerSuccess: (state, action: PayloadAction<interfaces.User>) => {
            state.isLoggedIn = !state.isLoggedIn;
            state.user = action.payload;
        },
        deleteSuccess: (state) => {
            state.isLoggedIn = !state.isLoggedIn;
            state.user = initialState.user;
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
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import * as interfaces from '../../../interfaces';
import { toast } from 'react-toastify';
import axios from '../../../services/axios';
import history from '../../../services/history';
import { InitialStateLogin } from '../../../interfaces';

export const initialState: (InitialStateLogin) = {
    isLoggedIn: false,
    status: 'idle',
    error: '',
    user: {
        id: '',
        username: '',
        name: '',
        surname: '',
        address: '',
        email: '',
        password: '',
        role: ''
    },
};

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (userLogin: interfaces.User) => {
        const response = await axios.post('/auth/login', userLogin);
        if (response.status === 200) {
            toast.success('Login successfully.');
            history.push('/');
            const userLoggedIn = { ...response.data };
            const token = String(response.headers['authorization']);           
            localStorage.setItem('token', token);
            return userLoggedIn;
        }
        return initialState.user;
    });

export const registerUser = createAsyncThunk(
    'user/registerUser',
    async (user: interfaces.User) => {
        const response = await axios.post('/auth/register', user);
        const userId = Number(response.headers['Id']);
        toast.success('Register user successfully.');
        history.push('/');
        return {id: userId, ...user};
    }
);

export const editUser = createAsyncThunk(
    'user/editUser',
    async (user: interfaces.User) => {
        await axios.put('/auth/edit', user);
        toast.success('Edit user successfully.');
        history.push('/');
        return user;
    }
);

export const deleteUser = createAsyncThunk(
    'user/deleteUser',
    async (user: interfaces.User) => {
        if (user.id !== undefined) {
            await axios.delete(`/users/${user.id}`);
            toast.success('Delete successful!');
            history.push('/');
        }
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        logoutSuccess: (state) => {
            state.isLoggedIn = false;
            state.user = initialState.user;
            localStorage.removeItem('token');
        },
    },
    extraReducers(builder) {
        builder
            // registerUser asyncThunk
            .addCase(
                registerUser.fulfilled,
                (state, action: PayloadAction<interfaces.User>) => {
                    state.status = 'succeeded';
                    state.isLoggedIn = true;
                    state.user = action.payload;
                })
            .addCase(registerUser.pending, (state) => { state.status = 'loading'; })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || "Something went wrong";
            })
            // editUser asyncThunk
            .addCase(
                editUser.fulfilled,
                (state, action: PayloadAction<interfaces.User>) => {
                    state.status = 'succeeded';
                    state.user = action.payload;
                })
            .addCase(editUser.pending, (state) => { state.status = 'loading'; })
            .addCase(editUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || "Something went wrong";
            })
            // deleteUser asyncThunk 
            .addCase(
                deleteUser.fulfilled,
                (state) => {
                    state.status = 'succeeded';
                    state.isLoggedIn = false;
                    state.user = initialState.user;
                })
            .addCase(deleteUser.pending, (state) => { state.status = 'loading'; })
            .addCase(deleteUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || "Something went wrong";
            })
            // loginUser asyncThunk
            .addCase(
                loginUser.fulfilled,
                (state, action: PayloadAction<interfaces.User>) => {
                    if (action.payload.name !== '') {
                        state.isLoggedIn = true;
                        state.user = action.payload;
                    } else {
                        toast.error('Email/password invalid.');
                    }
                })
            .addCase(loginUser.pending, (state) => { state.status = 'loading'; })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || "Something went wrong";
            })
    }
})

export const {
    logoutSuccess,
} = userSlice.actions;

export const userReducer = userSlice.reducer;
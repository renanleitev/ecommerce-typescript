import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import * as interfaces from '../../../interfaces';
import { toast } from 'react-toastify';
import axios from '../../../services/axios';
import history from '../../../services/history';

interface InitialState {
    isLoggedIn: boolean,
    status: string,
    error: string,
    user: (interfaces.User),
}

const initialState: (InitialState) = {
    isLoggedIn: false,
    status: 'idle',
    error: '',
    user: {
        id: '',
        name: '',
        surname: '',
        address: '',
        email: '',
        password: '',
    },
};

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async(userLogin: interfaces.User) => {
        const users: interfaces.ResponseGenerator = await axios.get('/users');
        users.data.forEach((user: interfaces.User) => {
            if ((userLogin.email === user.email) && (userLogin.password === user.password)){
                userLogin.id = user.id;
                userLogin.name = user.name;
                userLogin.surname = user.surname;
                userLogin.email = user.email;
                userLogin.address = user.address;
                userLogin.password = user.password;
                toast.success('Loggin successfully.');
                history.push('/');
            }
        });
        return userLogin;
    }
);

export const registerUser = createAsyncThunk(
    'user/registerUser',
    async (user: interfaces.User) => {
        await axios.post('/users', user);
        toast.success('Register user successfully.');
        history.push('/');
        return user;
    }
);

export const editUser = createAsyncThunk(
    'user/editUser',
    async (user: interfaces.User) => {
        await axios.put(`/users/${user.id}`, user);
        toast.success('Edit user successfully.');
        history.push('/');
        return user;
    }
);

export const deleteUser = createAsyncThunk(
    'user/deleteUser',
    async (user: interfaces.User) => {
        if (user.id !== undefined){
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
            state.isLoggedIn = !state.isLoggedIn;
            state.user = initialState.user;
        },
    },
    extraReducers(builder){
        builder
            // registerUser asyncThunk
            .addCase(
                registerUser.fulfilled,
                (state, action: PayloadAction<interfaces.User>) => {
                    state.status = 'succeeded';
                    state.isLoggedIn = !state.isLoggedIn;
                    state.user = action.payload;
            })
            .addCase(registerUser.pending, (state) => {state.status = 'loading';})
            .addCase(registerUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            // editUser asyncThunk
            .addCase(
                editUser.fulfilled,
                (state, action: PayloadAction<interfaces.User>) => {
                    state.status = 'succeeded';
                    state.user = action.payload;
            })
            .addCase(editUser.pending, (state) => {state.status = 'loading';})
            .addCase(editUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            // deleteUser asyncThunk 
            .addCase(
                deleteUser.fulfilled,
                (state) => {
                    state.status = 'succeeded';
                    state.isLoggedIn = !state.isLoggedIn;
                    state.user = initialState.user;
            })
            .addCase(deleteUser.pending, (state) => {state.status = 'loading';})
            .addCase(deleteUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            // loginUser asyncThunk
            .addCase(
                loginUser.fulfilled,
                (state, action: PayloadAction<interfaces.User>) => {
                    state.isLoggedIn = !state.isLoggedIn;
                    state.user = action.payload;
            })
            .addCase(loginUser.pending, (state) => {state.status = 'loading';})
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})

export const { 
    logoutSuccess,
} = userSlice.actions;

export const userReducer = userSlice.reducer;
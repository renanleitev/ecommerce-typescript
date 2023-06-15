import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import * as interfaces from '../../../interfaces';
import { toast } from 'react-toastify';
import {axiosInstance, getAuthorizationHeader} from '../../../services/axios';
import history from '../../../services/history';

export const initialUser: (interfaces.User) = {
    id: '',
    username: '',
    name: '',
    surname: '',
    address: '',
    email: '',
    password: '',
    role: ''
};

export const initialState: (interfaces.InitialStateLogin) = {
    isLoggedIn: false,
    status: 'idle',
    error: '',
    user: initialUser,
    usersPerPage: {
        data: [{ ...initialUser }],
        total_pages: 1,
        total_items: 1
    },
    pageStatus: {
        currentPage: 1,
        itemsPerPage: 3
    },
};

export const loginUser = createAsyncThunk(
    'login/loginUser',
    async (userLogin: interfaces.User) => {
        try {
            const url = '/auth/login';
            const response = await axiosInstance.post(url, userLogin, {
                headers: { Authorization: getAuthorizationHeader() }
            });
            if (response.status === 200) {
                toast.success('Login successfully.');
                history.push('/');
                const userLoggedIn = { ...response.data };
                const token = String(response.headers['authorization']);           
                localStorage.setItem('token', token);
                return userLoggedIn;
            }
            return initialState.user;
        }
        catch (error) { return error.message; }
    }
);

export const registerUser = createAsyncThunk(
    'login/registerUser',
    async (user: interfaces.User) => {
        try {
            const url = '/auth/register';
            const response = await axiosInstance.post(url, user, {
                headers: { Authorization: getAuthorizationHeader() }
            });
            const userId = Number(response.headers['Id']);
            toast.success('Register user successfully.');
            history.push('/');
            return {id: userId, ...user};
        }
        catch (error) { return error.message; }
    }
);

export const editUser = createAsyncThunk(
    'login/editUser',
    async (user: interfaces.User) => {
        try {
            const url = '/auth/edit';
            await axiosInstance.put(url, user, {
                headers: { Authorization: getAuthorizationHeader() }
            });
            toast.success('Edit user successfully.');
            return user;
        }
        catch (error) { return error.message; }
    }
);

export const showUsers = createAsyncThunk(
    'login/showUsers',
    async () => {
        try {
            const url = '/users';
            const users = await axiosInstance.get(url, {
                headers: { Authorization: getAuthorizationHeader() }
            });
            return users;
        }
        catch (error) { return error.message; }
    }
);

export const showUsersPerPage = createAsyncThunk(
    'login/showUsersPerPage',
    async (pageStatus: interfaces.PageNumberStatus) => {
        try {
            const url = `/users/pagination?_page=${pageStatus.currentPage}&_limit=${pageStatus.itemsPerPage}`;
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
    }
);

export const deleteUser = createAsyncThunk(
    'login/deleteUser',
    async (user: interfaces.User) => {
        try {
            if (user.id !== undefined) {
                const url = `/users/${user.id}`;
                await axiosInstance.delete(url, {
                    headers: { Authorization: getAuthorizationHeader() }
                });
                toast.success('Delete user successfully!');
            }
        }
        catch (error) { return error.message; }
    }
);

export const searchUserByUsername = createAsyncThunk(
    'login/searchUserByUsername',
    async (pageStatus: interfaces.PageNumberStatus) => {
        try {
            const url = `/users?_username=${pageStatus.searching}&_page=${pageStatus.currentPage}&_limit=${pageStatus.itemsPerPage}`;
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

export const searchUserByName = createAsyncThunk(
    'login/searchUserByName',
    async (pageStatus: interfaces.PageNumberStatus) => {
        try {
            const url = `/users?_name=${pageStatus.searching}&_page=${pageStatus.currentPage}&_limit=${pageStatus.itemsPerPage}`;
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

export const searchUserByEmail = createAsyncThunk(
    'login/searchUserByEmail',
    async (pageStatus: interfaces.PageNumberStatus) => {
        try {
            const url = `/users?_email=${pageStatus.searching}&_page=${pageStatus.currentPage}&_limit=${pageStatus.itemsPerPage}`;
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

export const searchUserByAddress = createAsyncThunk(
    'login/searchUserByAddress',
    async (pageStatus: interfaces.PageNumberStatus) => {
        try {
            const url = `/users?_address=${pageStatus.searching}&_page=${pageStatus.currentPage}&_limit=${pageStatus.itemsPerPage}`;
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

export const searchUserBySurname = createAsyncThunk(
    'login/searchUserBySurname',
    async (pageStatus: interfaces.PageNumberStatus) => {
        try {
            const url = `/users?_surname=${pageStatus.searching}&_page=${pageStatus.currentPage}&_limit=${pageStatus.itemsPerPage}`;
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

export const searchUserByRole = createAsyncThunk(
    'login/searchUserByRole',
    async (pageStatus: interfaces.PageNumberStatus) => {
        try {
            const url = `/users?_role=${pageStatus.searching}&_page=${pageStatus.currentPage}&_limit=${pageStatus.itemsPerPage}`;
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

export const userSlice = createSlice({
    name: 'login',
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
                    if (state.user.role !== 'ROLE_ADMIN') state.user = action.payload;
                })
            .addCase(registerUser.pending, (state) => { state.status = 'loading'; })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || "Something went wrong";
            })
            // editUser asyncThunk
            .addCase(
                editUser.fulfilled,
                (state) => {state.status = 'succeeded';})
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
                    if (action.payload.name) {
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
            // showUsers asyncThunk
            .addCase(showUsers.fulfilled, (state) => {state.status = 'succeeded';})
            .addCase(showUsers.pending, (state) => { state.status = 'loading'; })
            .addCase(showUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || "Something went wrong";
            })
            // showUsersPerPage asyncThunk
            .addCase(
                showUsersPerPage.fulfilled,
                (state, action: PayloadAction<interfaces.UserData>) => {
                    state.status = 'succeeded';
                    state.usersPerPage = action.payload;
                })
            .addCase(showUsersPerPage.pending, (state) => { state.status = 'loading'; })
            .addCase(showUsersPerPage.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || "Something went wrong";
            })
            // searchUserByEmail asyncThunk
            .addCase(
                searchUserByEmail.fulfilled,
                (state, action: PayloadAction<interfaces.UserData>) => {
                    state.status = 'succeeded';
                    state.usersPerPage = action.payload;
                })
            .addCase(searchUserByEmail.pending, (state) => { state.status = 'loading'; })
            .addCase(searchUserByEmail.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || "Something went wrong";
            })
            // searchUserByUsername asyncThunk
            .addCase(
                searchUserByUsername.fulfilled,
                (state, action: PayloadAction<interfaces.UserData>) => {
                    state.status = 'succeeded';
                    state.usersPerPage = action.payload;
                })
            .addCase(searchUserByUsername.pending, (state) => { state.status = 'loading'; })
            .addCase(searchUserByUsername.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || "Something went wrong";
            })
            // searchUserByName asyncThunk
            .addCase(
                searchUserByName.fulfilled,
                (state, action: PayloadAction<interfaces.UserData>) => {
                    state.status = 'succeeded';
                    state.usersPerPage = action.payload;
                })
            .addCase(searchUserByName.pending, (state) => { state.status = 'loading'; })
            .addCase(searchUserByName.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || "Something went wrong";
            })
            // searchUserBySurname asyncThunk
            .addCase(
                searchUserBySurname.fulfilled,
                (state, action: PayloadAction<interfaces.UserData>) => {
                    state.status = 'succeeded';
                    state.usersPerPage = action.payload;
                })
            .addCase(searchUserBySurname.pending, (state) => { state.status = 'loading'; })
            .addCase(searchUserBySurname.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || "Something went wrong";
            })
            // searchUserByAddress asyncThunk
            .addCase(
                searchUserByAddress.fulfilled,
                (state, action: PayloadAction<interfaces.UserData>) => {
                    state.status = 'succeeded';
                    state.usersPerPage = action.payload;
                })
            .addCase(searchUserByAddress.pending, (state) => { state.status = 'loading'; })
            .addCase(searchUserByAddress.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || "Something went wrong";
            })
            // searchUserByRole asyncThunk
            .addCase(
                searchUserByRole.fulfilled,
                (state, action: PayloadAction<interfaces.UserData>) => {
                    state.status = 'succeeded';
                    state.usersPerPage = action.payload;
                })
            .addCase(searchUserByRole.pending, (state) => { state.status = 'loading'; })
            .addCase(searchUserByRole.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || "Something went wrong";
            })
    }
})

export const {
    logoutSuccess,
} = userSlice.actions;

export const userReducer = userSlice.reducer;
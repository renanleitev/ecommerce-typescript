import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import * as interfaces from '../../../interfaces';
import {axiosInstance, getAuthorizationHeader} from '../../../services/axios';

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
    pageUserStatus: {
        currentPage: 1,
        itemsPerPage: 3,
        type: 'user'
    },
};

export const loginUser = createAsyncThunk(
    'users/loginUser',
    async (userLogin: interfaces.User) => {
        try {
            const url = '/auth/login';
            const response = await axiosInstance.post(url, userLogin, {
                headers: { Authorization: getAuthorizationHeader() }
            });
            const userLoggedIn = { ...response.data };
            const token = String(response.headers['authorization']);           
            localStorage.setItem('token', token);
            return userLoggedIn;
        }
        catch (error) { return error.message; }
    }
);

export const registerUser = createAsyncThunk(
    'users/registerUser',
    async (user: interfaces.User) => {
        try {
            const url = '/auth/register';
            const response = await axiosInstance.post(url, user, {
                headers: { Authorization: getAuthorizationHeader() }
            });
            const userId = Number(response.headers['Id']);
            return {id: userId, ...user};
        }
        catch (error) { return error.message; }
    }
);

export const editUser = createAsyncThunk(
    'users/editUser',
    async (user: interfaces.User) => {
        try {
            const url = '/auth/edit';
            await axiosInstance.put(url, user, {
                headers: { Authorization: getAuthorizationHeader() }
            });
            return user;
        }
        catch (error) { return error.message; }
    }
);

export const showUsers = createAsyncThunk(
    'users/showUsers',
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
    'users/showUsersPerPage',
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
    'users/deleteUser',
    async (user: interfaces.User) => {
        try {
            if (user.id !== undefined) {
                const url = `/users/${user.id}`;
                await axiosInstance.delete(url, {
                    headers: { Authorization: getAuthorizationHeader() }
                });
            }
        }
        catch (error) { return error.message; }
    }
);

export const searchUserByUsername = createAsyncThunk(
    'users/searchUserByUsername',
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

export const searchUserByOrder = createAsyncThunk(
    'users/searchUserByOrder',
    async (pageStatus: interfaces.PageNumberStatus) => {
        try {
            const url = `/users?_column=${pageStatus.column}&_order=${pageStatus.order}&_page=${pageStatus.currentPage}&_limit=${pageStatus.itemsPerPage}`;
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
    'users/searchUserByName',
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
    'users/searchUserByEmail',
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
    'users/searchUserByAddress',
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
    'users/searchUserBySurname',
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
    'users/searchUserByRole',
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

export const usersSlice = createSlice({
    name: 'users',
    initialState: initialState,
    reducers: {
        logoutSuccess: (state) => {
            state.isLoggedIn = false;
            state.user = initialState.user;
            state.usersPerPage = initialState.usersPerPage;
            state.pageUserStatus = initialState.pageUserStatus;
            localStorage.removeItem('token');
        },
        resetUserPageStatus: (state) => {
            state.pageUserStatus = initialState.pageUserStatus;
        },
        changeUserPageStatus: (state, action: PayloadAction<interfaces.PageNumberStatus>) => {
            state.pageUserStatus = action.payload;
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
                    state.isLoggedIn = true;
                    state.user = action.payload;
                    state.status = 'succeeded';
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
            // searchUserByOrder asyncThunk
            .addCase(
                searchUserByOrder.fulfilled,
                (state, action: PayloadAction<interfaces.UserData>) => {
                    state.status = 'succeeded';
                    state.usersPerPage = action.payload;
                })
            .addCase(searchUserByOrder.pending, (state) => { state.status = 'loading'; })
            .addCase(searchUserByOrder.rejected, (state, action) => {
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
});

export const {
    logoutSuccess,
    resetUserPageStatus,
    changeUserPageStatus
} = usersSlice.actions;

export const usersReducer = usersSlice.reducer;
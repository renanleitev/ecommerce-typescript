import { 
    initialState,
    userReducer,
    logoutSuccess,
    loginUser,
    registerUser,
    editUser,
    deleteUser,
} from "../store/modules/login/reducer";
import { 
    dispatchLoginEx,
    mockUser, 
    mockUserState, 
    storeLogin 
} from "../services/_utils";
import axios from '../services/axios';
import * as interfaces from '../interfaces';

jest.mock('../services/axios');

afterEach(() => {
    jest.clearAllMocks();
});

describe('Testing initialState', () => {
    it('should have status', () => {
        expect(initialState).toHaveProperty(['status']);
    });
    it('should have error', () => {
        expect(initialState).toHaveProperty(['error']);
    });
    it('should have isLoggedIn', () => {
        expect(initialState).toHaveProperty(['isLoggedIn']);
    });
    it('should have user', () => {
        expect(initialState).toHaveProperty(['user']);
    });
    it('status should be idle', () => {
        expect(initialState.status).toBe('idle');
    });
    it('error should be empty string', () => {
        expect(initialState.error).toBe('');
    });
    it('user.id should be empty string', () => {
        expect(initialState.user.id).toBe('');
    });
    it('user.name should be empty string', () => {
        expect(initialState.user.name).toBe('');
    });
    it('user.surname should be empty string', () => {
        expect(initialState.user.surname).toBe('');
    });
    it('user.address should be empty string', () => {
        expect(initialState.user.address).toBe('');
    });
    it('user.email should be empty string', () => {
        expect(initialState.user.email).toBe('');
    });
    it('user.password should be empty string', () => {
        expect(initialState.user.password).toBe('');
    });
});

describe('Testing login reducers', () => {
    it('should return initialState', () => {
        expect(userReducer(undefined, { type: undefined })).toEqual(initialState);
        expect(storeLogin.getState().isLoggedIn).toEqual(false);
    });
    it('should logout user', () => {
        expect(userReducer(mockUserState, logoutSuccess())).toEqual(initialState);
        expect(storeLogin.getState().isLoggedIn).toEqual(false);
    });
});

describe('Testing login async thunks', () => {
    it('should register user', async () => {
        axios.post = jest.fn().mockResolvedValue(mockUser);
        await dispatchLoginEx(registerUser(mockUser));
        expect(storeLogin.getState().user).toEqual(mockUser);
        expect(storeLogin.getState().isLoggedIn).toEqual(true);
    });
    it('should login user', async () => {
        axios.get = jest.fn().mockResolvedValue([mockUser]);
        await dispatchLoginEx(loginUser(mockUser));
        expect(storeLogin.getState().user).toEqual(mockUser);
        expect(storeLogin.getState().isLoggedIn).toEqual(true);
    });
    it('should edit user', async () => {
        const editedUser: interfaces.User = {
            ...mockUser,
            name: 'Beltrano',
        };
        axios.put = jest.fn().mockResolvedValue(editedUser);
        await dispatchLoginEx(editUser(editedUser));
        expect(storeLogin.getState().user).toEqual(editedUser);
        expect(storeLogin.getState().isLoggedIn).toEqual(true);
    });
    it('should delete user', async () => {
        axios.delete = jest.fn().mockResolvedValue(mockUser);
        await dispatchLoginEx(deleteUser(mockUser));
        expect(storeLogin.getState().user).toEqual(initialState.user);
        expect(storeLogin.getState().isLoggedIn).toEqual(false);
    });
});
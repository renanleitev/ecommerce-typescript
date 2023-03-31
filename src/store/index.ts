import { persistStore } from 'redux-persist';
import persistedReducers from './modules/reduxPersist';
import { configureStore, ThunkDispatch, AnyAction } from '@reduxjs/toolkit';
import rootReducer from './modules/rootReducer';
import { IRootState } from '../interfaces';
import thunk from "redux-thunk";

const store = configureStore({
    middleware: [thunk],
    reducer: persistedReducers(rootReducer)
});

export type AppThunkDispatch = ThunkDispatch<IRootState, void, AnyAction>;

export const persistor = persistStore(store);

export default store;
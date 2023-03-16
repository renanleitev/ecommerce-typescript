import { persistStore } from 'redux-persist';
import persistedReducers from './modules/reduxPersist';
import { configureStore, ThunkDispatch } from '@reduxjs/toolkit';
import rootReducer from './modules/rootReducer';
import { IRootState } from './modules/rootReducer';
import thunk from "redux-thunk";

const store = configureStore({
    middleware: [thunk],
    reducer: persistedReducers(rootReducer)
});

export type AppThunkDispatch = ThunkDispatch<IRootState, any, any>;

export const persistor = persistStore(store);

export default store;
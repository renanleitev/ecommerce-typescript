import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import {IRootReducer} from '../modules/rootReducer';

export default (reducers: IRootReducer) => {
    const persistedReducers = persistReducer({
        key: 'react-base',
        storage,
        whitelist: ['login', 'products'],
    }, reducers);
    return persistedReducers;
};
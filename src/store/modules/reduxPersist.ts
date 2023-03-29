import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default (reducers: any) => {
    const persistedReducers = persistReducer({
        key: 'react-base',
        storage,
        whitelist: ['login', 'products'],
    }, reducers);
    return persistedReducers;
};
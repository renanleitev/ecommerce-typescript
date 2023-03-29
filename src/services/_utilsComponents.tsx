import React, { ReactElement } from 'react';
import { persistor } from '../store';
import { Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import history from '../services/history';
import { Store } from 'redux';
import { ToastContainer } from 'react-toastify';

export function RenderComponent(
    component: ReactElement<any | string>, 
    storeMock: Store,
    ): ReactElement{
    return (
        <Provider store={storeMock}>
            <PersistGate persistor={persistor}>
            <ToastContainer autoClose={3000} className="toast-container"/>
                <Router history={history}>
                    {component}
                </Router>
            </PersistGate>
        </Provider>
    )
}
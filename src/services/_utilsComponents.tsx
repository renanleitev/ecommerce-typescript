import React, { ReactElement } from 'react';
import { persistor } from '../store';
import { Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import history from '../services/history';

export function RenderComponent(component: any, store: any): ReactElement{
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <Router history={history}>
                    {component}
                </Router>
            </PersistGate>
        </Provider>
    )
}
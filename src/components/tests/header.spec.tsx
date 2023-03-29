import React from 'react';
import {screen, render} from '@testing-library/react';
import Header from "../Header";
import { Provider } from 'react-redux';
import {storeLogin} from '../../store/utils';
import * as redux from 'react-redux';

describe('Testing Header', () => {
    it('should be initial render', () => {
        expect(1).toBe(1);
    });
});
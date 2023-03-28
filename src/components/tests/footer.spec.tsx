import React from 'react';
import {screen, render} from '@testing-library/react';
import Footer from "../Footer";

describe('Testing Footer', () => {
    it('should render footer', () => {
        const test = 't';
        render(<Footer/>);
        expect(screen.queryByText(test)).toBeNull();
    });
});
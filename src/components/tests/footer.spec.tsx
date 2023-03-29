import React from 'react';
import {screen, render} from '@testing-library/react';
import Footer from "../Footer";

describe('Testing Footer', () => {
    render(<Footer/>);
    const getLinks = screen.getAllByRole('link', { hidden: true });
    it('should be initial render', () => {
        const test = 't';
        expect(screen.queryByText(test)).toBeNull();
    });
    it('should render Github link', () => {
        const githubLink = "https://github.com/renanleitev";
        expect(getLinks[0].toString()).toEqual(githubLink); 
    });
    it('should render React link', () => {
        const reactLink = "https://pt-br.reactjs.org/";
        expect(getLinks[1].toString()).toEqual(reactLink); 
    });
    it('should render JSON Server link', () => {
        const jsonLink = "https://github.com/typicode/json-server";
        expect(getLinks[2].toString()).toEqual(jsonLink); 
    });
});
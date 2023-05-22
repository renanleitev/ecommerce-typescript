import styled, { createGlobalStyle } from "styled-components";
import * as colors from '../config/colors';
import { injectStyle } from "react-toastify/dist/inject-style";

injectStyle();

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        outline: none;
        box-sizing: border-box;
    }
    body {
        font-family: sans-serif;
        color: ${colors.primaryDarkColor};
        background-color: ${colors.primaryDarkColor};
    }
    html, body, #root {
        height: 100%;
    }
    button {
        cursor: pointer;
        background: ${colors.primaryColor};
        border: none;
        color: #fff;
        padding: 10px 20px;
        border-radius: 4px;
        font-weight: 700;
    }
    a {
        text-decoration: none;
    }
    a:hover{
        color: ${colors.infoColor};
    }
    ul {
        list-style: none;
    }
    body .Toastify .Toastify__toast-container .Toastify__toast--success {
        margin-top: 70px;
        background-color: ${colors.sucessColor};
        color: white;
    }
    body .Toastify .Toastify__toast-container .Toastify__toast--error {
        margin-top: 50px;
        background-color: ${colors.errorColor};
        color: white;
    }
`;

export const Container = styled.section`
    max-width: 360px;
    height: 500px;
    background: white;
    margin: 30px auto;
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
        width: 150px;
        margin-top: 100%;
    }
    img:hover{
        transform: scale(1.2);
    }
    p{
        position: absolute;
        margin-top: 400px;
    }
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    h1{
        text-align: center;
    }
    label{
        margin: 10px 0px;
    }
    button{
        margin-top: 10px;
    }
    .link{
        margin-top: 10px;
        font-size: 12px;
    }
    .link:hover{
        color: blue;
    }
`;
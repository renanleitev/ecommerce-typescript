import styled, { createGlobalStyle } from "styled-components";
import * as colors from '../config/colors';
import { injectStyle } from "react-toastify/dist/inject-style";

injectStyle();

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
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
    background: ${colors.primaryWhiteColor};
    margin: 30px auto;
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 20px;
    img {
        width: 150px;
        margin-top: 100%;
    }
    img:hover{
        transform: scale(1.2);
        transition: all 300ms;
    }
    p{
        position: absolute;
        margin-top: 400px;
    }
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    h1, h2{
        text-align: center;
    }
    .link{
        margin-top: 10px;
        font-size: 12px;
    }
    .link:hover{
        color: ${colors.infoColor};
    }
    label {
        font-size: larger;
        font-weight: bolder;
        text-align: center;
        margin-right: 10px;
        margin-top: 15px;
        width: 250px;
    }
    input {
        border: none;
        outline: none;
        width: 250px;
        padding-top: 5px;
        border-bottom: 1px solid black;
        border-radius: 0;
    }
    button {
        border-radius: 20px;
        margin: 20px auto;
    }
    button:hover{
        background-color: ${colors.infoColor};
    }
`;
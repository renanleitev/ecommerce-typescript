import styled from "styled-components";
import * as colors from '../../config/colors';

export const DivTable = styled.div`
    text-align: center;
    padding-bottom: 70px;
    button:hover{
        background-color: ${colors.infoColor};
    }
    input {
        margin-top: 20px;
        width: 500px;
        height: 40px;
        border-radius: 20px;
        text-indent: 20px;
        border: none;
    }
`;

export const Table = styled.table`
    background-color: ${colors.primaryWhiteColor};
    color: ${colors.primaryDarkColor};
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
    padding: 20px;
    border-radius: 20px;
    text-align: center;
    table-layout: fixed;
    width: 1000px;
    word-wrap: break-word;
    a {
        color: ${colors.primaryDarkColor};
    }
    a:hover{
        color: ${colors.infoColor};
    }
    img{
        width: 50px;
        height: 50px;
    }
    img:hover{
        transform: scale(1.2);
        transition: all 300ms;
    }
    .product{
        height: 100px;
    }
    th:hover {
        cursor: pointer;
    }
    button:hover{
        background-color: ${colors.infoColor};
    }
`;
import styled from "styled-components";
import * as colors from '../../config/colors';

export const ItemContainer = styled.div`
    max-width: 760px;
    max-height: 700px;
    background: white;
    margin: 30px auto;
    padding: 30px;
    border-radius: 4px;
    box-shadow: 0 0 10px black;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    p {
        font-size: 20px;
        margin-bottom: 10px;
        text-align: center;
    }
    img{
        width: 150px;
        margin-top: 50px;
        margin-bottom: 50px;
    }
    img:hover{
        transform: scale(1.2);
        transition: all 300ms;
    }
    h1{
        margin-bottom: 10px;
    }
    form{
        width: 400px;
        overflow-y: scroll;
    }
    form > button {
        width: 360px;
    }
    /* input{
        width: 360px;
    } */
`;

export const CartButton = styled.button`
    margin-right: 10px;
    :hover{
        background-color: ${colors.sucessColor};
    }
`;

export const DivCartButton = styled.div`
    display: inline-block;
    .dropbtn {
        height: 40px;
        width: 40px;
        padding: 0;
    }
    .dropdown-content {
        display: none;
        width: 160px;
        margin-top: -40px;
        margin-left: -10px;
        z-index: 1;
    }
    :hover .dropdown-content {
        display: flex;
        flex-direction: row;
    }
    :hover .dropbtn {
        background-color: ${colors.infoColor};
    }
    .hidden{
        border-radius: 0;
        width: 50px;
        height: 40px;
        padding: 0;
    }
    .hidden:hover{
        background-color: ${colors.infoColor};
    }
`;
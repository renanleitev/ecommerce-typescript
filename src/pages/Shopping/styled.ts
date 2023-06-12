import styled from "styled-components";
import * as colors from '../../config/colors';
import {Container} from "../../styles/GlobalStyle";

export const CartContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    /* Items per row */
    padding: 40px calc((100% - (400px * 3)) / 2);
`;

export const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 5%;
    button{
        margin-right: 10px;
        :hover{
        background-color: ${colors.infoColor};
        }
    }
`;

export const ItemContainer = styled(Container)`
    background-color: ${colors.primaryWhiteColor};
    width: 420px;
    margin-top: 1%;
    margin-bottom: 5%;
    flex: 0 0 215px;
    p{
        position: relative;
        margin-top: 0;
    }
    h2{
        padding: 20px;
        text-align: center;
    }
`;

export const ShoppingContainer = styled(Container)`
    height: 400px;
    box-shadow: 0 0 10px black;
    p {
        font-size: 20px;
        margin-bottom: 10px;
        text-align: center;
    }
    img{
        height: 150px;
        margin-top: 50px;
        margin-bottom: 50px;
    }
`;

export const CheckoutContainer = styled.button`
    background-color: ${colors.infoColor};
    border-radius: 0;
    position: fixed;
    z-index: 2;
    :hover{
        background-color: ${colors.sucessColor};
    }
`;
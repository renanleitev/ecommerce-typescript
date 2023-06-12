import styled from "styled-components";
import * as colors from '../../config/colors';
import {Container} from "../../styles/GlobalStyle";

export const ItemContainer = styled(Container)`
    margin-right: 20px;
    border-radius: 4px;
    box-shadow: 0 0 10px black;
    text-align: center;
    p {
        position: relative;
        margin: 0px auto;
        font-size: 20px;
        margin-bottom: 10px;
        text-align: center;
    }
    img{
        margin-top: 50px;
        margin-bottom: 50px;
        :hover{
            transform: scale(1.2);
            transition: all 300ms;
        }
    }
    h1{
        margin-bottom: 10px;
    }
`;

export const CartButton = styled.button`
    margin-right: 10px;
    :hover{
        background-color: ${colors.infoColor};
    }
`;
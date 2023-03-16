import styled from "styled-components";
import * as colors from '../../config/colors';

export const Nav = styled.nav`
    background-color: ${colors.primaryColor};
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    a {
        color: ${colors.primaryWhiteColor};
        margin: 0 20px 0;
        font-weight: bold;
    }
    a:hover{
        color: ${colors.infoColor};
    }
    p{
        position: absolute;
        margin-left: 80%;
        color: ${colors.primaryWhiteColor};
        font-size: 14px;
        font-weight: bolder;
    }
`;

export const Cart = styled.div`
    p{
        margin-left: 25px;
        margin-top: 12px;
    }
`
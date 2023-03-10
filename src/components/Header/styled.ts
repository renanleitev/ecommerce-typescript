import styled from "styled-components";
import { primaryColor, primaryWhiteColor } from '../../config/colors'

export const Nav = styled.nav`
    background-color: ${primaryColor};
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    a {
        color: ${primaryWhiteColor};
        margin: 0 20px 0;
        font-weight: bold;
    }
    p{
        position: absolute;
        margin-left: 80%;
        color: ${primaryWhiteColor};
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
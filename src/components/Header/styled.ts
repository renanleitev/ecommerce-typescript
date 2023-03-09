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
        margin: 0 10px 0;
        font-weight: bold;
    }
    p{
        position: absolute;
        margin-left: 50%;
        color: ${primaryWhiteColor};
        font-size: 24px;
        font-weight: bolder;
    }
`;
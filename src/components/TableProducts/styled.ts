import styled from "styled-components";
import * as colors from '../../config/colors';

export const Table = styled.table`
    background-color: ${colors.primaryWhiteColor};
    color: ${colors.primaryDarkColor};
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
    margin-bottom: 70px;
    padding: 20px;
    border-radius: 20px;
    text-align: center;
    table-layout: fixed;
    width: 700px;
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
    
`;
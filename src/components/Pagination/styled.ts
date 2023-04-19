import styled from "styled-components";
import * as colors from '../../config/colors';

export const PaginationContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    button{
        margin-top: 50px;
        margin-bottom: 80px;
        width: 100px;
        margin-right: 10px;
    }
    button:hover{
        background-color: ${colors.infoColor};
    }
`;
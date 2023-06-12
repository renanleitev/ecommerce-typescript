import styled from "styled-components";
import * as colors from '../../config/colors';

export const PaginationContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const NumberContainer = styled(PaginationContainer)`
    flex-direction: row;
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

export const OptionContainer = styled(PaginationContainer)`
    flex-direction: row;
    height: 50px;
    p{
        height: inherit;
        color: ${colors.primaryWhiteColor};
        background-color: ${colors.primaryColor};
        padding: 20px;
        margin-right: 10px;
        border-radius: 4px;
    }
    select, input{
        height: inherit;
        margin-top: 0;
        border: none;
        text-align: center;
        width: 150px;
        border-radius: 4px;
        padding: 10px;
        margin-right: 10px;
        cursor: pointer;
        ::-webkit-scrollbar {
            width: 10px;
            color: ${colors.primaryDarkColor};
        }
        ::-webkit-scrollbar-track {
            box-shadow: inset 0 0 5px grey;
        }
        ::-webkit-scrollbar-thumb {
            background: ${colors.primaryColor};
        }
    }
`;
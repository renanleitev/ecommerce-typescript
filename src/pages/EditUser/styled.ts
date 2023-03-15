import styled from "styled-components";
import * as colors from '../../config/colors';

export const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-self: center;
    margin-bottom: 5%;
    button{
        margin-right: 10px;
        :hover{
        background-color: ${colors.sucessColor};
        }
    }
`;
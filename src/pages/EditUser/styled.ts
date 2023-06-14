import styled from "styled-components";
import * as colors from '../../config/colors';
import {Container} from "../../styles/GlobalStyle";

export const ButtonContainer = styled(Container)`
    flex-direction: row;
    align-self: center;
    button{
        margin-right: 15px;
        :hover{
        background-color: ${colors.infoColor};
        }
    }
`;
import styled from "styled-components";
import * as colors from '../../config/colors';

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    h1{
        text-align: center;
    }
    .link{
        margin-top: 10px;
        font-size: 12px;
    }
    .link:hover{
        color: ${colors.infoColor};
    }
    label {
        margin: 10px 0px;
        font-size: larger;
        font-weight: bolder;
        text-align: center;
    }
    input {
        width: 100%;
        padding: 20px;
        border-radius: 20px;
        border: 3px solid ${colors.primaryDarkColor};
    }
    button {
        width: 20%;
        margin-top: 10px;
        align-self: center;
        border-radius: 20px;
    }
    button:hover{
        background-color: ${colors.infoColor};
    }
`;
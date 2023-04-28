import styled from "styled-components";
import * as colors from '../../config/colors';

export const ModalContainer = styled.div`
    .modal-overlay {
        z-index: 9999;
        width: 100vw;
        height: 100vh;
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .modal-box {
        overflow-y: scroll;
        display: block;
        background: white;
        width: 50vw;
        height: 70%;
        padding: 1rem;
        border-radius: 1rem;
    }
    label {
        font-size: larger;
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
        align-self: center;
        border-radius: 20px;
    }
    button:hover{
        background-color: ${colors.infoColor};
    }
`;
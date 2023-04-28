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
        background-color: ${colors.primaryDarkColor};
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
`;
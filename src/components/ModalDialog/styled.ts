import styled from "styled-components";

export const ModalContainer = styled.div`
    dialog {
        border-radius: 20px;
        margin: 20px auto;
        padding: 20px;
        width: 600px;
        .close-btn {
            border-radius: 20px;
            padding: 10px;
            display: block;
            position: absolute;
            top: 10px;
            right: 10px;
            text-align:center;
        }
    }
`;
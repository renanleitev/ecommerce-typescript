import styled from "styled-components";

export const DivCartButton = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    .dropbtn {
        height: 30px;
        width: 30px;
        padding: 0;
    }
    .dropdown-content {
        display: none;
        flex-wrap: wrap;
        justify-content: center;
        position: absolute;
        width: 160px;
        margin-top: -40px;
        z-index: 1;
    }
    :hover .dropdown-content {
        display: flex;
        flex-direction: row;
    }
    :hover .dropbtn {
        display: none;
    } 
`;
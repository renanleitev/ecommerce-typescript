import styled from "styled-components";
import {Container} from "../../styles/GlobalStyle";

export const ProductContainer = styled.div`
    display: flex;
    flex-direction: row;
    max-width: 800px;
    margin: 20px auto;
    p{
        padding: 10px;
    }
`;
export const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const ItemContainer = styled(Container)`
    height: 500px;
    margin-right: 20px;
    margin-bottom: -20px;
    height: 400px;
    img {
        margin-top: 50%;
    }
    p{
        margin-top: 300px;
    }
`;
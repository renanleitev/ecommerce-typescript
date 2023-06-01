import styled from "styled-components";

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

export const Container = styled.section`
    max-width: 360px;
    height: 500px;
    background: white;
    margin: 30px auto;
    margin-right: 20px;
    margin-bottom: -20px;
    height: 400px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 20px;
    img {
        width: 150px;
        margin-top: 50%;
    }
    img:hover{
        transform: scale(1.2);
    }
    p{
        position: absolute;
        margin-top: 300px;
    }
`;
import React from "react";
import { Container } from '../../styles/GlobalStyle';
import * as text from '../../services/variablesText';

export default function Page404(): JSX.Element {
    return (
        <Container>
            <h1>{text.error404}</h1>
        </Container>
    ) 
}
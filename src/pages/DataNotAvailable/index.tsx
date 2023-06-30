import React from "react";
import { Container } from '../../styles/GlobalStyle';
import * as text from '../../services/variablesText';

export default function DataNotAvailable(): JSX.Element {
    return (
        <Container>
            <h1>{text.dataNotAvailable}</h1>
        </Container>
    )
}
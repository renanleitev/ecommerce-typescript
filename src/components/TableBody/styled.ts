import styled from "styled-components";

export const HiddenTd = styled.td`
    display: ${props => (props.hidden ? `none`: `flex`)};
`;
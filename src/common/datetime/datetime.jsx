import { CalculateRelativeDatetime } from "functions/content";

import styled from "styled-components";

const SDatetime = styled.div`
    padding: 5px 20px;
    color: var(--offHoverColor);
    background: var(--purpleColor);
    border-radius: 10px;
`;

export default function Datetime({ datetime }) {
    return <SDatetime>{CalculateRelativeDatetime(datetime)}</SDatetime>
}
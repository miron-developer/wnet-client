import styled from "styled-components";

const STypeBtnsHints = styled.div`
    display: flex;
    flex-direction: column;
    color: red;
`;

export default function TypeBtnsHints({ hints = [] }) {
    return (
        <STypeBtnsHints>
            { hints.map((hint, index) => <span key={index}>{hint}</span>) }
        </STypeBtnsHints>
    )
}
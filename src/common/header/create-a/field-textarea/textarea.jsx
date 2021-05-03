import styled from "styled-components";

const STextareaWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1rem 0;
    color: var(--onHoverColor);

    & textarea {
        padding: 1rem;
        resize: none;    
        background: #ffffff82;
        border-radius: 10px;
        border: none;
    }
`;

export default function FieldTextarea({ title, textareaBase }) {
    return (
        <STextareaWrapper>
            <span>{title}: </span>

            <textarea cols="30" rows="10" {...textareaBase} ></textarea>
        </STextareaWrapper>
    )
}
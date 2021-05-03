import styled from "styled-components"

const SEventTitleName = styled.span`
    width: 20%;
    color: #000000;
    text-transform: uppercase;
    font-weight: bold;
    transition: var(--transitionApp);

    @media screen and (max-width: 600px) {
        & {
            width: 30%;
        }
    }
`;

const SEventTitleInfo = styled.span`
    width: 60%;
    margin: auto;
    color: var(--offHoverColor);
    transition: var(--transitionApp);
`;

export default function EventInfo({title, info}) {
    return (
        <div>
            <SEventTitleName>{title}:</SEventTitleName>
            <SEventTitleInfo className='event-hover-text'>{info}</SEventTitleInfo>
        </div>
    )
}
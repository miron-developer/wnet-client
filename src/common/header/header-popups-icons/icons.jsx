import styled from "styled-components";

const SHeaderPopupsIcons = styled.div`
    width: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    color: var(--offHoverColor);
    transition: var(--transitionApp);

    &:hover {
        color: var(--onHoverColor);
    }
`;

export default function HeaderPopupsIcons({ children }) {
    return (
        <SHeaderPopupsIcons>
            {children}
        </SHeaderPopupsIcons>
    )
}
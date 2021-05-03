import styled from "styled-components";

const SPopupsItemText = styled.div`
    color: var(--offHoverColor);
    text-transform: uppercase;
    transition: var(--transitionApp);
`;

const SPopupsItemIcon = styled.div`
    margin: 5px;
    color: #000000;
`;

const SHeaderPopupsItem = styled.div`
    margin: 5px;
    padding: 5px;
    display: flex;
    align-items: center;
    text-decoration: none;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.15);
    transition: var(--transitionApp);

    &:hover {
        background: rgba(255, 255, 255, 0.3);
    }

    &:hover ${SPopupsItemText} {
        color: var(--onHoverColor);
    }
`;

export default function HeaderPopupsItem({ icon, textChildrens, onClick = ()=>{} }) {
    return (
        <SHeaderPopupsItem onClick={onClick} >
            <SPopupsItemIcon>
                <i className={`fa fa-${icon}`} aria-hidden="true"></i>
            </SPopupsItemIcon>

            <SPopupsItemText>
                {textChildrens}
            </SPopupsItemText>
        </SHeaderPopupsItem>
    )
}
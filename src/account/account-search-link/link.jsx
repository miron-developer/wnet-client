import { Link } from "react-router-dom";

import { Library } from "constants/language";

import styled from "styled-components";

const SLink = styled(Link)`
    position: fixed;
    right: 0;
    top: 50%;
    padding: 1rem;
    margin: 1rem;
    display: block;
    width: max-content;
    color: var(--onHoverColor);
    text-decoration: none;
    border-radius: 5px;
    background: var(--violetColor);
    box-shadow: var( --boxShadow);
    transition: var(--transitionApp);

    &:hover {
        color: var(--violetColor);
        background: var(--onHoverColor);
    }
`;

const SAdd = styled.span`
    margin-left: 5px;
`;

export default function Btn({route, text}) {
    return (
        <SLink to={route} >
            <i className="fa fa-plus" aria-hidden="true"></i>
            <SAdd>{Library.getText('common.routes.searches.search') + ' ' + text}</SAdd>
        </SLink>
    )
}
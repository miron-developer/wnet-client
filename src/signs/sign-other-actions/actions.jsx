import { Link } from 'react-router-dom';

import { RandomKey } from 'functions/content';

import styled from 'styled-components';

const SOtherActions = styled.div`
    margin: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const SOtherActionsItem = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    text-transform: uppercase;

    & span {
        color: var(--onHoverColor);
    }

    & a {
        margin-left: 5px;
        color: #0351C5;
        text-decoration: none;
    }
`;

const OneAction = ({actionText, linkTo, linkText}) => {
    return (
        <SOtherActionsItem>
            <span>{actionText}</span>
            <Link to={linkTo}> {linkText} </Link>
        </SOtherActionsItem>
    )
}

export default function OtherActions({actions = []}) {
    return (
        <SOtherActions>
            {
                actions.map(action => <OneAction key={RandomKey()} {...action} />)
            }
        </SOtherActions>
    )
}
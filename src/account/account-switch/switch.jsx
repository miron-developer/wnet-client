import { NavLink } from 'react-router-dom';

import { RandomKey } from 'functions/content';

import styled from 'styled-components';

const SSwitch = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
`;

const SSwitchBtn = styled(NavLink)`
    color: var(--onHoverColor);
    text-transform: uppercase;
    padding: 2rem;
    text-align: center;
    width: 100%;
    background: rgba(19, 0, 61, 0.6);
    text-decoration: none;

    &.active {
        background: rgba(19, 0, 61, 0.75);
    }
`;

const OneOption = ({to, textPath}) => {
    return (
        <SSwitchBtn activeClassName="active" to={to}>
            <div>{textPath}</div>
        </SSwitchBtn>
    )
}

export default function FriendsSwitch({switchDatas = []}) {
    return (
        <SSwitch>
            {switchDatas.map(data => <OneOption key={RandomKey()} {...data} />)}
        </SSwitch>
    )
}
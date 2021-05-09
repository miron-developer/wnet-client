import { RandomKey } from "functions/content";

import styled from "styled-components";

const SActions = styled.div`
    display: flex;
    align-items: center;
`;

const SCallAnswerOption = styled.div`
    position: relative;
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 .5rem;
    color: #000;
    font-size: 1.5rem;
    border-radius: 50px;
    background: ${props => props.color ? props.color : 'grey'};
    cursor: pointer;

    &:hover {
        filter: brightness(0.5);
    }

    & > i {
        transform: ${props => props.isDecline ? 'rotate(135deg)' : ''};
    }
`;

const SOffSlash = styled.div`
    position: absolute;
    width: 100%;
    height: 3px;
    background: #000000;
    transform: rotate(45deg);
`;

const colors = {
    'on': 'var(--onHoverColor)',
    'off': 'red',
    'accept': '#00821d',
}

const OneActionBtn = ({ type, icon = "phone", isNeedSlash = false, isDecline = false, onClick }) => {
    return (
        <SCallAnswerOption color={colors[type]} isDecline={isDecline} onClick={onClick}>
            {isNeedSlash ? <SOffSlash /> : null}
            <i className={'fa fa-'+icon}></i>
        </SCallAnswerOption>
    )
}

export default function CallActionBtns({ btns = [] }) {
    return (
        <SActions>
            {btns.map(btn => <OneActionBtn key={RandomKey()} {...btn} />)}
        </SActions>
    )
}
import { useEffect, useState } from 'react';

import { USER } from 'constants/constants';
import { ReadableCount } from 'functions/content';
import { CalculateSubsNumberType, CalculateSubsIcon, SubsClick } from 'profile/profile-actions-btns/btns';
import Avatar from 'common/avatar/avatar';

import styled from 'styled-components';

const SProfileAvatar = styled.div`
    margin: 1rem;
`;

const SProfileDataWrapper = styled.div`
    width: 100%;
    align-self: normal;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin: 0 1rem;
`;

const SProfileAboutWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    padding: .5rem 1rem;
    width: 100%;

    & span {
        color: #000000;
    }
`;

const SProfileSubsBtn = styled.div`
    font-size: 2rem;
    color: var(--violetColor);
`;

const subsClick = (e, isUser, subsState, setSubsState=()=>{}) => {
    e.preventDefault();
    SubsClick(subsState.clickNumber, isUser, subsState, setSubsState, false)
}

export default function ResultProfile({
    id, type, avatar, status, nickname, title, aboutMe, description, isPrivate, 
    followers, members, InRlshState, OutRlshState, Link
}) {
    const isUser = type === 'user' ? true : false;
    const isMy =  id === USER.id;
    const name = isUser ? nickname : title;
    const about = isUser ? aboutMe : description;
    const count = isUser ? followers : members;
    const icons = ['user-plus', 'user-times', 'window-restore'];

    const [subsState, setSubsState] = useState({});

    useEffect(() => {
        if (subsState.clickNumber !== CalculateSubsNumberType(isMy, isPrivate, subsState.InRlshState, subsState.OutRlshState)) {
            setSubsState({
                id,
                'InRlshState': subsState.InRlshState ? subsState.InRlshState : InRlshState,
                'OutRlshState': subsState.OutRlshState ? subsState.OutRlshState : OutRlshState,
                'clickNumber': CalculateSubsNumberType(isMy, isPrivate, subsState.InRlshState, subsState.OutRlshState),
                'subsIcon': CalculateSubsIcon(isMy, subsState.InRlshState, subsState.OutRlshState),
            })
        }
    }, [isMy, isUser, subsState, id, isPrivate, InRlshState, OutRlshState])

    return (
        <Link to={`/${type}/${id}`}>
            <SProfileAvatar>
                <Avatar isUser={isUser} avatar={avatar} status={status} />
            </SProfileAvatar>

            <SProfileDataWrapper>
                <h2 className="result-item-title">{name}</h2>
                <SProfileAboutWrapper>
                    <span>{about}</span>
                    <span>{ReadableCount(count)} {isUser?'follows':'members'}</span>
                </SProfileAboutWrapper>
            </SProfileDataWrapper>

            { isMy
                ? null
                : <SProfileSubsBtn onClick={e => subsClick(e, isUser, subsState, setSubsState)} >
                    <i className={`fa fa-${icons[subsState.subsIcon]}`} aria-hidden="true"></i>
                </SProfileSubsBtn>
            }
        </Link>
    );
}
import { useEffect, useState } from "react";

import { Library } from "constants/language";
import { RandomKey } from "functions/content";
import { ScrollHandler } from "functions/effects";
import { useFromTo } from "functions/hooks";
import { SubsClick } from "profile/profile-actions-btns/btns";
import Avatar from 'common/avatar/avatar';

import styled from "styled-components";

const STitle = styled.h2`
    width: 100%;
    text-align: center;
    text-transform: uppercase;
`;

const SCatalogueWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    height: 100%;
    overflow: auto;
`;

const SProfileItemWrapper = styled.div`
    height: max-content;
    text-decoration: none;
`;

const SProfileItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    margin: 1rem;
    border-radius: 10px;
    background: var(--darkRedColor);
    box-shadow: var(--boxShadow);
`;

const SProfileItemName = styled.div`
    margin: auto;
    color: var(--offHoverColor);
`;

const SRlshActionsWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 10px;
    width: 100%;
    border-radius: 10px;
`;

const SRlshAction = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 2rem;
    padding: 10px;
    color: var(--onHoverColor);
    background: ${props => props.isAccept ? "#030061d6" : "#3c0b03"};
    border-radius: 10px;
    cursor: pointer;
`;

const SActionText = styled.span`
    margin: 2px;
    color: var(--onHoverColor);
    text-transform: uppercase;
`;

const localLib = {
    'notLoadDatas': Library.getText('common.catalogue-of.notLoadDatas'),
    'title': title => Library.getText('profile.actions-btns.btns.'+title),
    'rqAccept': Library.getText('profile.actions-btns.subsBtn.rqAccept'),
    'rqDecline': Library.getText('profile.actions-btns.subsBtn.rqDecline'),
}

const RequestOne = ({id, avatar, status, nickname, groupID}) => {
    const [isRemoved, setRemoved] = useState(false);
    const [subsState, setSubsState] = useState({
        'id': groupID,
    });

    return isRemoved ? null : (
        <SProfileItemWrapper>
            <SProfileItem>
                <Avatar isUser={true} avatar={avatar} status={status} />

                <SProfileItemName>{nickname}</SProfileItemName>

                <SRlshActionsWrapper>
                    <SRlshAction isAccept={true} onClick={() => SubsClick(4, false, id, subsState, setSubsState) && setRemoved(true)}>
                        <i className='fa fa-user-plus' aria-hidden="true"></i>
                        <SActionText>{localLib.rqAccept}</SActionText>
                    </SRlshAction>

                    <SRlshAction onClick={() => SubsClick(5, false, id, subsState, setSubsState) && setRemoved(true)}>
                        <i className='fa fa-user-times' aria-hidden="true"></i>
                        <SActionText>{localLib.rqDecline}</SActionText>
                    </SRlshAction>
                </SRlshActionsWrapper>
            </SProfileItem>
        </SProfileItemWrapper>
    )
}

const loadReqs = (get, id, params, getPart) => getPart(get, {...params, 'id' : id}, localLib.notLoadDatas, true);

export default function RequestsHandle({get, title, id, params = {}}) {
    const {datalist, isStopLoad, getPart} = useFromTo([], 20);
    const [isLoaded, setLoaded] = useState(false);

    useEffect(
        () => {
            if (!isLoaded) {
                loadReqs(get, id, params, getPart);
                setLoaded(true);
            }
        },
        [isLoaded, params, get, id, getPart]
    );

    return (
        <>
            <STitle>{localLib.title(title)}</STitle>
            <SCatalogueWrapper onScroll={
                e => ScrollHandler(
                    e, 
                    isStopLoad, 
                    false, 
                    () => loadReqs(get, id, params, getPart)
                )
            }>
                {
                    datalist.map(data => <RequestOne key={RandomKey()} groupID={id} {...data} />)
                }
            </SCatalogueWrapper>
        </>
    )
}
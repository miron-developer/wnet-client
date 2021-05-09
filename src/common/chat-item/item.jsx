import { Link } from 'react-router-dom';

import { Library } from 'constants/language';
import Avatar from 'common/avatar/avatar';
import Datetime from 'common/datetime/datetime';

import styled from 'styled-components';

const SMessengerBody = styled.div`
    width: 100%;
    align-self: normal;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin: 0 1rem;
`

const SMessengerName = styled.span`
    color: var(--offHoverColor);
    transition: var(--transitionApp);
`

const SMsgWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    padding: .5rem 1rem;
    width: 100%;

    /* messenger message text */
    & > span:first-child {
        color: #000000;
    }
`

const SChat = styled(Link)`
    display: flex;
    align-items: center;
    padding: 1rem;
    margin: 1rem;
    background: var(--offHoverBG);
    text-decoration: none;
    border: 2px solid var(--offHoverBG);
    border-radius: 10px;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.25);
    transition: var(--transitionApp);

    &:hover {
        background: var(--onHoverBG);
    }

    /* additional margin for avatar */
    & > *:first-child {
        margin: 1rem;
    }

    &:hover ${SMessengerName} {
        color: var(--onHoverColor);
    }
`

export default function Chat({id, receiverUserID, receiverGroupID, userAvatar, nickname, status, groupAvatar, groupTitle, msgBody, msgDatetime}) {
    const isUser = nickname ? true : false;
    const opponentID = isUser ? receiverUserID : receiverGroupID;
    const type = isUser ? 'user' : 'group';
    const name = isUser ? nickname : groupTitle;
    const chatID = type[0] + opponentID;
    const avatar = isUser ? userAvatar : groupAvatar;
    const msg = msgBody ? msgBody : "no message";
    const datetime = msgDatetime ? msgDatetime : Date.now();

    const stringChatData = JSON.stringify({
        'id': opponentID,
        'isUser': isUser,
        'avatar': avatar,
        'name': name,
        'status': status,
        'msg': msg,
        'datetime': datetime,
    });
    window.localStorage.setItem(chatID, stringChatData);
    
    return (
        <SChat to={'/'+Library.getText('common.routes.messenger')+'/'+chatID} >
            <Avatar isUser={isUser} avatar={avatar} status={status} />

            <SMessengerBody>
                <SMessengerName>{name}</SMessengerName>
                <SMsgWrapper>
                    <span>{msg}</span>
                    <Datetime datetime={datetime}></Datetime>
                </SMsgWrapper>
            </SMessengerBody>
        </SChat>
    )
}
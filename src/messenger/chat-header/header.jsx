import { ToCall } from 'common/calls/calls';
import Avatar from 'common/avatar/avatar';

import styled from 'styled-components';

const SChatHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 2rem;
    background: rgba(0, 0, 0, 0.22);
`;

const SChatName = styled.div`
    width: 40%;
    padding: 1rem;
    text-align: center;
    color: var(--onHoverColor);
    background: rgba(255, 255, 255, 0.26);
    border-radius: 10px;
    box-shadow: var(--boxShadow);
`;

const SCalls = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const SCall = styled.div`
    margin: 1rem;
    padding: 1rem;
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    background: ${props => props.isUser && props.isOnline ? '#1400FF' : 'grey'};
    border-radius: 50%;
    cursor: pointer;
    box-shadow: var(--boxShadow);
    transition: var(--transitionApp);

    &:hover{
        color: var(--onHoverColor);
        background: ${props => props.isUser ? '#0D028F' : 'grey'};
    }
`;

const icons = ['video-camera', 'phone'];
const OneCall = ({isUser, status, icon, onClick}) => {
    const isOnline = status === "online";
    return (
        <SCall isOnline={isOnline} isUser={isUser} onClick={() => isUser && isOnline && onClick()}>
            <i className={'fa fa-'+icons[icon]}></i>
        </SCall>
    )
}

export default function ChatHeader({isUser, status, avatar, name, id}) {
    return (
        <SChatHeader>
            <Avatar isUser={isUser} avatar={avatar} status={status} isNeedBorder={false} size="5rem" />

            <SChatName>{name}</SChatName>

            <SCalls>
                <OneCall status={status} isUser={isUser} icon="0" onClick={() => ToCall('video', id)} />
                <OneCall status={status} isUser={isUser} icon="1" onClick={() => ToCall('audio', id)} />
            </SCalls>
        </SChatHeader>
    )
}
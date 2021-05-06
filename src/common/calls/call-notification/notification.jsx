import { USER } from 'constants/constants';
import { Library } from 'constants/language';
import Avatar from 'common/avatar/avatar';

import styled from 'styled-components';

const SNotification = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 2rem;
    background: rgba(0, 13, 130, 0.9);
`;

const SNotificationBody = styled.div`
    display: flex;
    align-items: center;
    padding: 1rem;
    width: 50%;
    color: var(--onHoverColor);
    border-radius: 50px;
    background: rgba(0, 0, 0, 0.27);

    & > * {
        margin: 0 .5rem;
    }
`;

const SCallAnswerOption = styled.div`
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 .5rem;
    color: var(--onHoverColor);
    font-size: 1.5rem;
    border-radius: 50px;
    background: ${props => props.isAccept ? '#00821d' : 'red'};
    cursor: pointer;

    &:hover {
        filter: brightness(0.5);
    }

    & > i {
        transform: ${props => props.isAccept ? '' : 'rotate(135deg)'};
    }
`;

const SActions = styled.div`
    display: flex;
    align-items: center;
`;

const icons = ['video-camera', 'phone'];

const CallOption = ({isAccept, onClick}) => {
    return (
        <SCallAnswerOption isAccept={isAccept} onClick={onClick}>
            <i className='fa fa-phone'></i>
        </SCallAnswerOption>
    )
}

export default function CallNotification({notification, Accept, Decline}) {
    const icon = notification.type === 'video' ? icons[0] : icons[1];
    const isMeCalling = notification.whomCalling === 'me';

    return (
        <SNotification>
            <Avatar avatar={isMeCalling ? USER.avatar : notification.avatar} isNeedBorder={false} size="" />

            <SNotificationBody>
                <i className={`fa fa-${icon}`}></i>
                {
                    isMeCalling 
                        ?  <span>{Library.getText('common.calls.notification.youAreCalling').replace('CALLTYPE', notification.type)}</span>
                        :  <span>{Library.getText('common.calls.notification.somebodyAreCalling').replace('CALLTYPE', notification.type).replace('NAME', notification.nickname)}</span>
                }
            </SNotificationBody>

            { 
                isMeCalling 
                    ? <div></div> 
                    : <SActions>
                        <CallOption isAccept={true} onClick={Accept} />
                        <CallOption isAccept={false} onClick={Decline} />
                    </SActions>
            }
        </SNotification>
    )
}
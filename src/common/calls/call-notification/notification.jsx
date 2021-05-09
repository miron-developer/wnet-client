import { USER } from 'constants/constants';
import { Library } from 'constants/language';
import Avatar from 'common/avatar/avatar';

import CallActionsBtns from 'common/calls/call-action-btns/btns';
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

export default function CallNotification({notification, Accept, Decline}) {
    const icon = notification.type === 'video' ? 'video-camera' : 'phone';
    const isMeCalling = notification.whomCalling === 'me';

    return (
        <SNotification>
            <Avatar avatar={isMeCalling ? USER.avatar : notification.avatar} size="" />

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
                    : <CallActionsBtns btns={[{
                            type: "accept",
                            onClick: Accept
                        }, {
                            type: "off",
                            isDecline: true,
                            onClick: Decline
                        }]} 
                    />
            }
        </SNotification>
    )
}
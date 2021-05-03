import { useState } from 'react';

import { RandomKey } from 'functions/content';

import styled from 'styled-components';

const SAppNotifications = styled.div`
    position: fixed;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`

const SAppNotificationWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: max-content;
    max-width: 50vw;
    margin: 1rem;
    padding: 1rem;
    border-radius: 5px;
    background: ${props => `var(${props.color})`};
`;

const SCloseNotification = styled.div`
    padding: 5px;
    margin-left: 10px;
    height: 1.5rem;
    width: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--redColor);
    background: var(--darkRedColor);
    border-radius: 50%;
    cursor: pointer;
`;

let add;
let removeNotification = id => {};
let interID;

export const Notify = (type, text) => {
    if (add) return add(type, text);
    interID = setInterval(() => {
        if (add !== undefined) {
            clearInterval(interID);
            add(type, text);
        }
    }, 0);
}

const colors = {
    'success': '--successBG',
    'fail': '--failBG',
    'info': '--infoBG',
}

const Notification = ({ id = 0, type = "fail", text = "" }) => {
    setTimeout(() => {
        if (type !== "info") removeNotification(id);
    }, 10000);

    return (
        <SAppNotificationWrapper color={colors[type]}>
            <span>{text}</span>
            <SCloseNotification onClick={()=>removeNotification(id)}>
                <i className="fa fa-times" aria-hidden="true"></i>
            </SCloseNotification>
        </SAppNotificationWrapper>
    )
}

const useNotifications = () => {
    const [ntfs, setNTFS] = useState([]);

    removeNotification = id => setNTFS(ntfs.filter(item => item.props.id !== id));
    add = (type, text)  => {
        const key = RandomKey();
        setNTFS([...ntfs, <Notification key={key} id={key} type={type} text={text} />]);
    }
    
    return {
        ntfs,
        setNTFS
    };
}

export default function Notifications() {
    const { ntfs } = useNotifications();

    return <SAppNotifications>{ntfs}</SAppNotifications>;
}
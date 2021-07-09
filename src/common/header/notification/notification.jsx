import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Library } from 'constants/language';
import { NOTE_COMMENT_COMMENT, NOTE_COMMENT_PHOTO, NOTE_COMMENT_POST, NOTE_COMMENT_VIDEO, NOTE_CREATE_GROUP, NOTE_CREATE_POST, 
    NOTE_INVITE_TO_EVENT, NOTE_INVITE_TO_GROUP, NOTE_LIKED_COMMENT, NOTE_LIKED_PHOTO, NOTE_LIKED_POST, NOTE_LIKED_VIDEO } from 'constants/constants';
import { useFromTo } from 'functions/hooks';
import { ScrollHandler } from 'functions/effects';
import { RandomKey } from 'functions/content';
import { GetOne } from 'functions/api';

import HeaderPopups from 'common/header/header-popups/popups';
import HeaderPopupsIcons from 'common/header/header-popups-icons/icons';
import HeaderPopupsBody from 'common/header/header-popups-body/body';
import HeaderPopupsItem from 'common/header/header-popups-item/item';
import styled from 'styled-components';

const SNotificationCount = styled.div`
    padding: 5px;
    display: ${props => props.count > 0 ? 'flex' : 'none'};
    justify-content: center;
    align-items: center;
    color: var(--redColor);
    background: #2F0B8D;
    border-radius: 50%;
`;

const SHeaderPopupsLink = styled(Link)`
    text-decoration: none;
    color: #000000;
`;

let add;
export const AddUserNotification = note => add(note);

const localLib = {
    'create': Library.getText('common.header.notification.whatDid.create'),
    'invite': Library.getText('common.header.notification.whatDid.invite'),
    'liked': Library.getText('common.header.notification.whatDid.liked'),
    'commented': Library.getText('common.header.notification.whatDid.commented'),
    'participate': Library.getText('common.header.notification.additionalInfos.participate'),
    'beMemb': Library.getText('common.header.notification.additionalInfos.beMemb'),
    'post': Library.getText('common.routes.post'),
    'event': Library.getText('common.routes.event'),
    'group': Library.getText('common.header.create-a.createItems.group'),
    'comment': Library.getText('common.routes.comment'),
    'photo': Library.getText('common.routes.photo'),
    'video': Library.getText('common.routes.video'),
    'notLoadNotification': Library.getText('common.header.notification.notLoadNotification'),
    'user': Library.getText('common.routes.user'),
    'notLoadNotifications': Library.getText('common.header.notification.notLoadNotifications'),
}

const calculateIcon = type => {
    if (type === NOTE_CREATE_GROUP || type === NOTE_INVITE_TO_GROUP) return 1;
    if (type === NOTE_INVITE_TO_EVENT) return 2;
    if (type >= NOTE_LIKED_POST && type < NOTE_COMMENT_POST) return 3;
    if (type >= NOTE_COMMENT_POST) return 4;
    return 0;
}

const calculateWhatDid = type => {
    if (type === NOTE_CREATE_POST || type === NOTE_CREATE_GROUP) return localLib.create;
    if (type === NOTE_INVITE_TO_EVENT || type === NOTE_INVITE_TO_GROUP) return localLib.invite;
    if (type >= NOTE_LIKED_POST && type < NOTE_COMMENT_POST) return localLib.liked;
    return localLib.commented;
}

const calculateAdditionalInfo = type => {
    if (type === NOTE_INVITE_TO_EVENT) return localLib.participate;
    if (type === NOTE_INVITE_TO_GROUP) return localLib.beMemb;
    return "";
}

const calculateWhat = type => {
    if (type === NOTE_CREATE_POST || type === NOTE_LIKED_POST || type === NOTE_COMMENT_POST) return [localLib.post, "postID"];
    if (type === NOTE_INVITE_TO_EVENT) return [localLib.event, "eventID"];
    if (type === NOTE_CREATE_GROUP || type === NOTE_INVITE_TO_GROUP) return [localLib.group, "groupID"];
    if (type === NOTE_LIKED_COMMENT || type === NOTE_COMMENT_COMMENT) return [localLib.comment, "commentID"];
    if (type === NOTE_LIKED_PHOTO || type === NOTE_COMMENT_PHOTO) return [localLib.photo, "mediaID"];
    if (type === NOTE_LIKED_VIDEO || type === NOTE_COMMENT_VIDEO) return [localLib.video, "mediaID"];
}

const defineNotification = (storageID) => {
    const stored = window.localStorage.getItem(storageID);
    if (stored) return JSON.parse(stored);
    return {};
}

const NotificationItem = ({id, type}) => {
    const storageID = `n${id}`;
    const [notification, setNotification] = useState(defineNotification(storageID));

    useEffect(() => {
        if (Object.values(notification).length === 0) {
            GetOne({'id':id, 'type': type}, "notification", localLib.notLoadNotification, setNotification);
        }
    }, [id, type, notification]);

    if (Object.values(notification).length !== 0) window.localStorage.setItem(storageID, JSON.stringify(notification));
    const icons = ['sticky-note', 'users', 'calendar', 'heart', 'comments'];
    const name = notification.nickname ? notification.nickname : "";
    const [whatRes, whatID] = calculateWhat(type);
    
    const icon = calculateIcon(type);
    const midText = calculateWhatDid(type) + " " + calculateAdditionalInfo(type);
    const linkText = "/" + whatRes + "/" + notification[whatID];

    const textChildrens = (
        <>
            <span> {localLib.user} </span>
            <b> {name} </b> 
            <span> {midText} </span> 
            <b> {notification.whatData} </b> 
            <span> {whatRes} </span>
        </>
    )
    
    return (
        <SHeaderPopupsLink to={linkText} >
            <HeaderPopupsItem icon={icons[icon]} textChildrens={textChildrens} />
        </SHeaderPopupsLink>
    )
}

export default function Notifications() {
    const [isOpened, setOpened] = useState(false);
    const [isLoaded, setLoaded] = useState(false);
    const {datalist, isStopLoad, setDataList, getPart} = useFromTo();

    add = note => setDataList([...datalist, note]);

    useEffect(() => {
        if (datalist.length === 0 && !isLoaded) {
            getPart('notifications', {}, localLib.notLoadNotifications, true);
            setLoaded(true);
        }
    }, [datalist, isLoaded, getPart]);

    return (
        <HeaderPopups isOpened={isOpened} setOpened={setOpened}>
            <HeaderPopupsIcons>
                <i className="fa fa-bell" aria-hidden="true"></i>
            </HeaderPopupsIcons>

            <SNotificationCount count={datalist.length}>{datalist.length}</SNotificationCount>

            <HeaderPopupsBody 
                isOpened={isOpened} 
                isNotifications={true} 
                onScroll={
                    e => 
                    ScrollHandler(
                        e, 
                        isStopLoad, 
                        false, 
                        () => getPart('notifications', {}, localLib.notLoadNotifications, true)
                    )
                }
            >
                {datalist.map(note => <NotificationItem key={RandomKey()} {...note} />)}
            </HeaderPopupsBody>
        </HeaderPopups>
    )   
}
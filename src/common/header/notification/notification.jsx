import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Library } from 'constants/language';
import { NOTE_COMMENT_COMMENT, NOTE_COMMENT_PHOTO, NOTE_COMMENT_POST, NOTE_COMMENT_VIDEO, NOTE_CREATE_GROUP, NOTE_CREATE_POST, 
    NOTE_INVITE_TO_EVENT, NOTE_INVITE_TO_GROUP, NOTE_LIKED_COMMENT, NOTE_LIKED_PHOTO, NOTE_LIKED_POST, NOTE_LIKED_VIDEO } from 'constants/constants';
import { useFromTo } from 'functions/hooks';
import { ScrollHandler } from 'functions/effects';
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

const calculateIcon = type => {
    if (type === NOTE_CREATE_GROUP || type === NOTE_INVITE_TO_GROUP) return 1;
    if (type === NOTE_INVITE_TO_EVENT) return 2;
    if (type >= NOTE_LIKED_POST && type < NOTE_COMMENT_POST) return 3;
    if (type >= NOTE_COMMENT_POST) return 4;
    return 0;
}

const calculateWhatDid = type => {
    if (type === NOTE_CREATE_POST || type === NOTE_CREATE_GROUP) return Library.getText('common.header.notification.whatDid.create');
    if (type === NOTE_INVITE_TO_EVENT || type === NOTE_INVITE_TO_GROUP) return Library.getText('common.header.notification.whatDid.invite');
    if (type >= NOTE_LIKED_POST && type < NOTE_COMMENT_POST) return Library.getText('common.header.notification.whatDid.liked');
    return Library.getText('common.header.notification.whatDid.commented');
}

const calculateAdditionalInfo = type => {
    if (type === NOTE_INVITE_TO_EVENT) return Library.getText('common.header.notification.additionalInfos.participate');
    if (type === NOTE_INVITE_TO_GROUP) return Library.getText('common.header.notification.additionalInfos.beMemb');
    return "";
}

const calculateWhat = type => {
    if (type === NOTE_CREATE_POST || type === NOTE_LIKED_POST || type === NOTE_COMMENT_POST) return [Library.getText('common.routes.post'), "postID"];
    if (type === NOTE_INVITE_TO_EVENT) return [Library.getText('common.routes.event'), "eventID"];
    if (type === NOTE_CREATE_GROUP || type === NOTE_INVITE_TO_GROUP) return [Library.getText('common.header.create-a.createItems.group'), "groupID"];
    if (type === NOTE_LIKED_COMMENT || type === NOTE_COMMENT_COMMENT) return [Library.getText('common.routes.comment'), "commentID"];
    if (type === NOTE_LIKED_PHOTO || type === NOTE_COMMENT_PHOTO) return [Library.getText('common.routes.photo'), "mediaID"];
    if (type === NOTE_LIKED_VIDEO || type === NOTE_COMMENT_VIDEO) return [Library.getText('common.routes.video'), "mediaID"];
}

const NotificationItem = ({id, type}) => {
    const [notification, setNotification] = useState({})

    useEffect(() => {
        if (Object.values(notification).length === 0) {
            GetOne({'id':id, 'type': type}, "notification", Library.getText('common.header.notification.notLoadNotification'), setNotification);
        }
    }, [id, type, notification]);

    const icons = ['sticky-note', 'users', 'calendar', 'heart', 'comments'];
    const name = notification.nickname ? notification.nickname : "";
    const [whatRes, whatID] = calculateWhat(type);
    
    const icon = calculateIcon(type);
    const midText = calculateWhatDid(type) + " " + calculateAdditionalInfo(type);
    const linkText = "/" + whatRes + "/" + notification[whatID];

    const textChildrens = (
        <>
            <span> {Library.getText('common.routes.user')} </span>
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
            getPart('notifications', {}, Library.getText('common.header.notification.notLoadNotifications'), true)
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
                        () => getPart('notifications', {}, Library.getText('common.header.notification.notLoadNotifications'), true)
                    )
                }
            >
                {datalist.map((note, index) => <NotificationItem key={index} {...note} />)}
            </HeaderPopupsBody>
        </HeaderPopups>
    )   
}
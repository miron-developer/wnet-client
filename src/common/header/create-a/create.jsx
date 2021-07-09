import { useState } from 'react';

import { Library } from 'constants/language';
import { POSTRequestWithParams } from 'functions/api';
import { Notify } from 'common/app-notification/notification';
import { PopupOpen, ClosePopup } from 'common/popup/popup';

import HeaderPopups from 'common/header/header-popups/popups';
import HeaderPopupsIcons from 'common/header/header-popups-icons/icons';
import HeaderPopupsBody from 'common/header/header-popups-body/body';
import HeaderPopupsItem from 'common/header/header-popups-item/item';
import CreatePost from 'common/header/create-a/post/post';
import CreateEvent from 'common/header/create-a/event/event';
import CreateGroup from 'common/header/create-a/group/group';
import CreatePhoto from 'common/header/create-a/photo/photo';
import CreateVideo from 'common/header/create-a/video/video';
import styled from 'styled-components';

const SCreateWrapper = styled.div`
    width: 100%;
    height: 100%;
    padding: 1rem;
    margin: 1rem;
    border-radius: 5px;
    background: rgba(0, 26, 75, 0.16);
    overflow: auto;
`;

const SCreateTitle = styled.h2`
    padding: 1rem;
    margin: 1rem auto;
    width: 50%;
    text-align: center;
    color: var(--onHoverColor);
    border-radius: 50px;
    background: #05003D;
`;

const SWrapperForm = styled.form`
    position: relative;
    padding: 1rem;
    margin: 1rem;
`;

const localLib = {
    'post': Library.getText('common.header.create-a.createItems.post'),
    'event': Library.getText('common.header.create-a.createItems.event'),
    'group': Library.getText('common.header.create-a.createItems.group'),
    'photo': Library.getText('common.header.create-a.createItems.photo'),
    'video': Library.getText('common.header.create-a.createItems.video'),
    'canNotSaved': Library.getText('common.header.create-a.canNotSaved'),
    'link': type => Library.getText('common.routes.'+type),
    'create': Library.getText('common.header.create-a.create'),
}

const types = {
    'post': localLib.post,
    'event': localLib.event,
    'group': localLib.group,
    'photo': localLib.photo,
    'video': localLib.video,
}

const onSubmit = async(e, history, type, getParams = new Promise(), valErr, onSuccessCreate = ()=>{}) => {
    e.preventDefault();

    if (valErr) return Notify('fail', valErr);
   
    const params = await getParams;
    const res = await POSTRequestWithParams('/s/'+type, params);
    if (res.err !== 'ok') return Notify('fail', localLib.canNotSaved + " " + res.err);

    onSuccessCreate(res.data);
    ClosePopup();
    history.push('/' + localLib.link(type) + '/' + res.data[0]);
}

const PopupWrapper = ({ e, type, CreatePopup, Wrapper }) => {
    e.stopPropagation();

    return (
        <SCreateWrapper>
            <SCreateTitle> {localLib.create + ' ' + types[type]} </SCreateTitle>
            <CreatePopup Wrapper={Wrapper} onSubmit={onSubmit} />
        </SCreateWrapper>
    )
}

const CreateItem = ({icon, createText, onClick}) => {
    const textChildrens = <span>{createText}</span>

    return <HeaderPopupsItem icon={icon} textChildrens={textChildrens} onClick={onClick} />
}

export default function CreateA() {
    const [isOpened, setOpened] = useState(false);

    return (
        <HeaderPopups isOpened={isOpened} setOpened={setOpened} >
            <HeaderPopupsIcons>
                <i className="fa fa-plus" aria-hidden="true"></i>
            </HeaderPopupsIcons>

            <div className="create-popup-icon">
                <i className="fa fa-caret-down" aria-hidden="true"></i>
            </div>

            <HeaderPopupsBody isOpened={isOpened} >
                <CreateItem createText={localLib.post}  icon="sticky-note" 
                    onClick={e => PopupOpen(PopupWrapper, { e, 'type': 'post', 'CreatePopup': CreatePost, 'Wrapper': SWrapperForm })}
                />

                <CreateItem createText={localLib.group} icon="users" 
                    onClick={e => PopupOpen(PopupWrapper, { e, 'type': 'group', 'CreatePopup': CreateGroup, 'Wrapper': SWrapperForm })}
                />

                <CreateItem createText={localLib.event} icon="calendar"
                    onClick={e => PopupOpen(PopupWrapper, { e, 'type': 'event', 'CreatePopup': CreateEvent, 'Wrapper': SWrapperForm })}
                />

                <CreateItem createText={localLib.photo} icon="camera"
                    onClick={e => PopupOpen(PopupWrapper, { e, 'type': 'photo', 'CreatePopup': CreatePhoto, 'Wrapper': SWrapperForm })}
                />

                <CreateItem createText={localLib.video} icon="video-camera"
                    onClick={e => PopupOpen(PopupWrapper, { e, 'type': 'video', 'CreatePopup': CreateVideo, 'Wrapper': SWrapperForm })}
                />
            </HeaderPopupsBody>
        </HeaderPopups>
    )   
}
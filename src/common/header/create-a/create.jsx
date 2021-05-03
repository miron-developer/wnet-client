import { useState } from 'react';

import { Library } from 'constants/language';
import { POSTRequestWithParams } from 'functions/api';
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

const types = {
    'post': Library.getText('common.header.create-a.createItems.post'),
    'event': Library.getText('common.header.create-a.createItems.event'),
    'group': Library.getText('common.header.create-a.createItems.group'),
}

const onSubmit = async(e, history, type, getParams = new Promise(), valErr, setText = ()=>{}, onSuccessCreate = ()=>{}) => {
    e.preventDefault();

    if (valErr) return setText(valErr);
    setText('');
   
    const params = await getParams;
    const res = await POSTRequestWithParams('/s/'+type, params);
    if (res.err !== 'ok') return setText(Library.getText('common.header.create-a.canNotSaved') + " " + res.err);

    onSuccessCreate(res.data);
    ClosePopup();
    history.push('/' + Library.getText('common.routes.'+type) + '/' + res.data[0]);
}

const PopupWrapper = ({ e, type, CreatePopup, Wrapper }) => {
    e.stopPropagation();

    return (
        <SCreateWrapper>
            <SCreateTitle> {Library.getText('common.header.create-a.create') + ' ' + types[type]} </SCreateTitle>
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
                <CreateItem createText={Library.getText('common.header.create-a.createItems.post')}  icon="sticky-note" 
                    onClick={e => PopupOpen(PopupWrapper, { e, 'type': 'post', 'CreatePopup': CreatePost, 'Wrapper': SWrapperForm })}
                />

                <CreateItem createText={Library.getText('common.header.create-a.createItems.group')} icon="users" 
                    onClick={e => PopupOpen(PopupWrapper, { e, 'type': 'group', 'CreatePopup': CreateGroup, 'Wrapper': SWrapperForm })}
                />

                <CreateItem createText={Library.getText('common.header.create-a.createItems.event')} icon="calendar"
                    onClick={e => PopupOpen(PopupWrapper, { e, 'type': 'event', 'CreatePopup': CreateEvent, 'Wrapper': SWrapperForm })}
                />

                <CreateItem createText="photo" icon="camera"
                    onClick={e => PopupOpen(PopupWrapper, { e, 'type': 'photo', 'CreatePopup': CreatePhoto, 'Wrapper': SWrapperForm })}
                />

                <CreateItem createText="video" icon="video-camera"
                    onClick={e => PopupOpen(PopupWrapper, { e, 'type': 'video', 'CreatePopup': CreateVideo, 'Wrapper': SWrapperForm })}
                />
            </HeaderPopupsBody>
        </HeaderPopups>
    )   
}
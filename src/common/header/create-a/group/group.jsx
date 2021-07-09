import { useState } from "react";
import { useHistory } from "react-router";

import { Library } from "constants/language";
import { useInput } from "functions/form";
import { PreloadFile, UploadFile } from "functions/file";
import Input from "common/form-input/input";
import ChooseList from 'common/choose-list/list';
import SubmitBtn from "common/submit-btn/submit";

import TypeBtns from 'common/header/create-a/type-btns/btns';
import TypeBtnsHints from 'common/header/create-a/type-btns-hints/hints';
import FieldTextarea from 'common/header/create-a/field-textarea/textarea';
import styled from "styled-components";

const SUploadAvaWrapper = styled.div`
    width: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1rem;
    color: var(--onHoverColor);
    cursor: pointer;

    & img {
        width: 100%;
        height: 100%;
    }
`;

const localLib = {
    'fillTitle': Library.getText('common.header.create-a.fillTitle'),
    'fillDescription': Library.getText('common.header.create-a.fillDescription'),
    'clickToChange': Library.getText('account.gallery.upload.clickToChange'),
    'avatar': Library.getText('account.settings.account.avatar'),
    'title': Library.getText('common.event-item.event.title'),
    'post': Library.getText('common.header.create-a.createItems.post'),
    'public': Library.getText('account.settings.account.public'),
    'private': Library.getText('account.settings.account.private'),
    'publicHint': Library.getText('common.header.create-a.group.publicHint'),
    'privateHint': Library.getText('common.header.create-a.group.privateHint'),
    'description': Library.getText('profile.data.description'),
    'create': Library.getText('common.header.create-a.create'),
}

const customValidation = (title, description) => {
    if (title.length <= 0) return localLib.fillTitle;
    if (description.length <= 0) return localLib.fillDescription;
}

const getParams = async(groupType, title, description, avatarFile, choosenFollowers = [], setText) => {
    const params = {
        'type': 'group',
        'groupType': groupType,
        'title': title,
        'description': description,
    }
    if (choosenFollowers.length > 0) params['choosenFollowers'] = choosenFollowers.map(flwr => flwr.id);
    
    if (avatarFile instanceof File) {
        const avaSrc = await UploadFile('image', avatarFile, 'group');
        if (avaSrc) params['avatar'] = avaSrc.src;
    }
    return params;
}

export default function CreateGroup({ Wrapper, onSubmit = ()=>{} }) {
    const title = useInput('');
    const description = useInput('');
    const history = useHistory();
    const [groupType, setGroupType] = useState(0);
    const [avatarFile, setAvatarFile] = useState({});
    const [avatarSrc, setAvatarSrc] = useState('/img/default-avatar.png');
    const [choosenFollowers, setChoosenFollowers] = useState([]);
    
    const addChoosens = (id) => setChoosenFollowers([...choosenFollowers, { 'id': id }]);
    const removeChoosens = (id) => setChoosenFollowers(choosenFollowers.filter(flwr => flwr.id !== id));

    const preloadCB = (file, src) => setAvatarSrc(src) || setAvatarFile(file);

    return (
        <Wrapper onSubmit={ e =>
            onSubmit(
                e, history, 'group', 
                getParams(groupType, title.base.value, description.base.value, avatarFile, choosenFollowers),
                customValidation(title.base.value, description.base.value),
            )        
        }>

            <SUploadAvaWrapper>
                <span>{localLib.avatar}: ({localLib.clickToChange})</span>
                <div className="ava-change" onClick={() => PreloadFile('image/*', preloadCB)}>
                    <img src={avatarSrc} alt="group avatar"/>
                </div>
            </SUploadAvaWrapper>

            <Input type="text" base={title.base} labelText={localLib.title + ":"} 
                minLength="9" maxLength="30" placeholder="My journay" 
            />

            <TypeBtns title={localLib.post} type={groupType}
                btns={[{
                    'id': 'create-group-public',
                    'btnType': 0,
                    'text': localLib.public,
                    'onChange': () => setGroupType(0),
                }, {
                    'id': 'create-group-private',
                    'btnType': 1,
                    'text': localLib.private,
                    'onChange': () => setGroupType(1),
                }]}
            />

            <TypeBtnsHints hints={[localLib.publicHint, localLib.privateHint]} />

            <ChooseList type="users" choosenList={choosenFollowers} add={addChoosens} remove={removeChoosens} 
                title="Choose followers to invite:" params={{'type':'followers', 'flwType': 'all'}}
            /> 
            
            <FieldTextarea title={localLib.description} textareaBase={description.base} />

            <SubmitBtn value={localLib.create + "!"} />
        </Wrapper>
    )
}
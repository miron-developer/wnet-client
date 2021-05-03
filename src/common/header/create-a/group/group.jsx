import { useState } from "react";
import { withRouter } from "react-router";

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

const SNoteText = styled.div`
    position: fixed;
    right: 12vw;
    top: 50%;
    color: var(--onHoverColor);
    background: red;
    padding: .5rem;
    border-radius: 5px;
`;


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

const customValidation = (title, description) => {
    if (title.length <= 0) return Library.getText('common.header.create-a.event.fillTitle');
    if (description.length <= 0) return Library.getText('common.header.create-a.event.fillDescription');
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

const CreateGroup = ({ Wrapper, history, onSubmit = ()=>{} }) => {
    const title = useInput('');
    const description = useInput('');
    const [groupType, setGroupType] = useState(0);
    const [avatarFile, setAvatarFile] = useState({});
    const [avatarSrc, setAvatarSrc] = useState('/img/default-avatar.png');
    const [choosenFollowers, setChoosenFollowers] = useState([]);
    const [noteText, setText] = useState('');

    const addChoosens = (id) => setChoosenFollowers([...choosenFollowers, { 'id': id }]);
    const removeChoosens = (id) => setChoosenFollowers(choosenFollowers.filter(flwr => flwr.id !== id));

    const preloadCB = (file, src) => setAvatarSrc(src) || setAvatarFile(file);

    return (
        <Wrapper onSubmit={ e =>
            onSubmit(
                e, history, 'group', 
                getParams(groupType, title.base.value, description.base.value, avatarFile, choosenFollowers, setText),
                customValidation(title.base.value, description.base.value),
                setText
            )        
        }>
            { noteText.length === 0 ? null : <SNoteText>{noteText}</SNoteText> }

            <SUploadAvaWrapper>
                <span>{Library.getText('profile-path.settings.account.avatar')}: ({Library.getText('profile-path.gallery.upload.clickToChange')})</span>
                <div className="ava-change" onClick={() => PreloadFile('image/*', preloadCB)}>
                    <img src={avatarSrc} alt="group avatar"/>
                </div>
            </SUploadAvaWrapper>

            <Input type="text" base={title.base} labelText={Library.getText('common.event-item.event.title') + ":"} 
                minLength="9" maxLength="30" placeholder="My journay" 
            />

            <TypeBtns title={Library.getText('common.header.create-a.createItems.post')} type={groupType}
                btns={[{
                    'id': 'create-group-public',
                    'btnType': 0,
                    'text': Library.getText('profile-path.settings.account.public'),
                    'onChange': () => setGroupType(0),
                }, {
                    'id': 'create-group-private',
                    'btnType': 1,
                    'text': Library.getText('profile-path.settings.account.private'),
                    'onChange': () => setGroupType(1),
                }]}
            />

            <TypeBtnsHints hints={[
                Library.getText('common.header.create-a.group.publicHint'),
                Library.getText('common.header.create-a.group.privateHint'),
            ]} />

            <ChooseList type="users" choosenList={choosenFollowers} add={addChoosens} remove={removeChoosens} 
                title="Choose followers to invite:" params={{'type':'followers', 'flwType': 'all'}}
            /> 
            
            <FieldTextarea title={Library.getText('profile.data.description')} textareaBase={description.base} />

            <SubmitBtn value={Library.getText('common.header.create-a.create') + "!"} />
        </Wrapper>
    )
}

export default withRouter(CreateGroup);
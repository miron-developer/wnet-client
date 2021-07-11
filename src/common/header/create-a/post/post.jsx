import { useState } from "react";
import { useHistory } from "react-router";

import { Library } from "constants/language";
import { useInput } from "functions/form";
import { DefineType, PreloadFile, UploadFile } from "functions/file";
import { Notify } from "common/app-notification/notification";
import Input from "common/form-input/input";
import ChooseList from 'common/choose-list/list';
import PreloadedFilesPlash from 'common/preloaded-files-plash/plash';
import SubmitBtn from "common/submit-btn/submit";

import TypeBtns from 'common/header/create-a/type-btns/btns';
import TypeBtnsHints from 'common/header/create-a/type-btns-hints/hints';
import FieldTextarea from 'common/header/create-a/field-textarea/textarea';
import styled from "styled-components";

const SClippedFiles = styled.div`
    position: relative;
    display: flex;
    margin-top: 10rem;

    & .clip-file {
        cursor: pointer;
    }
`;

const localLib = {
    'fillTitle': Library.getText('common.header.create-a.fillTitle'),
    'fillDescription': Library.getText('common.header.create-a.fillDescription'),
    'notChoosenGroup': Library.getText('common.header.create-a.notChoosenGroup'),
    'post': Library.getText('common.header.create-a.createItems.post'),
    'nameTitle': Library.getText('common.event-item.event.title'),
    'create': Library.getText('common.header.create-a.create'),
    'created': Library.getText('common.header.create-a.created'),
    'postFor': Library.getText('common.header.create-a.post.postFor'),
    'public': Library.getText('account.settings.account.public'),
    'private': Library.getText('account.settings.account.private'),
    'almostPrivate': Library.getText('common.header.create-a.post.almostPrivate'),
    'publicHint': Library.getText('common.header.create-a.post.publicHint'),
    'privateHint': Library.getText('common.header.create-a.post.privateHint'),
    'almostPrivateHint': Library.getText('common.header.create-a.post.almostPrivateHint'),
    'chooseGroups': Library.getText('common.header.create-a.chooseGroup'),
    'chooseFollowers': Library.getText('common.header.create-a.chooseFollowers'),
    'description': Library.getText('profile.data.description'),
    'clipFile': Library.getText('common.header.create-a.post.clipFile'),
    'me': Library.getText('common.header.create-a.forMe'),
    'group': Library.getText('common.header.create-a.forGroup'),
}

const customValidation = (title, body, whichPost, choosenGroups = []) => {
    if (title.length <= 0) return localLib.fillTitle;
    if (body.length <= 0) return localLib.fillDescription;
    if (whichPost === "group" && choosenGroups.length === 0) return localLib.notChoosenGroup;
}

const getParams = async(postType, title, body, whichPost, choosenFollowers = [], choosenGroups = [], isHaveClippedFiles = false) => {
    const params = {
        'type': 'post',
        'title': title,
        'postType': postType,
        'which': whichPost,
        'body': body,
        'isHaveClippedFiles': isHaveClippedFiles ? 1 : 0,
    }
    if (whichPost === "group") params['choosenGroups'] = choosenGroups.map(group => group.id);
    if (postType === 'almost_private') params['choosenFollowers'] = choosenFollowers.map(flwr => flwr.id);
    return params;
}

const onSuccessCreate = (ids = [], preloadedFiles = []) => {
    ids.forEach(async(id) => {
        await Promise.all(preloadedFiles.map(file => UploadFile(file.type, file.file, 'post', id)));
        Notify('success', localLib.created)
    })
}

export default function CreatePost({ Wrapper, onSubmit = ()=>{} }) {
    const title = useInput('');
    const body = useInput('');
    const history = useHistory();
    const [postType, setPostType] = useState('public');
    const [whichPost, setWhichPost] = useState('my');
    const [preloadedFiles, setPreloadedFiles] = useState([]);
    const [choosenFollowers, setChoosenFollowers] = useState([]);
    const [choosenGroups, setChoosenGroups] = useState([]);
    
    const removeFile = filename => setPreloadedFiles(preloadedFiles.filter(file => file.filename !== filename));
    const addChoosens = (type, id) => {
        if (type === "groups") 
            return setChoosenGroups([...choosenGroups, { 'id': id }]);
        setChoosenFollowers([...choosenFollowers, { 'id': id }]);
    }
    const removeChoosens = (type, id) => {
        if (type === "groups")
            return setChoosenGroups(choosenGroups.filter(group => group.id !== id));
        setChoosenFollowers(choosenFollowers.filter(flwr => flwr.id !== id));
    }

    const preloadCB = (file, src, type) => {
        setPreloadedFiles([...preloadedFiles, {
            'type': DefineType(type),
            'file': file,
            'src': src,
            'filename': file.name,
        }]);
    }

    return (
        <Wrapper onSubmit={e => 
            onSubmit(
                e, history, 'post', 
                getParams(postType, title.base.value, body.base.value, whichPost, choosenFollowers, choosenGroups, preloadedFiles.length > 0),
                customValidation(title.base.value, body.base.value, whichPost, choosenGroups),
                (id) => onSuccessCreate(id, preloadedFiles),
            )
        }>
            <Input type="text" base={title.base} labelText={localLib.nameTitle + ":"} 
                minLength="9" maxLength="30" placeholder="My journay" 
            />
           
            <TypeBtns title={localLib.post} type={postType}
                btns={[{
                    'id': 'create-post-public',
                    'btnType': 'public',
                    'text': localLib.public,
                    'onChange': () => setPostType('public'),
                }, {
                    'id': 'create-post-private',
                    'btnType': 'private',
                    'text': localLib.private,
                    'onChange': () => setPostType('private'),
                }, {
                    'id': 'create-post-almostPrivate',
                    'btnType': 'almost_private',
                    'text': localLib.almostPrivate,
                    'onChange': () => setPostType('almost_private'),
                }]}
            />

            { 
                postType === 'almost_private' 
                    ? <ChooseList type="users" choosenList={choosenFollowers} add={id => addChoosens("followers", id)} remove={id => removeChoosens("followers", id)} 
                        title={localLib.chooseFollowers} params={{'type':'followers', 'flwType': 'all'}}
                    /> 
                    : null
            }

            <TypeBtnsHints hints={[localLib.publicHint, localLib.privateHint, localLib.almostPrivateHint]} />

            <TypeBtns title={localLib.postFor} type={whichPost}
                btns={[{
                    'id': 'my-post',
                    'btnType': 'my',
                    'text': localLib.me,
                    'onChange': () => setWhichPost('my'),
                }, {
                    'id': 'group-post',
                    'btnType': 'group',
                    'text': localLib.group,
                    'onChange': () => setWhichPost('group'),
                }]}
            />

            { 
                whichPost === 'group' 
                    ? <ChooseList type="groups" choosenList={choosenGroups} params={{'type': 'all'}}
                        title={localLib.chooseGroups}
                        add={id => addChoosens("groups", id)} remove={id => removeChoosens("groups", id)} 
                    /> 
                    : null
            }

            <FieldTextarea title={localLib.description} textareaBase={body.base} />

            <SClippedFiles>
                <div className="clip-file-wrapper" onClick={e => e.stopPropagation() || PreloadFile('*', preloadCB)}>
                    <div className="clip-file">
                        <img src="/img/clip.png" alt="clip file"/>
                    </div>
                    <span>{localLib.clipFile}</span>
                </div>
                <PreloadedFilesPlash preloadedFiles={preloadedFiles} removeFile={removeFile} />
            </SClippedFiles>

            <SubmitBtn value={localLib.create + "!"} />
        </Wrapper>
    )
}
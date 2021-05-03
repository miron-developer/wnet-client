import { useState } from "react";
import { withRouter } from "react-router";

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

const SNoteText = styled.div`
    position: fixed;
    right: 12vw;
    top: 50%;
    padding: .5rem;
    color: var(--onHoverColor);
    background: red;
    border-radius: 5px;
`;

const customValidation = (title, body, whichPost, choosenGroups = []) => {
    if (title.length <= 0) return Library.getText('common.header.create-a.event.fillTitle');
    if (body.length <= 0) return Library.getText('common.header.create-a.event.fillDescription');
    if (whichPost === "group" && choosenGroups.length === 0) return "no selected group/s"
}

const getParams = async(postType, title, body, whichPost, choosenFollowers = [], choosenGroups = []) => {
    const params = {
        'type': 'post',
        'title': title,
        'postType': postType,
        'which': whichPost,
        'body': body,
    }
    if (whichPost === "group") params['choosenGroups'] = choosenGroups.map(group => group.id);
    if (postType === 'almost_private') params['choosenFollowers'] = choosenFollowers.map(flwr => flwr.id);
    return params;
}

const onSuccessCreate = (ids = [], preloadedFiles = []) => {
    ids.forEach(async(id) => {
        await Promise.all(preloadedFiles.map(file => UploadFile(file.type, file.file, 'post', id)));
        Notify('success', 'Post created')
    })
    
}

const CreatePost = ({ Wrapper, history, onSubmit = ()=>{} }) => {
    const title = useInput('');
    const body = useInput('');
    const [postType, setPostType] = useState('public');
    const [whichPost, setWhichPost] = useState('my');
    const [preloadedFiles, setPreloadedFiles] = useState([]);
    const [choosenFollowers, setChoosenFollowers] = useState([]);
    const [choosenGroups, setChoosenGroups] = useState([]);
    const [noteText, setText] = useState('');

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
                getParams(postType, title.base.value, body.base.value, whichPost, choosenFollowers, choosenGroups),
                customValidation(title.base.value, body.base.value, whichPost, choosenGroups),
                setText,
                (id) => onSuccessCreate(id, preloadedFiles),
            )
        }>
            { noteText.length === 0 ? null : <SNoteText>{noteText}</SNoteText> }

            <Input type="text" base={title.base} labelText={Library.getText('common.event-item.event.title') + ":"} 
                minLength="9" maxLength="30" placeholder="My journay" 
            />
           
            <TypeBtns title={Library.getText('common.header.create-a.createItems.post')} type={postType}
                btns={[{
                    'id': 'create-post-public',
                    'btnType': 'public',
                    'text': Library.getText('profile-path.settings.account.public'),
                    'onChange': () => setPostType('public'),
                }, {
                    'id': 'create-post-private',
                    'btnType': 'private',
                    'text': Library.getText('profile-path.settings.account.private'),
                    'onChange': () => setPostType('private'),
                }, {
                    'id': 'create-post-almostPrivate',
                    'btnType': 'almost_private',
                    'text': Library.getText('common.header.create-a.post.almostPrivate'),
                    'onChange': () => setPostType('almost_private'),
                }]}
            />

            { 
                postType === 'almost_private' 
                    ? <ChooseList type="users" choosenList={choosenFollowers} add={id => addChoosens("followers", id)} remove={id => removeChoosens("followers", id)} 
                        title="Choose followers, that you want to grant access:" params={{'type':'followers', 'flwType': 'all'}}
                    /> 
                    : null
            }

            <TypeBtnsHints hints={[
                Library.getText('common.header.create-a.post.publicHint'),
                Library.getText('common.header.create-a.post.privateHint'),
                Library.getText('common.header.create-a.post.almostPrivateHint'),
            ]} />

            <TypeBtns title="post for" type={whichPost}
                btns={[{
                    'id': 'my-post',
                    'btnType': 'my',
                    'text': "Me",
                    'onChange': () => setWhichPost('my'),
                }, {
                    'id': 'group-post',
                    'btnType': 'group',
                    'text': "Group",
                    'onChange': () => setWhichPost('group'),
                }]}
            />

            { 
                whichPost === 'group' 
                    ? <ChooseList type="groups" choosenList={choosenGroups} params={{'type': 'all'}}
                        title="Choose groups, where you want to publish the post:"
                        add={id => addChoosens("groups", id)} remove={id => removeChoosens("groups", id)} 
                    /> 
                    : null
            }

            <FieldTextarea title={Library.getText('profile.data.description')} textareaBase={body.base} />

            <SClippedFiles>
                <div className="clip-file-wrapper" onClick={e => e.stopPropagation() || PreloadFile('*', preloadCB)}>
                    <div className="clip-file">
                        <img src="/img/clip.png" alt="clip file"/>
                    </div>
                    <span>{Library.getText('common.header.create-a.post.clipFile')}</span>
                </div>
                <PreloadedFilesPlash preloadedFiles={preloadedFiles} removeFile={removeFile} />
            </SClippedFiles>

            <SubmitBtn value={Library.getText('common.header.create-a.create') + "!"} />
        </Wrapper>
    )
}

export default withRouter(CreatePost);
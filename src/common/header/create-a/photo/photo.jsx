import { useState } from "react";
import { useHistory } from "react-router";

import { Library } from "constants/language";
import { useInput } from "functions/form";
import { PreloadFile, UploadFile } from "functions/file";
import { Notify } from "common/app-notification/notification";
import Input from "common/form-input/input";
import ChooseList from 'common/choose-list/list';
import SubmitBtn from "common/submit-btn/submit";

import TypeBtns from 'common/header/create-a/type-btns/btns';
import styled from "styled-components";

const SUploadPlash = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1rem;
`;

const SUploadResWrapper = styled(SUploadPlash)`
    width: auto;
`;

const SUploadRes = styled.div`
    & > * {
        width: 100%;
        height: 100%;
    }
`;

const localLib = {
    'titleRequired': Library.getText('account.gallery.upload.titleRequired'),
    'notChoosenGroup': Library.getText('common.header.create-a.notChoosenGroup'),
    'choosePhoto': Library.getText('common.header.create-a.photo.choosePhoto'),
    'notSaveFile': Library.getText('common.clips.clips.notSaveFile'),
    'clickToChange': Library.getText('account.gallery.upload.clickToChange'),
    'nameTitle': Library.getText('common.event-item.event.title'),
    'create': Library.getText('common.header.create-a.create'),
    'created': Library.getText('common.header.create-a.created'),
    'chooseGroups': Library.getText('common.header.create-a.chooseGroup'),
    'photoFor': Library.getText('common.header.create-a.photo.photoFor'),
    'me': Library.getText('common.header.create-a.forMe'),
    'group': Library.getText('common.header.create-a.forGroup'),
}

const customValidation = (title, mainPreloadSrc, whichPhoto, choosenGroups = []) => {
    if (title === "") return localLib.titleRequired;
    if (whichPhoto === "group" && choosenGroups.length === 0) return localLib.notChoosenGroup;
    if (mainPreloadSrc === "/img/default-avatar.png") return localLib.choosePhoto;
}

const getParams = async(title, mainFile, whichPhoto, choosenGroups = []) => {
    const params = {
        'title': title,
        'which': whichPhoto,
        'type': 'photo',
    };
    const mainSrc = await UploadFile("photo", mainFile, 'gallery');
    if (!mainSrc) return Notify('fail', localLib.notSaveFile);
    else params['src'] = mainSrc.src;

    if (whichPhoto === "group") params['choosenGroups'] = choosenGroups.map(group => group.id);
    return params;
}

const onSuccessCreate = () => Notify('success', localLib.created);

export default function CreatePhoto({ Wrapper, onSubmit = ()=>{} }) {
    const title = useInput('');
    const history = useHistory();
    const [mainFile, setMainFile] = useState();
    const [mainPreloadSrc, setMainSrc] = useState('/img/default-avatar.png');
    const [whichPhoto, setWhichPhoto] = useState('my');
    const [choosenGroups, setChoosenGroups] = useState([]);
    
    const preloadMain = (file, src) => setMainFile(file) || setMainSrc(src);

    const addChoosens = id => setChoosenGroups([...choosenGroups, { 'id': id }]);
    const removeChoosens = id => setChoosenGroups(choosenGroups.filter(group => group.id !== id));

    return (
        <Wrapper onSubmit={e => 
            onSubmit(
                e, history, 'photo', 
                getParams(title.base.value, mainFile, whichPhoto, choosenGroups),
                customValidation(title.base.value, mainPreloadSrc, whichPhoto, choosenGroups),
                onSuccessCreate,
            )
        }>
            <SUploadResWrapper>
                <span>Photo: ({localLib.clickToChange})</span>
                <SUploadRes onClick={() => PreloadFile('image/*', preloadMain)} >
                   <img src={mainPreloadSrc} alt="res"/>
                </SUploadRes>
            </SUploadResWrapper>

            <Input type="text" base={title.base} labelText={localLib.nameTitle + ":"} 
                minLength="9" maxLength="30" placeholder="My journay" 
            />

            <TypeBtns title={localLib.photoFor} type={whichPhoto}
                btns={[{
                    'id': 'my-photo',
                    'btnType': 'my',
                    'text': localLib.me,
                    'onChange': () => setWhichPhoto('my'),
                }, {
                    'id': 'group-photo',
                    'btnType': 'group',
                    'text': localLib.group,
                    'onChange': () => setWhichPhoto('group'),
                }]}
            />

            { 
                whichPhoto === 'group' 
                    ? <ChooseList type="groups" choosenList={choosenGroups} params={{'type': 'all'}}
                        title={localLib.chooseGroups}
                        add={addChoosens} remove={removeChoosens} 
                    /> 
                    : null
            }

            <SubmitBtn value={localLib.create + "!"} />
        </Wrapper>
    )
}
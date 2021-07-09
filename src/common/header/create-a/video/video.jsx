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
    'chooseVideo': Library.getText('common.header.create-a.video.chooseVideo'),
    'choosePoster': Library.getText('common.header.create-a.video.choosePoster'),
    'notSaveFile': Library.getText('common.clips.clips.notSaveFile'),
    'clickToChange': Library.getText('account.gallery.upload.clickToChange'),
    'nameTitle': Library.getText('common.event-item.event.title'),
    'poster': Library.getText('account.gallery.upload.poster'),
    'create': Library.getText('common.header.create-a.create'),
    'created': Library.getText('common.header.create-a.created'),
    'chooseGroups': Library.getText('common.header.create-a.chooseGroup'),
    'videoFor': Library.getText('common.header.create-a.video.videoFor'),
    'me': Library.getText('common.header.create-a.forMe'),
    'group': Library.getText('common.header.create-a.forGroup'),
}

const customValidation = (title, mainPreloadSrc, posterPreloadSrc, whichPhoto, choosenGroups = []) => {
    if (title === "") return localLib.titleRequired;
    if (whichPhoto === "group" && choosenGroups.length === 0) return localLib.notChoosenGroup;
    if (mainPreloadSrc === "/img/default-avatar.png") return localLib.chooseVideo
    if (posterPreloadSrc === "/img/default-avatar.png") return localLib.choosePoster;
}

const getParams = async(title, mainFile, posterFile, whichVideo, choosenGroups = []) => {
    const params = {
        'title': title,
        'which': whichVideo,
        'type': 'video',
    };
    const mainSrc = await UploadFile("video", mainFile, 'gallery');
    if (!mainSrc) return Notify('fail', localLib.notSaveFile);
    else params['src'] = mainSrc.src;

    const posterSrc = await UploadFile("photo", posterFile, 'gallery');
    if (!posterSrc) return Notify('fail', localLib.notSaveFile);
    params['preview'] = posterSrc.src;

    if (whichVideo === "group") params['choosenGroups'] = choosenGroups.map(group => group.id);
    return params;
}

const onSuccessCreate = () => Notify('success', localLib.created);

export default function CreateVideo({ Wrapper, onSubmit = ()=>{} }) {
    const title = useInput('');
    const history = useHistory();
    const [mainFile, setMainFile] = useState();
    const [posterFile, setPosterFile] = useState();
    const [mainPreloadSrc, setMainSrc] = useState('/video-ex.mp4');
    const [posterPreloadSrc, setPosterSrc] = useState('/img/default-avatar.png');
    const [whichVideo, setWhichVideo] = useState('my');
    const [choosenGroups, setChoosenGroups] = useState([]);
    
    const preloadMain = (file, src) => setMainFile(file) || setMainSrc(src);
    const preloadPoster = (file, src) => setPosterFile(file) || setPosterSrc(src);

    const addChoosens = id => setChoosenGroups([...choosenGroups, { 'id': id }]);
    const removeChoosens = id => setChoosenGroups(choosenGroups.filter(group => group.id !== id));

    return (
        <Wrapper onSubmit={e => 
            onSubmit(
                e, history, 'video', 
                getParams(title.base.value, mainFile, posterFile,  whichVideo, choosenGroups),
                customValidation(title.base.value, mainPreloadSrc, posterPreloadSrc, whichVideo, choosenGroups),
                onSuccessCreate,
            )
        }>
            <SUploadResWrapper>
                <span>Video: ({localLib.clickToChange})</span>
                <SUploadRes onClick={() => PreloadFile('video/*', preloadMain)} >
                <video src={mainPreloadSrc} controls></video>
                </SUploadRes>
            </SUploadResWrapper>

            <SUploadResWrapper> 
                <span>{localLib.poster}: ({localLib.clickToChange})</span>
                <SUploadRes onClick={() => PreloadFile('image/*', preloadPoster)} >
                    <img src={posterPreloadSrc}  alt="poster"/>
                </SUploadRes> 
            </SUploadResWrapper>

            <Input type="text" base={title.base} labelText={localLib.nameTitle + ":"} 
                minLength="9" maxLength="30" placeholder="My journay" 
            />

            <TypeBtns title={localLib.videoFor} type={whichVideo}
                btns={[{
                    'id': 'my-video',
                    'btnType': 'my',
                    'text': localLib.me,
                    'onChange': () => setWhichVideo('my'),
                }, {
                    'id': 'group-video',
                    'btnType': 'group',
                    'text': localLib.group,
                    'onChange': () => setWhichVideo('group'),
                }]}
            />

            { 
                whichVideo === 'group' 
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
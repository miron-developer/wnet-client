import { useState } from "react";
import { withRouter } from "react-router";

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

const SNoteText = styled.div`
    position: fixed;
    right: 12vw;
    top: 50%;
    padding: .5rem;
    color: var(--onHoverColor);
    background: red;
    border-radius: 5px;
`;

const customValidation = (title, mainPreloadSrc, posterPreloadSrc, whichPhoto, choosenGroups = []) => {
    if (title === "") return Library.getText('profile-path.gallery.upload.titleRequired');
    if (whichPhoto === "group" && choosenGroups.length === 0) return "no selected group";
    if (mainPreloadSrc === "/img/default-avatar.png") return "choose photo to upload";
    if (posterPreloadSrc === "/img/default-avatar.png") return "choose poster for video";
}

const getParams = async(title, mainFile, posterFile, whichVideo, choosenGroups = [], setText) => {
    const params = {
        'title': title,
        'which': whichVideo,
        'type': 'video',
    };
    const mainSrc = await UploadFile("video", mainFile, 'gallery');
    if (!mainSrc) return setText(Library.getText('common.clips.clips.notSaveFile'));
    else params['src'] = mainSrc.src;

    const posterSrc = await UploadFile("photo", posterFile, 'gallery');
    if (!posterSrc) return setText(Library.getText('common.clips.clips.notSaveFile'));
    params['preview'] = posterSrc.src;

    if (whichVideo === "group") params['choosenGroups'] = choosenGroups.map(group => group.id);
    return params;
}

const onSuccessCreate = () => {
   Notify('success', 'Video created')
}

const CreateVideo = ({ Wrapper, history, onSubmit = ()=>{} }) => {
    const title = useInput('');
    const [mainFile, setMainFile] = useState();
    const [posterFile, setPosterFile] = useState();
    const [mainPreloadSrc, setMainSrc] = useState('/video-ex.mp4');
    const [posterPreloadSrc, setPosterSrc] = useState('/img/default-avatar.png');
    const [whichVideo, setWhichVideo] = useState('my');
    const [choosenGroups, setChoosenGroups] = useState([]);
    const [noteText, setText] = useState('');

    const preloadMain = (file, src) => setMainFile(file) || setMainSrc(src);
    const preloadPoster = (file, src) => setPosterFile(file) || setPosterSrc(src);

    const addChoosens = id => setChoosenGroups([...choosenGroups, { 'id': id }]);
    const removeChoosens = id => setChoosenGroups(choosenGroups.filter(group => group.id !== id));

    return (
        <Wrapper onSubmit={e => 
            onSubmit(
                e, history, 'video', 
                getParams(title.base.value, mainFile, posterFile,  whichVideo, choosenGroups, setText),
                customValidation(title.base.value, mainPreloadSrc, posterPreloadSrc, whichVideo, choosenGroups),
                setText,
                onSuccessCreate,
            )
        }>
            { noteText.length === 0 ? null : <SNoteText>{noteText}</SNoteText> }

            <SUploadResWrapper>
                <span>Video: ({Library.getText('profile-path.gallery.upload.clickToChange')})</span>
                <SUploadRes onClick={() => PreloadFile('video/*', preloadMain)} >
                <video src={mainPreloadSrc} controls></video>
                </SUploadRes>
            </SUploadResWrapper>

            <SUploadResWrapper> 
                <span>{Library.getText('profile-path.gallery.upload.poster')}: ({Library.getText('profile-path.gallery.upload.clickToChange')})</span>
                <SUploadRes onClick={() => PreloadFile('image/*', preloadPoster)} >
                    <img src={posterPreloadSrc}  alt="poster"/>
                </SUploadRes> 
            </SUploadResWrapper>

            <Input type="text" base={title.base} labelText={Library.getText('common.event-item.event.title') + ":"} 
                minLength="9" maxLength="30" placeholder="My journay" 
            />

            <TypeBtns title="video for" type={whichVideo}
                btns={[{
                    'id': 'my-video',
                    'btnType': 'my',
                    'text': "Me",
                    'onChange': () => setWhichVideo('my'),
                }, {
                    'id': 'group-video',
                    'btnType': 'group',
                    'text': "Group",
                    'onChange': () => setWhichVideo('group'),
                }]}
            />

            { 
                whichVideo === 'group' 
                    ? <ChooseList type="groups" choosenList={choosenGroups} params={{'type': 'all'}}
                        title="Choose groups, where you want to load the photo:"
                        add={addChoosens} remove={removeChoosens} 
                    /> 
                    : null
            }

            <SubmitBtn value={Library.getText('common.header.create-a.create') + "!"} />
        </Wrapper>
    )
}

export default withRouter(CreateVideo);
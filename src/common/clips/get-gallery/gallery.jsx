import { useEffect, useRef, useState } from "react";

import { Library } from "constants/language";
import { CheckPermissions } from "functions/effects";
import { RandomKey } from "functions/content";
import { ClosePopup } from "common/popup/popup";
import { Notify } from "common/app-notification/notification";

import styled from "styled-components";

const SRecorderWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
`;

const SRecorderCamera = styled.div`
    width: 90%;
    height: 75%;
    margin: 1rem;
    background: black;

    & > * {
        width: 100%;
        height: 100%;
    }
`;

const SRecorderActions = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
`;

const SActionsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const SActionGetBtn = styled.div`
    display: flex;
    margin: 1rem;
    padding: 1rem;
    color: var(--onHoverColor);
    background: ${props => props.isActive ? 'var(--violetColor)' : 'var(--purpleColor)'};
    border-radius: 10px;
    box-shadow: var(--boxShadow);
    cursor: pointer;

    & > span {
        margin: .5rem;
    }
`;

const SActionResBtn = styled(SActionGetBtn)`
    background: ${props => props.isSave ? 'green' : 'red'};
`;

const SRecorderActionsBtn = styled(SActionGetBtn)`
    width: max-content;
    margin: 1rem auto;
    background: black;
`;

const recorderContext = {
    blob: {},
    chunks: [],
    recentSec: 3,
    recorder: undefined,
    imageCapture: undefined,
    mediaOptions: { mimeType: 'video/webm' },
}

const localLib = {
    'notHaveRecorderData': Library.getText('common.clips.gallery.notHaveRecordedData'),
    'areRecording': Library.getText('common.clips.gallery.areRecording'),
    'haveRecorderData': Library.getText('common.clips.gallery.haveRecordedData'),
    'notGrantedPermission': Library.getText('common.clips.gallery.notGrantedPermissions'),
    'save': Library.getText('common.clips.gallery.save'),
    'remove': Library.getText('common.clips.gallery.remove'),
}

const updateStreams = (newStream, updState) => {
    if (window.stream) window.stream.getTracks().forEach(t => t.stop());
    window.stream = newStream;
    updState(newStream);
}

const clearDatas = (setFinished) => {
    recorderContext.blob = {};
    recorderContext.chunks = [];
    recorderContext.recentSec = 3;
    setFinished(false);
}

const save = async(videoRef, type, addToPlash, setFinished) => {
    if (!recorderContext.blob || recorderContext.blob.size === 0 || !recorderContext.blob.size) return Notify('fail', localLib.notHaveRecordedData);
    const file = recorderContext.blob;
    file.name = 'recorder-' + type + Math.round(RandomKey());
    const filetype = file.type !== "" ? file.type.split('/')[0] : "video";

    addToPlash({
        'type': filetype,
        'file': file,
        'src': URL.createObjectURL(file),
        'filename': file.name,
    })

    videoRef.current = null;
    clearDatas(setFinished);
    ClosePopup();
}

const stopRecording = async(refDOM, isPhoto, stream) => {
    refDOM.srcObject = null;
    refDOM.src = null
    if (isPhoto) {
        recorderContext.blob = await recorderContext.imageCapture.takePhoto();
        refDOM.poster = URL.createObjectURL(recorderContext.blob);
    } else {
        recorderContext.blob = new Blob(recorderContext.chunks, recorderContext.mediaOptions);
        refDOM.src = URL.createObjectURL(recorderContext.blob);
        recorderContext.recorder.stop();
    }
    stream.getTracks().forEach(t => t.stop());
}

const startRecording = (isPhoto, stream) => {
    if (isPhoto) {
        const track = stream.getVideoTracks()[0];
        recorderContext.imageCapture = new ImageCapture(track);
    } else {
        const newRecorder = new MediaRecorder(stream, recorderContext.mediaOptions);
        newRecorder.addEventListener('dataavailable', e => e.data && e.data.size > 0 ? recorderContext.chunks.push(e.data) : null);
        newRecorder.start(10);
        recorderContext.recorder = newRecorder;
    }
}

const changeMode = (isRec, isFinished, value, upd) => {
    if (isRec) return Notify('info', localLib.areRecording);
    if (isFinished && (!recorderContext.blob || recorderContext.blob.size > 0)) return Notify('info', localLib.haveRecorderData);
    return upd(value);
}

const isAvailable = (stream, isRec) => {
    if (!stream) return;
    if (recorderContext.blob.size > 0 && !isRec) return Notify('info', localLib.haveRecorderData);
    return true;
}

const getShotIcon = (isPhoto, isRec) => {
    if (isPhoto) return 'circle';
    if (isRec) return 'stop';
    return 'play';
}

export default function GetPhotoAndVideo({ addToPlash }) {
    const [isRec, setIsRec] = useState(false);
    const [isFinished, setFinished] = useState(false);
    const [isPhoto, setPhoto] = useState(true);
    const [stream, setStream] = useState();

    const videoRef = useRef(null);
    const type = isPhoto ? 'photo' : 'video';

    const takePhoto = () => {
        if (!isAvailable(stream, isRec)) return;
        startRecording(isPhoto, stream);
        setIsRec(true);

        const interID = setInterval(() => {
            if (recorderContext.recentSec === 0) {
                setFinished(true);
                setIsRec(false)
                return clearInterval(interID);
            }
            Notify('info', recorderContext.recentSec);
            recorderContext.recentSec--;
        }, 1000);
        setTimeout(async() => await stopRecording(videoRef.current, isPhoto, stream), 3000);
    }

    const startStopRecVideo = async() => {
        if (!isAvailable(stream, isRec)) return;
        
        if (isRec) await stopRecording(videoRef.current, isPhoto, stream);
        else startRecording(isPhoto, stream);
        setIsRec(!isRec);
        setFinished(true);
    }

    useEffect(() => {
        if (videoRef.current && !isRec && !isFinished) {
            CheckPermissions(['camera', 'microphone']).then(isGranted => {
                if (!isGranted) return Notify('fail', localLib.notGrantedPermission);
                navigator.mediaDevices.getUserMedia({video: true, audio: true})
                    .then(cur_stream => {
                        if (!isFinished) videoRef.current.srcObject = cur_stream;
                        updateStreams(cur_stream, setStream);
                    });
            })
        }
    }, [isFinished, isRec, videoRef]);

    return (
        <SRecorderWrapper>
            <SRecorderCamera>
                <video ref={videoRef} autoPlay controls={!isPhoto} />
            </SRecorderCamera>

            <SRecorderActions>
                <SActionsWrapper>
                    <SActionGetBtn isActive={isPhoto} onClick={() => changeMode(isRec, isFinished, true, setPhoto)}>
                        <span><i className="fa fa-camera" aria-hidden="true"></i></span>
                        <span>{Library.getText('common.routes.photo')}</span>
                    </SActionGetBtn>

                    <SActionGetBtn isActive={!isPhoto} onClick={() => changeMode(isRec, isFinished, false, setPhoto)} >
                        <span><i className="fa fa-video-camera" aria-hidden="true"></i></span>
                        <span>{Library.getText('common.routes.video')}</span>
                    </SActionGetBtn>
                </SActionsWrapper>

                <div>
                    <SRecorderActionsBtn onClick={isPhoto ? takePhoto : startStopRecVideo} >
                        <i className={"fa fa-"+getShotIcon(isPhoto, isRec)} aria-hidden="true"></i>
                    </SRecorderActionsBtn>
                </div>

                <SActionsWrapper>
                    <SActionResBtn isSave={true} onClick={() => save(videoRef, type, addToPlash, setFinished)} >
                        <span><i className="fa fa-floppy-o" aria-hidden="true"></i></span>
                        <span>{localLib.save}</span>
                    </SActionResBtn>
                    <SActionResBtn isSave={false} onClick={() => clearDatas(setFinished)} >
                        <span><i className="fa fa-trash" aria-hidden="true"></i></span>
                        <span>{localLib.remove}</span>
                    </SActionResBtn>
                </SActionsWrapper>
            </SRecorderActions>
        </SRecorderWrapper>
    )
}
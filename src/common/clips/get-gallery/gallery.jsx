import { useEffect, useRef, useState } from "react";

import { Library } from "constants/language";
import { CheckPermissions } from "functions/effects";
import { ClosePopup } from "common/popup/popup";

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

let blob = {};
let chunks = [];
const options = { mimeType: 'video/webm' };

const updateStreams = (newStream, updState) => {
    if (window.stream) window.stream.getTracks().forEach(t => t.stop());
    window.stream = newStream;
    updState(newStream);
}

const clearDatas = (setFinished, setText) => {
    blob = {};
    chunks = [];
    setFinished(false);
    setText('');
}

const save = async(videoRef, type, addToPlash, setFinished, setText) => {
    if (!blob || blob.size === 0 || !blob.size) return setText(Library.getText('common.clips.gallery.notHaveRecordedData'));
    const file = blob;
    file.name = 'recorder-' + type + Math.round(Math.random() * 10000);
    const filetype = file.type !== "" ? file.type.split('/')[0] : "video";

    addToPlash({
        'type': filetype,
        'file': file,
        'src': URL.createObjectURL(file),
        'filename': file.name,
    })

    videoRef.current = null;
    clearDatas(setFinished, setText);
    ClosePopup();
}

const isStoppedRecording = async(refDOM, isPhoto, stream, imageCapture, recorder) => {
    refDOM.srcObject = null;
    refDOM.src = null
    if (isPhoto) {
        blob = await imageCapture.takePhoto();
        refDOM.poster = URL.createObjectURL(blob);
    } else {
        blob = new Blob(chunks, options);
        refDOM.src = URL.createObjectURL(blob);
        recorder.stop();
    }
    stream.getTracks().forEach(t => t.stop());
}

const isStartedRecording = (isPhoto, stream, setCapture, setRecorder) => {
    if (isPhoto) {
        const track = stream.getVideoTracks()[0];
        setCapture(new ImageCapture(track));
    } else {
        const newRecorder = new MediaRecorder(stream, options);
        newRecorder.addEventListener('dataavailable', e => e.data && e.data.size > 0 ? chunks.push(e.data) : null);
        newRecorder.start(10);
        setRecorder(newRecorder);
    }
}

const changeMode = (isRec, isFinished, value, upd, updNodeText) => {
    if (isRec) return updNodeText(Library.getText('common.clips.gallery.areRecording'));
    if (isFinished && (!blob || blob.size > 0)) return updNodeText(Library.getText('common.clips.gallery.haveRecordedData'));
    return upd(value);
}

export default function GetPhotoAndVideo({ addToPlash }) {
    const [isRec, setIsRec] = useState(false);
    const [isFinished, setFinished] = useState(false);
    const [stream, setStream] = useState();
    const [recorder, setRecorder] = useState();
    const [imageCapture, setCapture] = useState();
    const [isPhoto, setPhoto] = useState(true);
    const [noteText, setText] = useState('');

    const videoRef = useRef(null);
    const type = isPhoto ? 'photo' : 'video';

    const startStopRec = async() => {
        if (!stream) return;
        if (blob.size > 0 && !isRec) return setText(Library.getText('common.clips.gallery.haveRecordedData'));

        if (isRec) await isStoppedRecording(videoRef.current, isPhoto, stream, imageCapture, recorder);
        else isStartedRecording(isPhoto, stream, setCapture, setRecorder);

        setIsRec(!isRec);
        setFinished(true);
    }

    useEffect(() => {
        if (videoRef.current && !isRec) {
            CheckPermissions(['camera', 'microphone']).then(isGranted => {
                if (!isGranted) return setText(Library.getText('common.clips.gallery.notGrantedPermissions'));
                navigator.mediaDevices.getUserMedia({video: true, audio: true})
                .then(cur_stream => {
                    if (!isFinished) videoRef.current.srcObject = cur_stream;
                    updateStreams(cur_stream, setStream);
                });
            })
        }
    }, [isFinished, videoRef]);

    return (
        <SRecorderWrapper>
            <SRecorderCamera>
                <video ref={videoRef} autoPlay controls></video>
            </SRecorderCamera>

            <SRecorderActions>
                <SActionsWrapper>
                    <SActionGetBtn isActive={isPhoto} onClick={() => changeMode(isRec, isFinished, true, setPhoto, setText)}>
                        <span><i className="fa fa-camera" aria-hidden="true"></i></span>
                        <span>{Library.getText('common.routes.photo')}</span>
                    </SActionGetBtn>

                    <SActionGetBtn isActive={!isPhoto} onClick={() => changeMode(isRec, isFinished, false, setPhoto, setText)} >
                        <span><i className="fa fa-video-camera" aria-hidden="true"></i></span>
                        <span>{Library.getText('common.routes.video')}</span>
                    </SActionGetBtn>
                </SActionsWrapper>

                <div>
                    <SRecorderActionsBtn onClick={startStopRec} >
                        {
                            isRec
                            ? <i className="fa fa-stop" aria-hidden="true"></i>
                            : <i className="fa fa-play" aria-hidden="true"></i>
                        }
                    </SRecorderActionsBtn>

                    <span>{noteText}</span>
                </div>

                <SActionsWrapper>
                    <SActionResBtn isSave={true} onClick={() => save(videoRef, type, addToPlash, setFinished, setText)} >
                        <span><i className="fa fa-floppy-o" aria-hidden="true"></i></span>
                        <span>{Library.getText('common.clips.gallery.save')}</span>
                    </SActionResBtn>
                    <SActionResBtn isSave={false} onClick={() => clearDatas(setFinished, setText)} >
                        <span><i className="fa fa-trash" aria-hidden="true"></i></span>
                        <span>{Library.getText('common.clips.gallery.remove')}</span>
                    </SActionResBtn>
                </SActionsWrapper>
            </SRecorderActions>
        </SRecorderWrapper>
    )
}
import { useState } from "react";

import { Library } from "constants/language";
import { Notify } from "common/app-notification/notification";

let chunks = [];
const options = { mimeType: 'audio/webm' };

export default function SendAudioMessage({ Wrapper, send = ()=>{} }) {
    const [isRec, setIsRec] = useState(false);
    const [stream, setStream] = useState();
    const [recorder, setRecorder] = useState();

    const handleClick = ()=> {
        if (isRec) {
            recorder.stop();
            const blob = new Blob(chunks, options);
            blob.name = 'audio-msg';
            Notify('info', Library.getText('common.send-audio.finished'));
            send(blob);

            chunks = [];
            stream.getTracks().forEach(track => track.stop());
        } else {
            navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                const newRecorder = new MediaRecorder(stream, options);
                setRecorder(newRecorder);
                setStream(stream);

                newRecorder.addEventListener('dataavailable', e => e.data && e.data.size > 0 ? chunks.push(e.data) : null);

                newRecorder.start(10);
                Notify('info', Library.getText('common.send-audio.started'));
            });
        }
        setIsRec(!isRec);
    }

    return <Wrapper alt="audio-msg" srcIcon="/img/audio-msg.png" color={isRec ? 'red' : null} onClick={handleClick} />
}
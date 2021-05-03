import { useState } from 'react';

import { Library } from 'constants/language';
import { Notify } from 'common/app-notification/notification';

import styled from 'styled-components';

const SSpeechMicro = styled.div`
    font-size: 1.5rem;
    color: ${props => props.isStart ? 'var(--redColor)' : '#000000'};
    cursor: pointer;

    &.disabled {
        color: #8e8e8e;
        cursor: default;
    }
`;

const SR = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SR();
recognition.lang = 'ru-RU';
recognition.continuous = true;

const stopAfter = () => setTimeout(() => recognition.stop(), 5000);

export default function Speech({callback}) {
    const [isStart, setStart] = useState(false);

    if (!SR || !recognition) return null;
    const onClick = () => isStart ? recognition.stop() : recognition.start();

    recognition.onstart = () => setStart(true) || Notify('info', Library.getText('common.speech.onStart')) || stopAfter();
    recognition.onend = () => setStart(false) || Notify('info', Library.getText('common.speech.onEnd'));
    recognition.onerror = ({error}) => {
        if (error === "no-speech") return Notify('fail', Library.getText('common.speech.onErrorNoSpeech'));
        return Notify('fail', Library.getText('common.speech.onError'));
    }

    recognition.onresult = ({results}) => callback(results[0][0].transcript) || recognition.stop();

    return (
        <SSpeechMicro isStart={isStart} onClick={onClick}>
            <i className="fa fa-microphone" aria-hidden="true"></i>
        </SSpeechMicro>
    )
}
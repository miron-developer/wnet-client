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

const getSR = () => {
    if (SR) {
        const recognition = new SR();
        recognition.lang = 'ru-RU';
        recognition.continuous = true;        
        return recognition;
    }
}

const recognition = getSR();

const localLib = {
    'onStart': Library.getText('common.speech.onStart'),
    'onEnd': Library.getText('common.speech.onEnd'),
    'onErrorNoSpeech': Library.getText('common.speech.onErrorNoSpeech'),
    'onError': Library.getText('common.speech.onError'),
}

const stopAfter = () => setTimeout(() => recognition?.stop(), 5000);

export default function Speech({callback}) {
    const [isStart, setStart] = useState(false);

    if (!SR || !recognition) return null;
    const onClick = () => isStart ? recognition.stop() : recognition.start();

    recognition.onstart = () => setStart(true) || Notify('info', localLib.onStart) || stopAfter();
    recognition.onend = () => setStart(false) || Notify('info', localLib.onEnd);
    recognition.onerror = ({error}) => {
        if (error === "no-speech") return Notify('fail', localLib.onErrorNoSpeech);
        return Notify('fail', localLib.onError);
    }

    recognition.onresult = ({results}) => callback(results[0][0].transcript) || recognition.stop();

    return (
        <SSpeechMicro isStart={isStart} onClick={onClick}>
            <i className="fa fa-microphone" aria-hidden="true"></i>
        </SSpeechMicro>
    )
}
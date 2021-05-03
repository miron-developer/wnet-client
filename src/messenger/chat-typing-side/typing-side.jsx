import { useState } from 'react';

import Clips from 'common/clips/clips';

import { CreateMessage } from 'messenger/messenger-chat';
import SendAudioMessage from 'common/send-audio/msg';
import SendTextMessage from 'common/send-text/msg';
import styled from "styled-components";

const STypingSide = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    background: rgba(22, 2, 104, 0.5);
`;

const SOneBtn = styled.div`
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${props => props.color ? props.color : 'rgba(255, 255, 255, 0.38)'}; 
    border-radius: 50px;
    cursor: pointer;

    & img {
        width: 80%;
        height: 80%;
    }

    &:hover {
        background: var(--purpleColor);
    }
`;

const sendTextMsg = (value, preloadedFiles = [], updText = ()=>{}, setFiles = ()=>{}) => {
    if (value === "" && preloadedFiles.length === 0) return;
    if (preloadedFiles.length > 0) {
        preloadedFiles.forEach(file => CreateMessage(file.type, value, file.file));
        setFiles([]);
    } else {
        CreateMessage('text', value, null);
    }
    
    updText('');
}

const sendAudioMsg = (blob) => CreateMessage('audio', '', blob);

const OneBtn = ({color, alt, srcIcon, onClick}) => {
    return (
        <SOneBtn color={color} onClick={onClick}>
            <img src={srcIcon} alt={alt} />
        </SOneBtn>
    )
}

export default function ChatTypingSide() {
    const [preloadedFiles, setFiles] = useState([]);

    return (
        <STypingSide>
            <Clips Wrapper={OneBtn} preloadedFiles={preloadedFiles} setFiles={setFiles} />
            
            <SendTextMessage Wrapper={OneBtn} send={(value, updText) => sendTextMsg(value, preloadedFiles, updText, setFiles)} />
            <SendAudioMessage Wrapper={OneBtn} send={sendAudioMsg} />
        </STypingSide>
    )
}
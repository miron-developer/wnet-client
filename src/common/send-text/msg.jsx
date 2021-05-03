import { useEffect, useRef, useState } from "react";

import { useInput } from "functions/form";
import Smiles from 'common/smiles/smiles';

import styled from "styled-components";

const STypingWrapper = styled.div`
    position: relative;
    width: 60%;
    padding: 1rem;
    border-radius: 50px;
    background: rgba(255, 255, 255, 0.1);
`;

const STypingInput = styled.input`
    width: 100%;
    padding: .5rem 1rem;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 50px;
`;

const handleEnter = (e, callback = ()=>{}) => {
    if (!e.shiftKey && e.code === "Enter") {
        e.preventDefault();
        callback();
    }
}

const PutSmile = (inputRef, msg, smile, updText, updPosition) => {
    const left = msg.substring(0, inputRef.selectionStart);
    const right = msg.substring(inputRef.selectionStart);
    inputRef.focus();
    updPosition(left.length + smile.length);
    updText(left + smile + right);
}

export default function SendTextMsg({ Wrapper, send = ()=>{} }) {
    const inputRef = useRef(null);
    const [cursorPosition, setPosition] = useState();
    const msgText = useInput('');

    useEffect(() => inputRef.current.selectionEnd = cursorPosition, [cursorPosition]);
    
    return (
        <>
            <Smiles Wrapper={Wrapper} putFunction={smile => PutSmile(inputRef.current, msgText.base.value, smile, msgText.setCertainValue, setPosition)} />

            <STypingWrapper>
                <STypingInput ref={inputRef} type="text" {...msgText.base}
                    onKeyPress={e => handleEnter(e, () => send(msgText.base.value, msgText.setCertainValue))} 
                />
            </STypingWrapper>

            <Wrapper alt="send-msg"  srcIcon="/img/send-msg.png" 
                onClick={() => send(msgText.base.value, msgText.setCertainValue)} 
            />
        </>
    )
}
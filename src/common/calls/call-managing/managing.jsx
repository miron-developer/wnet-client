import { useState } from "react";

import styled from "styled-components";

const SCallManaging = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    justify-content: center;
    width: 100%;
    margin-top: auto;
    padding: 1rem;
`;

const SManagingBtns = styled.div`
    display: flex;
    align-items: center;
`;

const SManagingBtn = styled.div`
    position: relative;
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 .5rem;
    color: #000;
    font-size: 1.5rem;
    border-radius: 50px;
    background: ${props => props.isOn || props.decline ?  'red' : 'var(--onHoverColor)'};
    cursor: pointer;

    &:hover {
        filter: brightness(0.5);
    }

    & > i {
        transform: ${props => props.decline ? 'rotate(135deg)': ''};
    }
`;

const SOffSlash = styled.div`
    position: absolute;
    width: 100%;
    height: 3px;
    background: #000000;
    transform: rotate(45deg);
`;

const SFullScreen = styled.div`
    position: absolute;
    right: 1rem;
    width: 2rem;
    height: 2rem;
    cursor: pointer;

    & img {
        width: 100%;
        height: 100%;
    }
`;

const OneManagingBtn = ({icon, isOn, onClick}) => {
    return (
        <SManagingBtn isOn={isOn} decline={icon==="phone"} onClick={onClick}>
            {isOn ? <SOffSlash /> : null}
            <i className={'fa fa-'+icon}></i>
        </SManagingBtn>
    )
}

const GetState = (type, stream) => {
    const track = type === 'audio' ? stream.getAudioTracks()[0] : stream.getVideoTracks()[0];
    return track.enabled;
}

export default function CallManaging({stream, isFullSize, isOnShare, setOnScreen, AudioOnOff, VideoOnOff, ShareScreen, StopSharing, setIsFullSize, Decline}) {
    const [isOnVideo, setOnVideo] = useState(GetState('video', stream));
    const [isOnAudio, setOnAudio] = useState(GetState('audio', stream));

    return (
        <SCallManaging>
            <SManagingBtns>
                <OneManagingBtn 
                    icon="desktop"
                    isOn={isOnShare}
                    onClick={async() => {
                        const success = isOnShare ? StopSharing() : await ShareScreen();
                        if (success) setOnScreen(!isOnShare);
                    }} 
                />

                <OneManagingBtn 
                    icon="video-camera" 
                    isOn={isOnVideo}
                    onClick={() => VideoOnOff() || setOnVideo(!isOnVideo)} 
                />

                <OneManagingBtn
                    icon="microphone"
                    isOn={isOnAudio}
                    onClick={() => AudioOnOff() || setOnAudio(!isOnAudio)}
                />

                <OneManagingBtn
                    icon="phone"
                    onClick={Decline}
                />
            </SManagingBtns>

            <SFullScreen onClick={() => setIsFullSize(!isFullSize)}>
                <img src="/img/fullscreen.png" alt="full screen"/>
            </SFullScreen>
        </SCallManaging>
    )
}
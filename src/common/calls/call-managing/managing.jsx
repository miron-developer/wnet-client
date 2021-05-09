import { useState } from "react";

import CallActionsBtns from 'common/calls/call-action-btns/btns';
import styled from "styled-components";

const SCallManaging = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: auto;
    padding: 1rem;
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

const GetState = (type, stream) => {
    const track = type === 'audio' ? stream.getAudioTracks()[0] : stream.getVideoTracks()[0];
    return track.enabled;
}

export default function CallManaging({stream, isFullSize, isOnShare, AudioVideoOnOff, ShareScreen, StopShare, setIsFullSize, Decline}) {
    const [isOnVideo, setOnVideo] = useState(GetState('video', stream));
    const [isOnAudio, setOnAudio] = useState(GetState('audio', stream));

    return (
        <SCallManaging>
            <CallActionsBtns btns={[{
                icon: "desktop",
                type: isOnShare ? 'off' : 'on',
                isNeedSlash: isOnShare,
                onClick: async() => isOnShare ? StopShare() : await ShareScreen(),
            },{
                icon: "video-camera",
                type: isOnVideo ? 'off' : 'on',
                isNeedSlash: isOnVideo,
                onClick: () => AudioVideoOnOff('video', stream) || setOnVideo(!isOnVideo),
            },{
                icon: "microphone",
                type: isOnAudio ? 'off' : 'on',
                isNeedSlash: isOnAudio,
                onClick: () => AudioVideoOnOff('audio', stream) || setOnAudio(!isOnAudio),
            },{
                type: 'off',
                isDecline: true,
                onClick: Decline,
            }]}
            />

            <SFullScreen onClick={() => setIsFullSize(!isFullSize)}>
                <img src="/img/fullscreen.png" alt="full screen"/>
            </SFullScreen>
        </SCallManaging>
    )
}
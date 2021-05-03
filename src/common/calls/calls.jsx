import { useState } from "react";

import { Library } from "constants/language";
import { SendWSMessage } from "functions/ws";
import { CheckPermissions } from "functions/effects";
import { Notify } from "common/app-notification/notification";

import CallNotification from 'common/calls/call-notification/notification';
import CallVideo from 'common/calls/call-video/video';
import CallManaging from 'common/calls/call-managing/managing';
import styled from "styled-components";
import { USER } from "constants/constants";

const SCalls = styled.div`
    position: ${props => props.isOpened ? 'fixed' : 'unset'};
    left: 0;
    top: 0;
    z-index: ${props => props.isOpened ? '10' : '-10'};
    display: flex;
    flex-direction: column;
    width: ${props => props.isOpened ? '100%' : '0'};
    height: ${props => {
        if (props.isFullSize) return '100%';
        return 'max-content';
    }};
    background: #0404045e;
`;

const SVideos = styled.div`
    display: grid;
    grid-template-areas:
        "my main"
        "user main";
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 20% 80%;
    grid-gap: 2rem;
    padding: 1rem;
`;

/* global Peer */
const MyPeer = {
    conn: undefined,
    myPeerID: undefined,
    opponentPeerID : undefined,
    shareStream: undefined,
    userID: undefined,
}

const ZeroMyPeer = () => {
    if (MyPeer.conn) MyPeer.conn.disconnect();
    MyPeer.conn = undefined;
    MyPeer.myPeerID = undefined;
    MyPeer.opponentPeerID = undefined;
    MyPeer.userID = undefined;
    if (MyPeer.shareStream) MyPeer.shareStream.getTracks().forEach(track => track.stop());
    Object.values(peers).forEach(call => call.close());
}

const peers = {};
export const CloseCalls = () => {
    Object.values(peers).forEach(call => call.close());
}

let setState;

let addVideos;
let removeVideo;
let changeUserPlace;

const AudioVideoOnOff = (type, stream) => {
    if (!stream || !type) return Notify('fail', Library.getText('common.calls.calls.audioVideoOnOffFail'))
    const track = type === 'audio' ? stream.getAudioTracks()[0] : stream.getVideoTracks()[0];
    track.enabled = !track.enabled;
}

const getScreenShareStream = async() => {
    if (navigator.userAgent.indexOf("Firefox") === -1 && !(await CheckPermissions(['camera', 'microphone']))) return null;
    return await navigator.mediaDevices.getDisplayMedia(
        {
            video: {
                cursor: "always"
            },
            audio: {
                echoCancellation: true,
                noiseSuppression: true,
                sampleRate: 44100,
            }
        }
    );
}

const getUserMediaStream = async(type) => {
    if (navigator.userAgent.indexOf("Firefox") === -1 && !(await CheckPermissions(['camera', 'microphone']))) return null;
    console.log('checked permission', type);
    const stream = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
    console.log('get stream', stream);
    if (type === 'audio') AudioVideoOnOff('video', stream);
    else AudioVideoOnOff('audio', stream);
    return stream;
}

const HandleShareCall = (type, call, stream) => {
    const remove = () => {
        removeVideo('main');
        changeUserPlace('user', 'main');
        setState('onShare', false);
    }

    changeUserPlace('main', 'user');
    
    let shareStream = stream;
    if (type === 'user') {
        call.on('stream', userShareStream => {
            shareStream = userShareStream;
        });
    }

    addVideos({ 'type': 'main', 'stream': shareStream });
    MyPeer.shareStream = shareStream;
    peers['share'] = call;
    
    shareStream.getVideoTracks()[0].onended = remove;
    call.on('close', remove);
}

const HandleUserCall = (call, stream) => {
    call.on('stream', userVideoStream => {
        addVideos({ 'type': 'main', 'stream': userVideoStream });
    });

    call.on('close', () => {
        Decline(stream);
    });
}

const Accept = stream => {
    setState('notification', undefined);
    MyPeer.conn = new Peer();

    MyPeer.conn.on('open', async(myPeerID) => {
        MyPeer.myPeerID = myPeerID;
        const call = MyPeer.conn.call(MyPeer.opponentPeerID, stream, { metadata: {'peerID': myPeerID, 'type': 'call'} });
        if (call) {
            HandleUserCall(call, stream);
            peers[MyPeer.opponentPeerID] = call;
        }
    });
}

const Decline = stream => {
    if (stream) stream.getTracks().forEach(t => t.stop());
    setState('opened', false);
    setState('videos', []);
    setState('stream', undefined);
    ZeroMyPeer();

    SendWSMessage(22, MyPeer.userID, 'user disconnected');
}

const StopSharing = () => {
    if (!MyPeer.shareStream) return;
    MyPeer.shareStream.getTracks().forEach(track => track.stop());
    MyPeer.shareStream = undefined;
    return removeVideo('main') || true;
}

const ShareScreen = async() => {
    if (!MyPeer.conn || !MyPeer.opponentPeerID || MyPeer.shareStream) return Notify('fail', Library.getText('common.calls.calls.shareFail'));
    const stream = await getScreenShareStream();
    const call = MyPeer.conn.call(MyPeer.opponentPeerID, stream, { metadata: {'peerID': MyPeer.myPeerID, 'type': 'share'} });
    return HandleShareCall('my', call, stream) || true;
}

export const GetCalled = async(type, call, userID, userPeerID, notificationState = {}) => {
    console.log('get calls data', type, call, userID, userPeerID, notificationState);
    if (MyPeer.conn && type !== 'share') return SendWSMessage(21, userID, 'user not free now');
    if (type !== 'share') {
        const stream = await getUserMediaStream(notificationState.type);
        console.log('getted stream', stream);
        if (!stream) return SendWSMessage(22, userID, 'user not available');
        setState('opened', true);
        setState('notification', notificationState);
        setState('stream', stream);
        addVideos({ 'type': 'my', 'stream': stream });
        MyPeer.opponentPeerID = userPeerID;
        MyPeer.userID = userID;
    } else {
        HandleShareCall('user', call);
    }
}

export const ToCall = async(type, userID) => {
    if (MyPeer.conn) return Notify('fail', Library.getText('common.calls.calls.toCallFail'));

    const stream = await getUserMediaStream(type);
    if (!stream) return Notify('fail', 'You can not call, bcs you do not give access to camera and micro to WNET!');
    setState('opened', true);
    setState('stream', stream);
    setState('notification', {type: type, whomCalling: 'me'});
    addVideos({ 'type': 'my', 'stream': stream });

    MyPeer.conn = new Peer();
    MyPeer.conn.on('open', myPeerID => {
        MyPeer.myPeerID = myPeerID;
        MyPeer.userID = userID;
        SendWSMessage(20, userID, {
            'userID': USER.id,
            'userPeerID': myPeerID,
            'type': 'call',
            'notificationState': {
                'avatar': USER.avatar,
                'type': type,
            }
        });
    });

    MyPeer.conn.on('call', async(call) => {
        if (call.metadata.type === 'call') {
            setState('notification', undefined);
            MyPeer.opponentPeerID = call.metadata.peerID;
            call.answer(stream);
            HandleUserCall(call, stream);
            peers[call.metadata.peerID] = call;
        } else HandleShareCall('user', call);
    });
}

export default function CallsPopup() {
    const [isOpened, setIsOpened] = useState(false);
    const [isOnShare, setOnScreen] = useState(false);
    const [isFullSize, setIsFullSize] = useState(false);
    const [notification, setNotification] = useState();
    const [stream, setStream] = useState();
    const [videos, setVideos] = useState([]);

    addVideos = (...newvideos) => setVideos([...videos, ...newvideos]);
    removeVideo = (type) => setVideos(videos.filter(video => video.type !== type));
    changeUserPlace = (from = 'main', to = 'user') => {
        const video = videos.find(video => video.type === from);
        if (video) video['type'] = to;
        setVideos([...videos]);
    }

    setState = (whichState, state) => {
        if (whichState === 'opened') return setIsOpened(state);
        if (whichState === 'fullsize') return setIsFullSize(state);
        if (whichState === 'notification') return setNotification(state);
        if (whichState === 'stream') return setStream(state);
        if (whichState === 'onShare') return setOnScreen(state);
        return setVideos(state);
    }
    
    return (
        <SCalls isFullSize={isFullSize} isOpened={isOpened}>
            {
                stream && isOpened && notification 
                    ? <CallNotification notification={notification} Accept={() => Accept(stream)} Decline={() => Decline(stream)}/> 
                    : null
            }

            {
                videos.length > 0
                ? <SVideos>
                    {videos.map((video, index) => <CallVideo isFullSize={isFullSize} key={index} {...video} />)}
                </SVideos>
                : null
            }

            {
                stream 
                    ? <CallManaging 
                        stream={stream} 
                        isFullSize={isFullSize}
                        AudioOnOff={() => AudioVideoOnOff('audio', stream)} 
                        VideoOnOff={() => AudioVideoOnOff('video', stream)}
                        isOnShare={isOnShare} setOnScreen={setOnScreen}
                        setIsFullSize={setIsFullSize} Decline={() => Decline(stream)}
                        ShareScreen={ShareScreen} StopSharing={StopSharing} 
                    /> 
                    : null
            }
        </SCalls>
    )
}
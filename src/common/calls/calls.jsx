import { useState } from "react";

import { Library } from "constants/language";
import { USER } from "constants/constants";
import { SendWSMessage } from "functions/ws";
import { CheckPermissions } from "functions/effects";
import { Notify } from "common/app-notification/notification";

import CallNotification from 'common/calls/call-notification/notification';
import CallVideo from 'common/calls/call-video/video';
import CallManaging from 'common/calls/call-managing/managing';
import styled from "styled-components";

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
    myStream: undefined,
    userID: undefined,
}

const ZeroMyPeer = () => {
    if (MyPeer.conn) MyPeer.conn.disconnect();
    MyPeer.conn = undefined;
    MyPeer.myPeerID = undefined;
    MyPeer.opponentPeerID = undefined;
    MyPeer.userID = undefined;
    if (MyPeer.myStream) MyPeer.myStream.getTracks().forEach(t => t.stop());
    if (MyPeer.shareStream) MyPeer.shareStream.getTracks().forEach(t => t.stop());
    MyPeer.myStream = undefined;
    MyPeer.shareStream = undefined;
    Object.values(peers).forEach(call => call.close());
}

const peers = {};

let setState;

let addVideo;
let removeVideo;
let changeVideoPlace;

const AudioVideoOnOff = (type, stream) => {
    if (!stream || !type) return Notify('fail', Library.getText('common.calls.calls.audioVideoOnOffFail'))
    const track = type === 'audio' ? stream.getAudioTracks()[0] : stream.getVideoTracks()[0];
    track.enabled = !track.enabled;
}

const getScreenShareStream = async() => {
    if (navigator.userAgent.indexOf("Firefox") === -1 && !(await CheckPermissions(['camera', 'microphone']))) return null;
    return await navigator?.mediaDevices?.getDisplayMedia(
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
    const stream = await navigator?.mediaDevices?.getUserMedia({video: true, audio: true});
    if (!stream) return null;
    if (type === 'audio') AudioVideoOnOff('video', stream);
    else AudioVideoOnOff('audio', stream);
    return stream;
}

const HandleShareCall = (type, call, stream = {}) => {
    const handleStream = (shareStream) => {
        MyPeer.shareStream = shareStream;
        peers['share'] = call;
        setState('onShare', true);
        addVideo({ 'type': 'main', 'stream': shareStream });
        
        shareStream.getVideoTracks()[0].onended = StopShare;
        call.on('close', StopShare)
    }

    console.log(type, call, stream);
    changeVideoPlace('main', 'user');
    
    if (type === 'user') {
        return call.on('stream', userShareStream => {
            handleStream(userShareStream);
        });
    }
    handleStream(stream);
}

const HandleUserCall = (call) => {
    call.on('stream', userVideoStream => {
        addVideo({ 'type': 'main', 'stream': userVideoStream });
    });

    call.on('close', () => {
        Decline(false);
    });
}

const preCallPreparing = async(type, userID, notificationState, isMeCalling = false) => {
    const stream = await getUserMediaStream(type);
    
    if (!stream) {
        if (isMeCalling) return Notify('fail', 'You can not call, bcs you do not give access to camera and micro to WNET!');
        return SendWSMessage(22, userID);
    }

    MyPeer.conn = new Peer();
    MyPeer.myStream = stream;
    MyPeer.userID = userID;
    setState('opened', true);
    setState('stream', stream);
    setState('notification', notificationState);
    addVideo({ 'type': 'my', 'stream': stream });
}

const onPeerCall = (call) => {
    if (call.metadata.type === 'call') {
        peers[call.metadata.peerID] = call;
        MyPeer.opponentPeerID = call.metadata.peerID;
        call.answer(MyPeer.myStream);
        setState('notification', undefined);
        HandleUserCall(call);
    } else HandleShareCall('user', call);
}

const Accept = () => {
    setState('notification', undefined);

    const call = MyPeer.conn.call(MyPeer.opponentPeerID, MyPeer.myStream, { metadata: {'peerID': MyPeer.myPeerID, 'type': 'call'} });
    if (call) {
        HandleUserCall(call);
        peers[MyPeer.opponentPeerID] = call;
    }
}

const Decline = (isMeDecline = true) => {
    setState('opened', false);
    setState('videos', []);
    setState('stream', undefined);
    setState('onShare', false);
    
    if (MyPeer.userID && isMeDecline) SendWSMessage(22, MyPeer.userID, 'user disconnected');
    ZeroMyPeer();
}

const ShareScreen = async() => {
    if (!MyPeer.conn || !MyPeer.opponentPeerID) return Notify('fail', Library.getText('common.calls.calls.shareFail'));
    if (MyPeer.shareStream) return Notify('fail', 'you are already share');
    const stream = await getScreenShareStream();
    const call = MyPeer.conn.call(MyPeer.opponentPeerID, stream, { metadata: {'peerID': MyPeer.myPeerID, 'type': 'share'} });
    return HandleShareCall('my', call, stream) || true;
}

export const StopShare = async(isMyShare = true) => {
    if (!MyPeer.shareStream) return;
    MyPeer.shareStream.getTracks().forEach(track => track.stop());
    MyPeer.shareStream = undefined;
    await removeVideo('main')
    changeVideoPlace('user', 'main');
    setState('onShare', false);

    if (isMyShare) SendWSMessage(23, MyPeer.userID);
}

export const UserNotFree = () => {
    Notify('info', 'User not free');
    Decline(false);
}

export const CloseCalls = () => {
    Notify('info', 'User decline');
    Decline(false);
}

export const GetCalled = async(type, userID, userPeerID, notificationState = {}) => {
    if (MyPeer.conn && type !== 'share') return SendWSMessage(21, userID, 'user not free now');

    MyPeer.opponentPeerID = userPeerID;
    await preCallPreparing(notificationState.type, userID, notificationState, false);

    MyPeer.conn.on('open', myPeerID => {
        MyPeer.myPeerID = myPeerID;
    });

    MyPeer.conn.on('call', async(call) => {
        return onPeerCall(call)
    });
}

export const ToCall = async(type, userID) => {
    if (MyPeer.conn) return Notify('fail', Library.getText('common.calls.calls.toCallFail'));

    await preCallPreparing(type, userID, {type: type, whomCalling: 'me'}, true);
  
    MyPeer.conn.on('open', myPeerID => {
        MyPeer.myPeerID = myPeerID;
        SendWSMessage(20, MyPeer.userID, {
            'userID': USER.id,
            'userPeerID': myPeerID,
            'type': 'call',
            'notificationState': {
                'avatar': USER.avatar,
                'type': type,
                'nickname': USER.nickname,
            }
        });
    });

    MyPeer.conn.on('call', async(call) => {
        return onPeerCall(call)
    });
}

export default function CallsPopup() {
    const [isOpened, setIsOpened] = useState(false);
    const [isOnShare, setOnScreen] = useState(false);
    const [isFullSize, setIsFullSize] = useState(false);
    const [notification, setNotification] = useState();
    const [stream, setStream] = useState();
    const [videos, setVideos] = useState([]);

    addVideo = (video = {}) => {
        if (!videos.find(v => v.type === video.type)) setVideos([...videos, video]);
    }
    removeVideo = async(type) => setVideos(videos.filter(video => video.type !== type));
    changeVideoPlace = (from = 'main', to = 'user') => {
        setVideos(videos.map(video => {
            if (video.type === from) video.type = to;
            return video;
        }));
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
                    ? <CallNotification notification={notification} Accept={Accept} Decline={Decline}/> 
                    : null
            }

            {
                videos.length > 0 && videos.length < 4
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
                        isOnShare={isOnShare}
                        AudioVideoOnOff={AudioVideoOnOff}
                        setIsFullSize={setIsFullSize}
                        Decline={Decline}
                        ShareScreen={ShareScreen} StopShare={StopShare} 
                    /> 
                    : null
            }
        </SCalls>
    )
}
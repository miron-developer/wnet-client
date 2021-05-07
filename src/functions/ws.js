import { HOST, USER } from "constants/constants";
import { AddNavsNotification } from "common/aside/aside";
import { AddUserNotification } from "common/header/notification/notification";
import { GetCalled, CloseCalls, UserNotFree, StopShare } from "common/calls/calls";
import { AppendMessages } from "messenger/messenger-chat";

let wss = null;

const selectAct = (data) => {
    if (!data) return;

    // App ws msgs
    if (data.msgType === 1) return // user online
    if (data.msgType === 2) return // user offline
    if (data.msgType === 3) return AddUserNotification(data.body);
    if (data.msgType === 4) return AddNavsNotification(data.body);

    // Chat ws msgs
    if (data.msgType === 10) return AppendMessages([data.body]);
    if (data.msgType === 11) return; // start typing
    if (data.msgType === 12) return; // stop typing

    // audio&video calls
    if (data.msgType === 20) return GetCalled(data.body?.type, data.body?.userID, data.body?.userPeerID, data.body?.notificationState);
    if (data.msgType === 21) return UserNotFree();
    if (data.msgType === 22) return CloseCalls();
    if (data.msgType === 23) return StopShare();
}

export const CloseWSConnection = () => wss?.close();

export const IsWSOpen = () => wss ? true : false;

export const CreateWSConnection = () => {
    wss = new WebSocket('wss://' + HOST + '/ws/');

    wss.onopen = () => console.log("websocket connected");
    wss.onclose = (e) => {
        wss = null;
        console.log('closed', e);
    };

    wss.onerror = err => {
        wss = null;
        console.log('err', err);
    };

    wss.onmessage = e => {
        const data = JSON.parse(e.data);
        selectAct(data);
    }
}

export const SendWSMessage = (msgType = 1, receiver = 0, body) => {
    if (wss === null) return { 'err': 'do not sended' };
    wss.send(JSON.stringify({ "msgType": msgType, "addresser": USER.id.toString(), "receiver": "".concat(receiver), "body": body }));
}
import { HOST, USER } from "constants/constants";
import { AddNavsNotification } from "common/aside/aside";
import { CloseCalls } from "common/calls/calls";
import { GetCalled } from "common/calls/calls";
import { AddUserNotification } from "common/header/notification/notification";
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
    if (data.msgType === 20) return GetCalled(data.body.type, data.body?.call, data.body.userID, data.body.userPeerID, data.body?.notificationState);
    if (data.msgType === 21) return; // user not free
    if (data.msgType === 22) return CloseCalls();
}

export const CloseWSConnection = () => wss ? wss.close() : null;

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
        console.log('data', data);
        selectAct(data);
    }
}

export const SendWSMessage = (msgType = 1, receiver = 0, body) => {
    if (body === undefined || wss === null) return { 'err': 'do not sended' };
    wss.send(JSON.stringify({ "msgType": msgType, "addresser": USER.id.toString(), "receiver": "".concat(receiver), "body": body }));
}
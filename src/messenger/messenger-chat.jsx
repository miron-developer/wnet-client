import { useEffect, useState } from 'react';

import { Library } from 'constants/language';
import { USER } from 'constants/constants';
import { POSTRequestWithParams } from 'functions/api';
import { ScrollHandler } from 'functions/effects';
import { UploadFile } from 'functions/file';
import { useFromTo } from 'functions/hooks';
import { SendWSMessage } from 'functions/ws';
import { Notify } from 'common/app-notification/notification';

import ChatHeader from 'messenger/chat-header/header';
import ChatMessages from 'messenger/chat-messages/messages';
import ChatTypingSide from 'messenger/chat-typing-side/typing-side';

// pull outed state
let appendMessages;
let companionID;
let isUser = false;

// for ws messages
export const AppendMessages = (msgs = []) => appendMessages(msgs);

export const CreateMessage = async(msgType, body, file) => {
    const type = isUser ? 'user' : 'group';
    const params = {
        'type': type,
        'messageType': msgType,
        'id': companionID,
        body,
    }

    const res = await POSTRequestWithParams('/s/message', params);
    if (res.err !== 'ok') return Notify('fail', Library.getText('messenger.chat.notSendMessage'));
    if (file) params['src'] = (await UploadFile(msgType, file, 'message', res.data[0]))["src"];

    params.id = res.data[0];
    params.datetime = Date.now().toString();
    params.avatar = USER.avatar;
    params.senderUserID = USER.id;
    params['receiver' + type[0].toUpperCase() + type.slice(1)+ 'ID'] = companionID;

    SendWSMessage(10, isUser ? companionID : "all", params);
    appendMessages([params]);

    const chatContainer = document.getElementById('chat-container');
    chatContainer.scrollTo(0, chatContainer.scrollHeight);
}

const loadMessages = (id, type, getPart) => getPart('messages', {'id': id, 'type': type}, Library.getText('messenger.chat.notLoadMessages'), false)

export default function Chat({match, history}) {
    const ID = match.params.id;
    const pureID = ID.replace(ID[0], '');
    isUser = ID.split('')[0] === 'u' ? true : false;
    const type = isUser ? 'user' : 'group';
    const chatData = JSON.parse(window.localStorage.getItem(ID));
    const [isLoaded, setLoaded] = useState(false);
    const {datalist, isStopLoad, setDataList, getPart} = useFromTo([], 20);

    appendMessages = (newMessages = []) => setDataList([...datalist, ...newMessages]);
    companionID = parseInt(pureID);

    useEffect(()=> {
        if (datalist.length === 0 && !isLoaded) {
            loadMessages(pureID, type, getPart)
            setLoaded(true);
        } else {
            const chatContainer = document.getElementById('chat-container');
            chatContainer.scrollTo(0, chatContainer.scrollHeight);
        }
    }, [pureID, type, chatData, datalist, isLoaded, history, getPart]);

    if (!chatData) return history.push('/' + Library.getText('common.routes.messenger')) || null;
    return (
        <>
            <ChatHeader id={pureID} isUser={isUser} avatar={chatData.avatar} status={chatData.status} name={chatData.name} />
            <ChatMessages 
                onScroll={
                    e => 
                    ScrollHandler(
                        e, 
                        isStopLoad, 
                        true, 
                        () => loadMessages(pureID, type, getPart)
                    )
                } 
                messages={datalist} 
            />
            <ChatTypingSide />
        </>
    )
}
import { useEffect, useState } from "react";

import { Library } from "constants/language";
import { RandomKey } from "functions/content";
import { useFromTo } from "functions/hooks";
import { ScrollHandler } from "functions/effects";
import ChatItem from 'common/chat-item/item';

import styled from "styled-components";

const SChats = styled.div`
    height: 86vh;
    overflow: auto;
`;

export default function Chats() {
    const [isLoaded, setLoaded] = useState(false);
    const { datalist, isStopLoad, getPart } = useFromTo();

    useEffect(() => {
        if (!isLoaded) {
            getPart('chats', {}, Library.getText('messenger.chats.notLoad'), true)
            setLoaded(true);
        }
    }, [isLoaded, getPart]);

    return (
        <SChats 
            onScroll={e => ScrollHandler(e, isStopLoad, false, () => getPart('chats', {}, Library.getText('messenger.chats.notLoad'), true))}
        >
            {datalist.map(chat => <ChatItem key={RandomKey()} {...chat} />)}
        </SChats>
    )
}
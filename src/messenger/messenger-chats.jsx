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

const loadChats = (getPart = ()=>{}) => getPart('chats', {}, Library.getText('messenger.chats.notLoad'), true)

export default function Chats() {
    const [isLoaded, setLoaded] = useState(false);
    const { datalist, isStopLoad, getPart } = useFromTo();

    useEffect(() => {
        if (!isLoaded) {
            loadChats(getPart);
            setLoaded(true);
        }
    }, [isLoaded, getPart]);

    return (
        <SChats onScroll={e => ScrollHandler(e, isStopLoad, false, () => loadChats(getPart))}>
            {datalist.map(chat => <ChatItem key={RandomKey()} {...chat} />)}
        </SChats>
    )
}
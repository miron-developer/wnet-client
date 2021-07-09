import { useEffect, useState } from "react";
import { Redirect } from "react-router";

import { Library } from "constants/language";
import { useFromTo } from "functions/hooks";
import { RandomKey } from "functions/content";
import { ScrollHandler } from "functions/effects";
import ProfileItem from 'common/account-item/item';

import FriendSwitch  from 'account/account-switch/switch';
import SearchLink from 'account/account-search-link/link';
import styled from "styled-components";

const SFriends = styled.div`
    height: 86vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
`;

const SFriendsList = styled.div`
    height: 100%;
    overflow: auto;
`;

const localLib = {
    'all': Library.getText('common.routes.account.friends.all'),
    'onlines': Library.getText('common.routes.account.friends.onlines'),
    'requests': Library.getText('common.routes.account.friends.requests'),
    'account': Library.getText('common.routes.account.account'),
    'friends': Library.getText('common.routes.account.friends.friends'),
    'notLoad': Library.getText('account.friends.notLoad'),
    'user': Library.getText('common.routes.user'),
    'search': Library.getText('common.routes.searches.search'),
}

const possibleTypes = [localLib.all, localLib.onlines, localLib.requests];
const friendsTypes = ['all', 'online', 'requests'];

const switchDatas = [{
    to: "/" + localLib.account + "/" + localLib.friends + "/" + localLib.all,
    textPath: localLib.all,
},{
    to: "/" + localLib.account + "/" + localLib.friends + "/" + localLib.onlines,
    textPath: localLib.onlines,
},{
    to: "/" + localLib.account + "/" + localLib.friends + "/" + localLib.requests,
    textPath: localLib.requests,
}];

export default function Friends() {
    const friendType = decodeURI(window.location.pathname).split('/')[3];
    const type = friendsTypes[possibleTypes.indexOf(friendType)];

    const [prevType, setPrevType] = useState();
    const [isLoaded, setLoaded] = useState(false);
    const { datalist, isStopLoad, setDataList, getPart } = useFromTo();

    useEffect(()=> {
        if (!isLoaded) {
            getPart('users', {'type':'followers', 'flwType': type}, localLib.notLoad, true);
            setLoaded(true);
        }
        if (prevType !== type) {
            setDataList([]);
            setLoaded(false);
        }
        setPrevType(type);
    }, [prevType, datalist, type, isLoaded, getPart, setDataList]);

    return !possibleTypes.includes(friendType) 
        ? <Redirect to={"/" + localLib.account + "/" + localLib.friends + "/" + localLib.all} /> 
        : (
            <SFriends>
                <FriendSwitch switchDatas={switchDatas} />
                <SearchLink
                    text = {localLib.user}
                    route={"/" + localLib.search + "/" + localLib.user}
                />
                <SFriendsList 
                    onScroll={
                        e => 
                        ScrollHandler(
                            e, 
                            isStopLoad, 
                            false, 
                            () => getPart('users', {'type':'followers', 'flwType': type}, localLib.notLoad, true)
                        )
                    }
                >
                    {datalist.map(friend => <ProfileItem key={RandomKey()} {...friend} />)}
                </SFriendsList>
            </SFriends>
    )
}
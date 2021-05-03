import { useEffect, useState } from "react";
import { Redirect } from "react-router";

import { Library } from "constants/language";
import { useFromTo } from "functions/hooks";
import { RandomKey } from "functions/content";
import { ScrollHandler } from "functions/effects";
import ProfileItem from 'common/profile-path-item/profile';

import FriendSwitch  from 'profile-path/profile-switch/switch';
import SearchLink from 'profile-path/profile-search-link/link';
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

const possibleTypes = [
    Library.getText('common.routes.profile.friends.all'), 
    Library.getText('common.routes.profile.friends.onlines'), 
    Library.getText('common.routes.profile.friends.requests'),
];

const friendsTypes = ['all', 'online', 'requests'];

const switchDatas = [{
    to: "/"+Library.getText('common.routes.profile.profile')+
        "/"+Library.getText('common.routes.profile.friends.friends')+
        "/"+Library.getText('common.routes.profile.friends.all'),
    textPath: 'common.routes.profile.friends.all',
},{
    to: "/"+Library.getText('common.routes.profile.profile')+
        "/"+Library.getText('common.routes.profile.friends.friends')+
        "/"+Library.getText('common.routes.profile.friends.onlines'),
    textPath: 'common.routes.profile.friends.onlines',
},{
    to: "/"+Library.getText('common.routes.profile.profile')+
        "/"+Library.getText('common.routes.profile.friends.friends')+
        "/"+Library.getText('common.routes.profile.friends.requests'),
    textPath: 'common.routes.profile.friends.requests',
}];

export default function Friends() {
    const friendType = decodeURI(window.location.pathname).split('/')[3];
    const type = friendsTypes[possibleTypes.indexOf(friendType)];

    const [prevType, setPrevType] = useState();
    const [isLoaded, setLoaded] = useState(false);
    const { datalist, isStopLoad, setDataList, getPart } = useFromTo();

    useEffect(()=> {
        if (!isLoaded) {
            getPart(
                'users', 
                {'type':'followers', 'flwType': type}, 
                Library.getText('profile-path.friends.notLoad'),
                true,
            )
            setLoaded(true);
        }
        if (prevType !== type) {
            setDataList([]);
            setLoaded(false);
        }
        setPrevType(type);
    }, [prevType, datalist, type, isLoaded, getPart, setDataList]);

    return !possibleTypes.includes(friendType) 
        ? <Redirect to={"/"+Library.getText('common.routes.profile.profile')+
                        "/"+Library.getText('common.routes.profile.friends.friends')+
                        "/"+Library.getText('common.routes.profile.friends.all')} /> 
        : (
            <SFriends>
                <FriendSwitch switchDatas={switchDatas} />
                <SearchLink
                    text = {Library.getText('common.routes.user')}
                    route={"/" + Library.getText('common.routes.searches.search') + "/" + Library.getText('common.routes.searches.user')}
                />
                <SFriendsList 
                    onScroll={
                        e => 
                        ScrollHandler(
                            e, 
                            isStopLoad, 
                            false, 
                            () => getPart(
                                'followers', 
                                {'type': type}, 
                                Library.getText('profile-path.friends.notLoad'),
                                true,
                            )
                        )
                    }
                >
                    {datalist.map(friend => <ProfileItem key={RandomKey()} {...friend} />)}
                </SFriendsList>
            </SFriends>
    )
}
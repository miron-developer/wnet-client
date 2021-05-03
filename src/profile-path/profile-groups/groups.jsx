import { useEffect, useState } from "react";
import { Redirect } from "react-router";

import { Library } from "constants/language";
import { useFromTo } from "functions/hooks";
import { RandomKey } from "functions/content";
import { ScrollHandler } from "functions/effects";
import ProfileItem from 'common/profile-path-item/profile';

import GroupSwitch  from 'profile-path/profile-switch/switch';
import SearchLink from 'profile-path/profile-search-link/link';
import styled from "styled-components";

const SGroups = styled.div`
    height: 86vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
`;

const SGroupsList = styled.div`
    height: 100%;
    overflow: auto;
`;

const possibleTypes = [
    Library.getText('common.routes.profile.friends.all'),
    Library.getText('common.routes.profile.friends.requests'),
];

const groupsTypes = ['all', 'requests'];

const switchDatas = [{
    to: "/"+Library.getText('common.routes.profile.profile')+
        "/"+Library.getText('common.routes.profile.groups')+
        "/"+Library.getText('common.routes.profile.friends.all'),
    textPath: 'common.routes.profile.friends.all',
},{
    to: "/"+Library.getText('common.routes.profile.profile')+
        "/"+Library.getText('common.routes.profile.groups')+
        "/"+Library.getText('common.routes.profile.friends.requests'),
    textPath: 'common.routes.profile.friends.requests',
}];

export default function Groups() {
    const groupType = decodeURI(window.location.pathname).split('/')[3];
    const type = groupsTypes[possibleTypes.indexOf(groupType)];

    const [prevType, setPrevType] = useState();
    const [isLoaded, setLoaded] = useState(false);
    const { datalist, isStopLoad, setDataList, getPart } = useFromTo();

    useEffect(()=> {
        if (!isLoaded) {
            getPart(
                'groups', 
                {'type': type}, 
                Library.getText('profile-path.groups.notLoad'),
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

    return !possibleTypes.includes(groupType) 
        ? <Redirect to={"/"+Library.getText('common.routes.profile.profile')+
                        "/"+Library.getText('common.routes.profile.groups')+
                        "/"+Library.getText('common.routes.profile.friends.all')} /> 
        : (
            <SGroups>
                <GroupSwitch switchDatas={switchDatas} />
                <SearchLink 
                    text = {Library.getText('common.routes.group')}
                    route={"/" + Library.getText('common.routes.searches.search') + "/" + Library.getText('common.routes.group')}
                />


                <SGroupsList
                    onScroll={
                        e => 
                        ScrollHandler(
                            e, 
                            isStopLoad, 
                            false, 
                            () => getPart(
                                'groups', 
                                {'type': type}, 
                                Library.getText('profile-path.groups.notLoad'),
                                true,
                            )
                        )
                    }
                >
                    {datalist.map(group => <ProfileItem key={RandomKey()} {...group} />)}
                </SGroupsList>
            </SGroups>
    )
}
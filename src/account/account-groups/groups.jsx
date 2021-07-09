import { useEffect, useState } from "react";
import { Redirect } from "react-router";

import { Library } from "constants/language";
import { useFromTo } from "functions/hooks";
import { RandomKey } from "functions/content";
import { ScrollHandler } from "functions/effects";
import ProfileItem from 'common/account-item/item';

import GroupSwitch  from 'account/account-switch/switch';
import SearchLink from 'account/account-search-link/link';
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

const localLib = {
    'all': Library.getText('common.routes.account.friends.all'),
    'requests': Library.getText('common.routes.account.friends.requests'),
    'account': Library.getText('common.routes.account.account'),
    'groups': Library.getText('common.routes.account.groups'),
    'notLoad': Library.getText('account.groups.notLoad'),
    'search': Library.getText('common.routes.searches.search'),
    'group': Library.getText('common.routes.group'),
}

const possibleTypes = [localLib.all, localLib.requests];
const groupsTypes = ['all', 'requests'];

const switchDatas = [{
    to: "/" + localLib.account + "/" + localLib.groups + "/" + localLib.all,
    textPath: localLib.all,
},{
    to: "/" + localLib.account + "/" + localLib.groups + "/" + localLib.requests,
    textPath: localLib.requests,
}];

export default function Groups() {
    const groupType = decodeURI(window.location.pathname).split('/')[3];
    const type = groupsTypes[possibleTypes.indexOf(groupType)];

    const [prevType, setPrevType] = useState();
    const [isLoaded, setLoaded] = useState(false);
    const { datalist, isStopLoad, setDataList, getPart } = useFromTo();

    useEffect(()=> {
        if (!isLoaded) {
            getPart('groups', {'type': type}, localLib.notLoad, true);
            setLoaded(true);
        }
        if (prevType !== type) {
            setDataList([]);
            setLoaded(false);
        }
        setPrevType(type);
    }, [prevType, datalist, type, isLoaded, getPart, setDataList]);

    return !possibleTypes.includes(groupType) 
        ? <Redirect to={"/" + localLib.account + "/" + localLib.groups + "/" + localLib.all} /> 
        : (
            <SGroups>
                <GroupSwitch switchDatas={switchDatas} />
                <SearchLink 
                    text={localLib.group}
                    route={"/" + localLib.search + "/" + localLib.group}
                />


                <SGroupsList
                    onScroll={
                        e => 
                        ScrollHandler(
                            e, 
                            isStopLoad, 
                            false, 
                            () => getPart('groups', {'type': type}, localLib.notLoad, true)
                        )
                    }
                >
                    {datalist.map(group => <ProfileItem key={RandomKey()} {...group} />)}
                </SGroupsList>
            </SGroups>
    )
}
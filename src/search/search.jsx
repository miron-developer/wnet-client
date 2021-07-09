import { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

import { Library } from 'constants/language';
import { useFromTo } from 'functions/hooks';
import { ScrollHandler } from 'functions/effects';
import SearchInput from 'search/search-input/input';
import SearchSwitch from 'search/search-switch/switch';
import Filter from 'search/search-filter/filter';

import GResult from 'search/search-result/result';
import styled from 'styled-components';

const SSearch = styled.div`
    overflow: hidden;
`;

const SSearchResult = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    height: 86vh;
    overflow: auto;
`;

let prevFilter = {};

const localLib = {
    'all': Library.getText('common.routes.searches.all'),
    'user': Library.getText('common.routes.user'),
    'group': Library.getText('common.routes.group'),
    'post': Library.getText('common.routes.post'),
    'video': Library.getText('common.routes.video'),
    'notLoadRes': Library.getText('search.search.notLoadRes'),
    'search': Library.getText('common.routes.searches.search'),
}

const possibleSearches = [localLib.all, localLib.user, localLib.group, localLib.post, localLib.video];
const searchTypes = ['all', 'user', 'group', 'post', 'video'];

const updPrevFilter = newF => prevFilter = {...newF};

const isNewFilter = filter => {
    const k1 = Object.keys(prevFilter);
    const k2 = Object.keys(filter);

    if (k1.length !== k2.length) return true;
    for (let k of k1) 
        if (prevFilter[k] !== filter[k]) return true;
    return false;
}

const removeEmptyFields = (obj = {}) => {
    for (let [k, v] of Object.entries(obj))
        if (v === "") delete obj[k];
    return obj
}

const loadSearchRes = (getPart, isNeedClear = false) => getPart("search", prevFilter, localLib.notLoadRes, true, isNeedClear);

export default function SearchAll() {
    const {datalist, isStopLoad, getPart, setDataList, zeroState} = useFromTo()
    const [searchText, setSearchText] = useState('');
    const [isFilterClosed, setFilterCloseState] = useState(true);
    const [filterParams, setFilterParams] = useState({});

    const searchType = decodeURI(window.location.pathname).split('/')[2];
    const indexOfPossibles = possibleSearches.indexOf(searchType);
    const type = searchTypes[indexOfPossibles];
    
    useEffect(()=>{
        const searchObj = {
            ...removeEmptyFields(filterParams),
            'type': type,
            'q'   : searchText,
        }

        if (!isNewFilter(searchObj)) return;
        if (prevFilter.type !== searchObj.type) return setDataList([]) || setFilterParams({}) || zeroState() || updPrevFilter(searchObj);
        if (Object.values(filterParams).length === 0 && searchText === "") return;
        if (!isFilterClosed) return;

        updPrevFilter(searchObj);
        zeroState();
        loadSearchRes(getPart, true);
    }, [indexOfPossibles, type, isFilterClosed, searchText, filterParams, zeroState, getPart, setDataList]);

    if (indexOfPossibles === -1) return <Redirect to={"/"+localLib.search+"/"+localLib.user}/>;
    return (
        <SSearch>
            <SearchInput isFilterClosed={isFilterClosed} setFilterCloseState={setFilterCloseState} searchType={searchType} setSearchText={setSearchText}/>
            <Filter isFilterClosed={isFilterClosed} filterIndex={indexOfPossibles} filterParams={filterParams} />
            <SearchSwitch />
            <SSearchResult
                onScroll={e => ScrollHandler(e, isStopLoad, false, () => loadSearchRes(getPart))}
            >
                <GResult datas={datalist} />
            </SSearchResult>
        </SSearch>
    )
}
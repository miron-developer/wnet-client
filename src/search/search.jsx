import { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

import { Library } from 'constants/language';
import { USER, GROUP, VIDEO, POST } from 'constants/mocks';
import { GetDataByCrieteries } from 'functions/api';
import { Notify } from 'common/app-notification/notification';
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
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
`;

let prevFilter = {};
const possibleSearches = [
    Library.getText('common.routes.searches.all'), 
    Library.getText('common.routes.searches.user'), 
    Library.getText('common.routes.group'), 
    Library.getText('common.routes.post'), 
    Library.getText('common.routes.video'),
];

const searchTypes = ['all', 'user', 'group', 'post', 'video'];

const updPrevFilter = newF => prevFilter = Object.assign({}, newF);

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

const search = async(searchObj, setData) => {
    if (!searchObj || !setData) return;
    const res = await GetDataByCrieteries('search', searchObj);

    if (searchObj.type === 'post') setData([POST, POST, POST]);
    else if (searchObj.type === 'user') setData([USER, USER, USER]);
    else if (searchObj.type === 'group') setData([GROUP, GROUP, GROUP]);
    else setData([VIDEO, VIDEO, VIDEO]);

    if (res.err !== "ok") return Notify('fail', Library.getText('search.search.notLoadRes'));
    setData(res.data);
};

export default function SearchAll() {
    const [data, setData] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [filterParams, setFilterParams] = useState({});
    const [isFilterClosed, setFilterCloseState] = useState(true);

    const searchType = decodeURI(window.location.pathname).split('/')[2];
    
    useEffect(()=> {
        const indexOfPossibles = possibleSearches.indexOf(searchType);
        const searchObj = {
            ...removeEmptyFields(filterParams),
            'type': searchTypes[indexOfPossibles],
            'q'   : searchText,
        }

        if (!possibleSearches.includes(searchType) || !isNewFilter(searchObj)) return;
        if (prevFilter.type !== searchObj.type) return setFilterParams({}) || updPrevFilter(searchObj);
        if (isFilterClosed) setFilterParams(Object.assign({}, filterParams));
       
        search(searchObj, setData);
        updPrevFilter(searchObj);
    }, [isFilterClosed, searchText, filterParams, searchType]);

    return !possibleSearches.includes(searchType) 
            ? <Redirect to={"/"+Library.getText('common.routes.searches.search')+"/"+Library.getText('common.routes.searches.all')} /> 
            : (
                <SSearch>
                    <SearchInput isFilterClosed={isFilterClosed} setFilterCloseState={setFilterCloseState} searchType={searchType} setSearchText={setSearchText}/>
                    <Filter isFilterClosed={isFilterClosed} filterIndex={possibleSearches.indexOf(searchType)} filterParams={filterParams} />
                    <SearchSwitch />
                    <SSearchResult>
                        <GResult datas={data} />
                    </SSearchResult>
                </SSearch>
            )
}
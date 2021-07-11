import { useEffect, useState } from 'react';

import { Library } from 'constants/language';
import { useFromTo } from 'functions/hooks';
import { ScrollHandler } from 'functions/effects';
import { RandomKey } from 'functions/content';
import EventItem from 'common/event-item/event';
import ProfileItem from 'common/profile-item/profile';
import GalleryItem from 'common/gallery-item/gallery';

import styled from 'styled-components';

const SCatalogueH2 = styled.h2`
    width: 100%;
    text-align: center;
    text-transform: uppercase;
`;

const SCatalogueWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    height: 100%;
    overflow: auto;
`;

const localLib = {
    'notLoadDatas': Library.getText('common.catalogue-of.notLoadDatas'),
    'title': title => Library.getText('profile.actions-btns.btns.'+title),
}

const removeFromCatalogue = (id, datalist = [], setDatalist) => setDatalist(datalist.filter(data => data.id !== id));

export default function Catalogue({ type, get, id, title, params }) {
    const {datalist, isStopLoad, setDataList, getPart} = useFromTo([], 20);
    const [isLoaded, setLoaded] = useState(false);

    useEffect(
        () => {
            if (!isLoaded) {
                getPart(get, {...params, 'id' : id}, localLib.notLoadDatas, true);
                setLoaded(true);
            }
        },
        [isLoaded, params, get, id, getPart]
    );

    return (
        <>
            <SCatalogueH2>{localLib.title(title)}</SCatalogueH2>
            <SCatalogueWrapper onScroll={
                e => ScrollHandler(
                    e, 
                    isStopLoad, 
                    false, 
                    () => getPart(get, {...params, 'id' : id}, localLib.notLoadDatas, true)
                )
            }>
                {
                    datalist.map(data => {
                        const key = RandomKey();
                        if (type === 'user' || type === 'group') return <ProfileItem key={key} type={type} {...data} />;
                        if (type === 'event') return <EventItem key={key} {...data} />;
                        return <GalleryItem key={key} removeFromCatalogue={()=>removeFromCatalogue(data.id, datalist, setDataList)} {...data} />;
                    })
                }
            </SCatalogueWrapper>
        </>
    )
}
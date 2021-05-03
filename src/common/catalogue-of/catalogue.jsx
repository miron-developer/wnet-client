import { useEffect, useState } from 'react';

import { Library } from 'constants/language';
import { useFromTo } from 'functions/hooks';
import { ScrollHandler } from 'functions/effects';
import EventItem from 'common/event-item/event';
import ProfileItem from 'common/profile-item/profile';
import GalleryItem from 'common/gallery-item/gallery';

import styled from 'styled-components';

const SCatalogueH2 = styled.h2`
    width: 100%;
    text-align: center;
    text-transform: capitalize;
`;

const SCatalogueWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    height: 100%;
    overflow: auto;
`;

const removeFromCatalogue = (id, datalist = [], setDatalist) => setDatalist(datalist.filter(data => data.id !== id));

export default function Catalogue({ type, get, userID, title, params }) {
    const {datalist, isStopLoad, setDataList, getPart} = useFromTo([], 20);
    const [isLoaded, setLoaded] = useState(false);

    useEffect(
        () => {
            if (!isLoaded) {
                getPart(get, {...params, 'id' : userID}, Library.getText('common.catalogue-of.notLoad'), true);
                setLoaded(true);
            }
        },
        [isLoaded, params, get, userID, setLoaded, getPart]
    );

    return (
        <>
            <SCatalogueH2>{Library.getText('profile.actions-btns.btns.'+title)}</SCatalogueH2>
            <SCatalogueWrapper onScroll={
                e => ScrollHandler(
                    e, 
                    isStopLoad, 
                    false, 
                    () => getPart(get, {...params, 'userID' : userID}, Library.getText('common.catalogue-of.notLoad'), true)
                )
            }>
                {
                    datalist.map((data, index) => {
                        if (type === 'user' || type === 'group') return <ProfileItem key={index} type={type} {...data} />;
                        if (type === 'event') return <EventItem key={index} {...data} />;
                        return <GalleryItem key={index} removeFromCatalogue={()=>removeFromCatalogue(data.id, datalist, setDataList)} {...data} />;
                    })
                }
            </SCatalogueWrapper>
        </>
    )
}
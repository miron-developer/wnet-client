import { useEffect, useState } from "react";
import { Redirect } from "react-router";

import { Library } from "constants/language";
import { useFromTo } from "functions/hooks";
import { RandomKey } from "functions/content";
import { ScrollHandler } from "functions/effects";
import GalleryItem from 'common/gallery-item/gallery';

import Switch  from 'account/account-switch/switch';
import SearchLink from 'account/account-search-link/link';
import styled from "styled-components";

const SGallery = styled.div`
    height: 86vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
`;

const SGalleryList = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    height: 100%;
    overflow: auto;
`;

const localLib = {
    'all': Library.getText('common.routes.account.friends.all'),
    'photo': Library.getText('common.routes.photo'),
    'video': Library.getText('common.routes.video'),
    'account': Library.getText('common.routes.account.account'),
    'gallery': Library.getText('common.routes.account.gallery'),
    'notLoad': Library.getText('account.gallery.notLoad'),
    'search': Library.getText('common.routes.searches.search'),
}

const possibleTypes = [localLib.all, localLib.photo, localLib.video];
const galleryTypes = ['all', 'photo', 'video'];

const switchDatas = [{
    to: "/" + localLib.account + "/" + localLib.gallery + "/" + localLib.all,
    textPath: localLib.all,
},{
    to: "/" + localLib.account + "/" + localLib.gallery + "/" + localLib.photo,
    textPath: localLib.photo,
},{
    to: "/" + localLib.account + "/" + localLib.gallery + "/" + localLib.video,
    textPath: localLib.video,
}];

export default function Gallery() {
    const galleryType = decodeURI(window.location.pathname).split('/')[3];
    const type = galleryTypes[possibleTypes.indexOf(galleryType)];

    const [prevType, setPrevType] = useState();
    const [isLoaded, setLoaded] = useState(false);
    const { datalist, isStopLoad, setDataList, getPart } = useFromTo([], 20);
    
    useEffect(()=> {
        if (!isLoaded) {
            getPart('gallery', {'type': 'my', 'galleryType': type}, localLib.notLoad, true);
            setLoaded(true);
        }
        if (prevType !== type) {
            setDataList([]);
            setLoaded(false);
        }
        setPrevType(type);
    }, [prevType, type, datalist, isLoaded, getPart, setDataList]);

    return !possibleTypes.includes(galleryType) 
        ? <Redirect to={"/" + localLib.account + "/" + localLib.gallery + "/" + localLib.all} /> 
        : (
            <SGallery>
                <Switch switchDatas={switchDatas} />

                {
                    type === 'video'
                        ? <SearchLink 
                            text = {possibleTypes[2]}
                            route={"/" + localLib.search + "/" + localLib.video}
                        />
                        : null
                }

                <SGalleryList 
                    onScroll={
                        e => 
                        ScrollHandler(
                            e, 
                            isStopLoad, 
                            false, 
                            () => getPart('gallery', {'type': 'my', 'galleryType': type}, localLib.notLoad, true)
                        )
                    }
                >
                    {datalist.map(gallery => <GalleryItem key={RandomKey()} {...gallery} />)}
                </SGalleryList>
            </SGallery>
    )
}
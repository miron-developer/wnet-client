import { useEffect, useState } from "react";
import { Redirect } from "react-router";

import { Library } from "constants/language";
import { useFromTo } from "functions/hooks";
import { RandomKey } from "functions/content";
import { ScrollHandler } from "functions/effects";
import GalleryItem from 'common/gallery-item/gallery';

import Switch  from 'profile-path/profile-switch/switch';
import SearchLink from 'profile-path/profile-search-link/link';
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

const possibleTypes = [
    Library.getText('common.routes.profile.friends.all'),
    Library.getText('common.routes.photo'),
    Library.getText('common.routes.video'),
];

const galleryTypes = ['all', 'photo', 'video'];

const switchDatas = [{
    to: "/"+Library.getText('common.routes.profile.profile')+
        "/"+Library.getText('common.routes.profile.gallery')+
        "/"+Library.getText('common.routes.profile.friends.all'),
    textPath: 'common.routes.profile.friends.all',
},{
    to: "/"+Library.getText('common.routes.profile.profile')+
        "/"+Library.getText('common.routes.profile.gallery')+
        "/"+Library.getText('common.routes.photo'),
    textPath: 'common.routes.photo',
},{
    to: "/"+Library.getText('common.routes.profile.profile')+
        "/"+Library.getText('common.routes.profile.gallery')+
        "/"+Library.getText('common.routes.video'),
    textPath: 'common.routes.video',
}];

export default function Gallery() {
    const galleryType = decodeURI(window.location.pathname).split('/')[3];
    const type = galleryTypes[possibleTypes.indexOf(galleryType)];

    const [prevType, setPrevType] = useState();
    const [isLoaded, setLoaded] = useState(false);
    const { datalist, isStopLoad, setDataList, getPart } = useFromTo([], 20);
    
    useEffect(()=> {
        if (!isLoaded) {
            getPart('gallery', {'type': 'my', 'galleryType': type}, Library.getText('profile-path.gallery.notLoad'), true);
            setLoaded(true);
        }
        if (prevType !== type) {
            setDataList([]);
            setLoaded(false);
        }
        setPrevType(type);
    }, [prevType, type, datalist, isLoaded, getPart, setDataList]);

    return !possibleTypes.includes(galleryType) 
        ? <Redirect to={"/"+Library.getText('common.routes.profile.profile')+
                        "/"+Library.getText('common.routes.profile.gallery')+
                        "/"+Library.getText('common.routes.profile.friends.all')} /> 
        : (
            <SGallery>
                <Switch switchDatas={switchDatas} />

                {
                    type === 'video'
                        ? <SearchLink 
                            text = {possibleTypes[2]}
                            route={"/" + Library.getText('common.routes.searches.search') + "/" + Library.getText('common.routes.video')}
                        />
                        : null
                }

                <SGalleryList onScroll={
                    e => 
                    ScrollHandler(
                        e, 
                        isStopLoad, 
                        false, 
                        () => getPart('gallery', {'type': 'my', 'galleryType': type}, Library.getText('profile-path.gallery.notLoad'), true)
                        )
                    }
                >
                    {datalist.map(gallery => <GalleryItem key={RandomKey()} {...gallery} />)}
                </SGalleryList>
            </SGallery>
    )
}
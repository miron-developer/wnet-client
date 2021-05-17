import { useEffect, useState } from "react";

import { COMMENT_PHOTO, PHOTO } from "constants/mocks";
import { Library } from "constants/language";
import { GetOne } from "functions/api";
import { ScrollHandler } from "functions/effects";
import { useFromTo } from "functions/hooks";
import LeaveCommentPlash from 'common/leave-comment-plash/plash';
import Comments from 'common/comments/comments';

import styled from "styled-components";

const SPhoto = styled.div`
    height: 30rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 1rem;
    padding: 1rem;
    background: #211f1f;
`;

export default function PhotoPage({ history }) {
    const ID = window.location.pathname.split('/')[2];
    const [photo, setPhoto] = useState(PHOTO);

    const [isStopLoad, setStopLoad] = useState(false);
    const { datalist, setDataList, getPart } = useFromTo([COMMENT_PHOTO, COMMENT_PHOTO, COMMENT_PHOTO, COMMENT_PHOTO, COMMENT_PHOTO])

    const addComments = (...newComments) => setDataList([...datalist, ...newComments]);

    useEffect(() => {
        if (photo && Object.values(photo).length === 0) {
            if (!GetOne({'id':ID}, 'photo', Library.getText('photo.notLoadPhoto'), setPhoto)) history.push("/");
        } else {
            getPart('comments', { 'type': 'photo', 'photoID': ID }, Library.getText('photo.notLoadComments'), true, setStopLoad);
        }
    }, [getPart, history, ID, photo]);


    return (
        <div className="photo-wrapper">
            <SPhoto>
                <img src={photo.src} alt={photo.title} />
            </SPhoto>

            <LeaveCommentPlash id={ID} type="photo" addComments={addComments} />
            
            <Comments comments={datalist}
                onScroll={
                    e => 
                    ScrollHandler(
                        e, 
                        isStopLoad, 
                        false, 
                        () => getPart('comments', { 'type': 'photo', 'photoID': ID }, Library.getText('photo.notLoadComments'), true, setStopLoad)
                    )
                } 
            />
        </div>
    )
}
import { useEffect, useState } from "react";

import { COMMENT_VIDEO, VIDEO } from "constants/mocks";
import { Library } from "constants/language";
import { GetOne, SaveComment } from "functions/api";
import { ScrollHandler } from "functions/effects";
import { useFromTo } from "functions/hooks";
import LeaveCommentPlash from 'common/leave-comment-plash/plash';
import Comments from 'common/comments/comments';

import styled from "styled-components";

const SVideo = styled.div`
    height: 30rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 1rem;
    padding: 1rem;
    background: #211f1f;
`;

export default function VideoPage({ history }) {
    const ID = window.location.pathname.split('/')[2];
    const [video, setVideo] = useState(VIDEO);

    const [isStopLoad, setStopLoad] = useState(false);
    const { datalist, setDataList, getPart } = useFromTo([COMMENT_VIDEO, COMMENT_VIDEO, COMMENT_VIDEO, COMMENT_VIDEO, COMMENT_VIDEO])

    const addComments = (...newComments) => setDataList([...datalist, ...newComments]);

    useEffect(() => {
        if (video && Object.values(video).length === 0) {
            if (!GetOne({'id':ID}, 'video', Library.getText('video.notLoadVideo'), setVideo)) history.push("/");
        } else {
            getPart('comments', { 'type': 'video', 'id': ID }, Library.getText('video.notLoadComments'), true, setStopLoad);
        }

    }, [ID, video, getPart, history]);


    return (
        <div className="video-wrapper">
            <SVideo>
                <video src={video.src} controls />
            </SVideo>

            <LeaveCommentPlash id={ID} type="video" saveComment={(params = {}) => SaveComment(params, addComments)} />

            <Comments comments={datalist} 
                saveComment={SaveComment}
                onScroll={
                    e => 
                    ScrollHandler(
                        e, 
                        isStopLoad, 
                        false, 
                        () => getPart('comments', { 'type': 'video', 'id': ID }, Library.getText('video.notLoadComments'), true, setStopLoad)
                    )
                } 
            />
        </div>
    )
}
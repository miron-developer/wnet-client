import { useEffect, useState } from "react";

import { Library } from "constants/language";
import { GetOne } from "functions/api";
import { ScrollHandler } from "functions/effects";
import { GET_FILE_SRC } from "functions/content";
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

const loadComments = (id, getPart = ()=>{}) => getPart('comments', { 'type': 'media', 'id': id, 'count': 'many' }, Library.getText('video.notLoadComments'), true);

export default function VideoPage({ history }) {
    const ID = window.location.pathname.split('/')[2];
    const [isLoaded, setLoaded] = useState(false);
    const [video, setVideo] = useState({});

    const { datalist, setDataList, isStopLoad, getPart } = useFromTo()

    const addComments = (...newComments) => setDataList([...datalist, ...newComments]);

    useEffect(() => {
        if (Object.values(video).length === 0) {
            GetOne({'id':ID, 'type': 'video'}, 'media', Library.getText('video.notLoadVideo'), setVideo)
            .then(isEx => !isEx ? history.push("/") : null)
        } else {
            if (!isLoaded) {
                loadComments(ID, getPart);
                setLoaded(true);
            }
        }
    }, [ID, video, isLoaded, history, getPart]);


    return (
        <div className="video-wrapper">
            <SVideo>
                <video src={GET_FILE_SRC(video.src)}  controls />
            </SVideo>

            <LeaveCommentPlash id={ID} type="video" addComments={addComments} />

            <Comments comments={datalist}
                onScroll={
                    e => 
                    ScrollHandler(
                        e, 
                        isStopLoad, 
                        false, 
                        () => loadComments(ID, getPart)
                    )
                } 
            />
        </div>
    )
}
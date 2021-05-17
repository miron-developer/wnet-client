import { useEffect, useState } from "react";

import { COMMENT_POST } from "constants/mocks";
import { Library } from "constants/language";
import { GetAll } from "functions/api";
import { ScrollHandler } from "functions/effects";
import { useFromTo } from "functions/hooks";
import PostItem from 'common/post-item/post';
import ClippedFiles from 'common/clipped-files-plash/plash';
import LeaveCommentPlash from 'common/leave-comment-plash/plash';
import Comments from 'common/comments/comments';

import styled from "styled-components";

const SClippedFilesWrapper = styled.div`
    margin: 1rem;
`;

export default function PostPage({ history }) {
    const ID = window.location.pathname.split('/')[2];
    const [isHaveAccess, setHaveAccess] = useState();
    const [isLoadedComments, setLoadedComments] = useState(false);
    const [isLoadedFiles, setLoadedFiles] = useState(false);
    const [clippedFiles, setClippedFiles] = useState([]);

    const [isStopLoad, setStopLoad] = useState(false);
    const { datalist, setDataList, getPart } = useFromTo();
    
    const addComments = (...newComments) => setDataList([...datalist, ...newComments]);

    useEffect(() => {
        if (!isHaveAccess) return null;
        if (!isLoadedFiles) {
            GetAll('files', { 'type': 'post', 'id': ID }, "", setClippedFiles)
            setLoadedFiles(true);
        }
        if (!isLoadedComments) {
            getPart('comments', { 'type': 'post', 'id': ID }, "", true, setStopLoad);
            setLoadedComments(true);
        }
    }, [ID, isLoadedFiles, isLoadedComments, isHaveAccess, history, getPart]);

    if (isHaveAccess === false) return history.push("/") || null;

    return (
        <div className="post-wrapper">
            <PostItem id={ID} setHaveAccess={setHaveAccess} />

            {
                isHaveAccess 
                    ? <>
                        <SClippedFilesWrapper>
                            <ClippedFiles files={clippedFiles} />
                        </SClippedFilesWrapper>

                        <LeaveCommentPlash id={ID} type="post" addComments={addComments} />
                        
                        {
                            datalist.length === 0
                            ? null
                            : <Comments comments={datalist}
                                onScroll={
                                    e => 
                                    ScrollHandler(
                                        e, 
                                        isStopLoad, 
                                        false, 
                                        ()=>getPart('comments', { 'type': 'post', 'postID': ID }, Library.getText('post.notLoadComments'), true, setStopLoad)
                                    )
                                } 
                            />
                        }
                    </>
                    : null
            }
        </div>
        )
}
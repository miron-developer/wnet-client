import { useEffect, useState } from "react";

import { CLIPPED_FILE_AUDIO, CLIPPED_FILE_IMG, CLIPPED_FILE_VIDEO, CLIPPED_FILE_FILE, COMMENT_POST } from "constants/mocks";
import { Library } from "constants/language";
import { GetAll, SaveComment } from "functions/api";
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
    const [clippedFiles, setClippedFiles] = useState([CLIPPED_FILE_IMG, CLIPPED_FILE_AUDIO, CLIPPED_FILE_VIDEO, CLIPPED_FILE_FILE]);

    const [isStopLoad, setStopLoad] = useState(false);
    const { datalist, setDataList, getPart } = useFromTo([COMMENT_POST, COMMENT_POST, COMMENT_POST, COMMENT_POST, COMMENT_POST, COMMENT_POST, COMMENT_POST])
    
    const addComments = (...newComments) => setDataList([...datalist, ...newComments]);

    useEffect(() => {
        if (isHaveAccess) {
            GetAll('files', { 'type': 'post', 'postID': ID }, Library.getText('post.notLoadClippedFiles'), setClippedFiles)
            getPart('comments', { 'type': 'post', 'postID': ID }, Library.getText('post.notLoadComments'), true, setStopLoad);
        }
    }, [ID, isHaveAccess, getPart, history]);

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

                        <LeaveCommentPlash id={ID} type="post" saveComment={(params = {}) => SaveComment(params, addComments)} />
                        
                        <Comments comments={datalist}
                            saveComment={SaveComment}
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
                    </>
                    : null
            }
        </div>
        )
}
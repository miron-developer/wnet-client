import { useEffect, useState } from "react";

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

const SPostWrapper = styled.div`
    padding: 2rem;
`;

const localLib = {
    'notHaveClippedFiles': Library.getText('general.notHaveClippedFiles'),
    'notLoadComments': Library.getText('general.notLoadComments'),
}

const loadComments = (id, getPart = ()=>{}) => getPart('comments', { 'type': 'post', 'id': id, 'count': 'many' }, localLib.notLoadComments, true);

export default function PostPage({ history }) {
    const ID = window.location.pathname.split('/')[2];
    const [isHaveAccess, setHaveAccess] = useState();
    const [isLoadedComments, setLoadedComments] = useState(false);
    const [isLoadedFiles, setLoadedFiles] = useState(false);
    const [clippedFiles, setClippedFiles] = useState([]);

    const { datalist, isStopLoad, setDataList, getPart } = useFromTo();
    
    const addComments = (...newComments) => setDataList([...datalist, ...newComments]);

    useEffect(() => {
        if (!isHaveAccess) return null;
        if (!isLoadedFiles) {
            GetAll('files', { 'type': 'post', 'id': ID }, localLib.notHaveClippedFiles, setClippedFiles)
            setLoadedFiles(true);
        }
        if (!isLoadedComments) {
            loadComments(ID, getPart);
            setLoadedComments(true);
        }
    }, [ID, isLoadedFiles, isLoadedComments, isHaveAccess, history, getPart]);

    if (isHaveAccess === false) return history.push("/") || null;

    return (
        <SPostWrapper>
            <PostItem id={ID} setHaveAccess={setHaveAccess} />

            <SClippedFilesWrapper>
                <ClippedFiles files={clippedFiles} />
            </SClippedFilesWrapper>
            
            <LeaveCommentPlash id={ID} type="post" addComments={addComments} />
            
            <Comments
                comments={datalist}
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
        </SPostWrapper>
    )
}
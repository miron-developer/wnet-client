import { useEffect, useState } from "react";

import { Library } from "constants/language";
import { GetAll } from "functions/api";
import { RandomKey } from "functions/content";
import { ScrollHandler } from "functions/effects";
import { useFromTo } from "functions/hooks";
import ClippedFiles from 'common/clipped-files-plash/plash';
import LeaveCommentPlash from 'common/leave-comment-plash/plash';

import CommentItem from 'common/comments/comment-item/item';
import styled from "styled-components";

const SCommentsWrapper = styled.div`
    margin: 1rem;
    padding: 1rem;
    border-radius: 10px;
    box-shadow: var(--boxShadow);
    background: #0000001a;

    & h3 {
        text-align: center;
        color: var(--onHoverColor);
    }
`;

const SComments = styled.div`
    max-height: 60rem;
    overflow: auto;
`;

const SCommentWrapper = styled.div`
    padding: 1rem;
    margin: 1rem;
    border-radius: 10px;
    background: #a08188;
    box-shadow: var(--boxShadow);
`;


const SAnswerComment = styled.div`
    width: 85%;
    margin-left: auto;
`;

const SClippedFiles = styled.div`
    margin: 1rem;
    padding: 1rem;
    height: 20rem;
    overflow: auto;
`;

const SCommentAnswers = styled(SAnswerComment)``;

const localLib = {
    'notLoadClippedFiles': Library.getText('general.notHaveClippedFiles'),
    'notLoadComments': Library.getText('general.notLoadComments'),
    'answers': Library.getText('common.comments.answers'),
    'comments': Library.getText('common.comments.comments'),
}

export const OneComment = (props) => {
    const [files, setFiles] = useState([]);
    const [isOpenedCommentPlash, setOpened] = useState(false);
    const [isOpenedAnswers, setOpenedAnswers] = useState(false);
    const [isLoadedAnswers, setLoadedAnswers] = useState(false);
    const {datalist, isStopLoad, setDataList, getPart} = useFromTo([], 10);

    const addComments = (...newComments) => setDataList([...datalist, ...newComments]);
   
    useEffect(() => {
        if (props.isHaveClippedFiles) GetAll('files', {'type': 'comment', 'id': props.id}, localLib.notLoadClippedFiles, setFiles);
        if (isOpenedAnswers && !isLoadedAnswers) {
            getPart('comments', { 'type': 'comment', 'id': props.id }, localLib.notLoadComments, true);
            setLoadedAnswers(true);
        }
    }, [isOpenedAnswers, isLoadedAnswers, props, getPart])

    return !props.id ? null : (
        <SCommentWrapper>
            <CommentItem
                isOpenedCommentPlash={isOpenedCommentPlash}
                isOpenedAnswers={isOpenedAnswers}
                setOpened={setOpened}
                setOpenedAnswers={setOpenedAnswers}
                {...props}
            />

            {
                isOpenedCommentPlash 
                    ? <SAnswerComment>
                        <LeaveCommentPlash isAnswer={true} id={props.id} type="comment" addComments={addComments} /> 
                    </SAnswerComment>
                    : null
            }

            {
                isOpenedAnswers && !props.isAnswer
                    ? <SCommentAnswers>
                        <Comments 
                            comments={datalist} 
                            isAnswer={true}
                            onScroll={
                                e => ScrollHandler(
                                    e, 
                                    isStopLoad, 
                                    false, 
                                    () => getPart(
                                        'comments', 
                                        { 'type': 'comment', 'id': props.id }, 
                                        localLib.notLoadComments, 
                                        true,
                                    )
                                )
                            } 
                        />
                    </SCommentAnswers>
                    : null
            }

            {
                props.isHaveClippedFiles
                    ? <SClippedFiles>
                        <ClippedFiles files={files} />
                    </SClippedFiles>
                    : null
            }
        </SCommentWrapper>
    )
}

export default function Comments({ isAnswer = false, comments = [], onScroll = ()=>{} }) {
    return (
        <SCommentsWrapper>
            <h3 className="comments-title">
                {isAnswer ? localLib.answers : localLib.comments}:
            </h3>
            <SComments onScroll={onScroll}>
                {comments.map(comment => <OneComment key={RandomKey()} {...comment} />)}
            </SComments>
        </SCommentsWrapper>
    )
}
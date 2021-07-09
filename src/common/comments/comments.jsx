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

const SWriteFirstComment = styled.div`
    margin: 1rem;
    text-align: center;
    color: var(--onHoverColor);
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
    'notHaveClippedFiles': Library.getText('general.notHaveClippedFiles'),
    'notLoadComments': Library.getText('general.notLoadComments'),
    'answers': Library.getText('common.comments.answers'),
    'comments': Library.getText('common.comments.comments'),
    'writeFirstComment': Library.getText('common.comments.writeFirstComment'),
}

const loadComments = (id, getPart = ()=>{}) => getPart('comments', { 'type': 'comment', 'id': id, 'count': 'many'}, localLib.notLoadComments, true);

export const OneComment = (props) => {
    const [comment, setComment] = useState({});
    const [files, setFiles] = useState([]);
    const [isOpenedCommentPlash, setOpened] = useState(false);
    const [isOpenedAnswers, setOpenedAnswers] = useState(false);
    const [isLoadedAnswers, setLoadedAnswers] = useState(false);
    const [isLoadedFiles, setLoadedFiles] = useState(false);
    const {datalist, isStopLoad, setDataList, getPart} = useFromTo([], 10);

    const addComments = (...newComments) => setDataList([...datalist, ...newComments]);
    const changeComment = (newFields = {}) => setComment(Object.assign({}, comment, newFields));

    useEffect(() => {
        if (props.id && !comment.id) return setComment({...props});
        if (comment.isHaveClippedFiles && !isLoadedFiles) {
            GetAll('files', {'type': 'comment', 'id': comment.id}, localLib.notHaveClippedFiles, setFiles);
            setLoadedFiles(true);
        }
        if (comment.isHaveChild && isOpenedAnswers && !isLoadedAnswers) {
            loadComments(comment.id, getPart);
            setLoadedAnswers(true);
        }
    }, [isOpenedAnswers, isLoadedFiles, isLoadedAnswers, comment, props, getPart])

    return !comment.id ? null : (
        <SCommentWrapper>
            <CommentItem
                isOpenedCommentPlash={isOpenedCommentPlash}
                isOpenedAnswers={isOpenedAnswers}
                setOpened={setOpened}
                setOpenedAnswers={setOpenedAnswers}
                {...comment}
            />

            {
                isOpenedCommentPlash 
                    ? <SAnswerComment>
                        <LeaveCommentPlash 
                            isHaveChild={comment.isHaveChild}
                            isAnswer={true}
                            id={comment.id}
                            type="comment" 
                            addComments={addComments} 
                            changeComment={changeComment} 
                        /> 
                    </SAnswerComment>
                    : null
            }

            {
                isOpenedAnswers && !comment.isAnswer
                    ? <SCommentAnswers>
                        <Comments 
                            comments={datalist} 
                            isAnswer={true}
                            onScroll={
                                e => ScrollHandler(
                                    e, 
                                    isStopLoad, 
                                    false, 
                                    () => loadComments(comment.id, getPart)
                                )
                            } 
                        />
                    </SCommentAnswers>
                    : null
            }

            {
                comment.isHaveClippedFiles
                    ? <SClippedFiles>
                        <ClippedFiles files={files} />
                    </SClippedFiles>
                    : null
            }
        </SCommentWrapper>
    )
}

export default function Comments({ comments = [], isAnswer = false, onScroll = ()=>{} }) {
    return (
        <SCommentsWrapper>
            <h3 className="comments-title">
                {isAnswer ? localLib.answers : localLib.comments}:
            </h3>

            {
                comments.length === 0
                ? <SWriteFirstComment>{localLib.writeFirstComment}</SWriteFirstComment>
                : <SComments onScroll={onScroll}> {comments.map(comment => <OneComment key={RandomKey()} {...comment} />)}</SComments>
            }
        </SCommentsWrapper>
    )
}
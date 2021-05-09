import { useEffect, useState } from "react";

import { CLIPPED_FILE_AUDIO, CLIPPED_FILE_FILE, CLIPPED_FILE_IMG, CLIPPED_FILE_VIDEO } from "constants/mocks";
import { Library } from "constants/language";
import { GetAll } from "functions/api";
import { ScrollHandler } from "functions/effects";
import { useFromTo } from "functions/hooks";
import Avatar from 'common/avatar/avatar';
import Datetime from 'common/datetime/datetime';
import Like from 'common/like/like';
import ClippedFiles from 'common/clipped-files-plash/plash';
import LeaveCommentPlash from 'common/leave-comment-plash/plash';

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

const SComment = styled(SCommentWrapper)`
    display: flex;
    align-items: center;
    background: var(--offHoverBG);
    transition: var(--transitionApp);

    &:hover {
        background: var(--onHoverBG);
        transition: var(--transitionApp);
    }
`;

const SCommentUser = styled.div`
    margin: .5rem;
    text-align: center;
`;

const SCommentSideWrapper = styled.div`
    width: 100%;
`;

const SCommentSide = styled.div`
    margin: .5rem;
`;

const SCommentBody = styled.div`
    padding: .5rem;
    color: #000000;
    border-radius: 5px;
    background: rgba(107, 91, 149, 0.24);
`;

const SCarmaDatetime = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin: .5rem 0;
`;

const SCommentActionsWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

const SCommentAction = styled.div`
    margin: .5rem;
    background: #ffffff2b;
    border-radius: 5px;
    padding: .5rem;
    cursor: pointer;

    & span {
        margin-left: 5px;
    }
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

export const OneComment = ({ 
        id, body, isLiked, carma, datetime, isHaveClippedFiles, isHaveAnswer, isAnswer, 
        lName, fName, avatar,
        saveComment = ()=>{}
    }) => {
    const [files, setFiles] = useState([CLIPPED_FILE_IMG, CLIPPED_FILE_AUDIO, CLIPPED_FILE_VIDEO, CLIPPED_FILE_FILE]);
    const [isOpenedCommentPlash, setOpened] = useState(false);
    const [isOpenedAnswers, setOpenedAnswers] = useState(false);
    const [isStopLoad, setStopLoad] = useState(false);
    const {datalist, setDataList, getPart} = useFromTo([], 10);

    const addComments = (...newComments) => setDataList([...datalist, ...newComments]);
   
    useEffect(() => {
        if (isHaveClippedFiles) {
            GetAll('files', {'type': 'comment', 'commentID': id}, Library.getText('common.comments.notLoadClippedFiles'), setFiles)
        }
        if (isOpenedAnswers) {
            getPart('comments', { 'type': 'comment', 'id': id }, Library.getText('common.comments.notLoadComments'), true, setStopLoad);
        }
    }, [id, isOpenedAnswers, isHaveClippedFiles, getPart])
    
    if (!id) return null;

    return (
        <SCommentWrapper>
            <SComment>
                <SCommentUser>
                    <Avatar avatar={avatar} size="" />
                    <span>{lName + ' ' + fName}</span>
                </SCommentUser>

                <SCommentSideWrapper>
                    <SCommentSide>
                        <SCommentBody>{body}</SCommentBody>

                        <SCarmaDatetime>
                            <Like id={id} carma={carma} isLiked={isLiked} type="comment" />
                            <Datetime datetime={datetime} />
                        </SCarmaDatetime>
                    </SCommentSide>

                    <SCommentActionsWrapper>
                        { 
                            !isAnswer 
                                ? <SCommentAction onClick={() => setOpened(!isOpenedCommentPlash)}>
                                    <span><i className="fa fa-comment" aria-hidden="true"></i></span>
                                    <span>{Library.getText('common.comments.answer')}</span>
                                </SCommentAction>
                                : null
                        }

                        { 
                            isHaveAnswer 
                            ? <SCommentAction onClick={() => setOpenedAnswers(!isOpenedAnswers)} >
                                <span><i className="fa fa-comments" aria-hidden="true"></i></span>
                                <span>{Library.getText('common.comments.showAnswers')}</span>
                            </SCommentAction> 
                            : null
                        }
                    </SCommentActionsWrapper>
                </SCommentSideWrapper>
            </SComment>

            {
                isOpenedCommentPlash 
                    ? <SAnswerComment>
                        <LeaveCommentPlash id={id} type="comment" saveComment={(params = {}) => saveComment(params, addComments)} /> 
                    </SAnswerComment>
                    : null
            }

            {
                isOpenedAnswers
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
                                        { 'type': 'comment', 'id': id }, 
                                        Library.getText('common.comments.notLoadComments'), 
                                        true, 
                                        setStopLoad
                                    )
                                )
                            } 
                        />
                    </SCommentAnswers>
                    : null
            }

            <SClippedFiles>
                <ClippedFiles files={files} />
            </SClippedFiles>
        </SCommentWrapper>
    )
}

export default function Comments({ isAnswer = false, comments = [], saveComment = ()=>{}, onScroll = ()=>{} }) {
    return (
        <SCommentsWrapper>
            <h3 className="comments-title">
                {isAnswer ? Library.getText('common.comments.answers') : Library.getText('common.comments.comments')}:
            </h3>
            <SComments onScroll={onScroll}>
                {comments.map(comment => <OneComment key={Math.random()*Math.random()} {...comment} saveComment={saveComment} />)}
            </SComments>
        </SCommentsWrapper>
    )
}
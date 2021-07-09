import { Library } from 'constants/language';
import Avatar from 'common/avatar/avatar';
import Datetime from 'common/datetime/datetime';
import Like from 'common/like/like';

import styled from "styled-components";

const SComment = styled.div`
    padding: 1rem;
    margin: 1rem;
    border-radius: 10px;
    background: #a08188;
    box-shadow: var(--boxShadow);
    display: flex;
    background: var(--offHoverBG);
    transition: var(--transitionApp);

    &:hover {
        background: var(--onHoverBG);
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

const localLib = {
    'answer': Library.getText('common.comments.answer'),
    'showAnswers': Library.getText('common.comments.showAnswers'),
}

export default function CommentItem({ 
    id, avatar, nickname, body, carma, datetime, isAnswer, isHaveChild, isLiked, 
    isOpenedCommentPlash, isOpenedAnswers, setOpened, setOpenedAnswers 
}) {
    return (
        <SComment>
            <SCommentUser>
                <Avatar avatar={avatar} size="4rem" />
                <span>{nickname}</span>
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
                        isAnswer
                            ? null 
                            : <SCommentAction onClick={() => setOpened(!isOpenedCommentPlash)}>
                                <span><i className="fa fa-comment" aria-hidden="true"></i></span>
                                <span>{localLib.answer}</span>
                            </SCommentAction>
                    }
                    { 
                        isHaveChild
                        ? <SCommentAction onClick={() => setOpenedAnswers(!isOpenedAnswers)} >
                            <span><i className="fa fa-comments" aria-hidden="true"></i></span>
                            <span>{localLib.showAnswers}</span>
                        </SCommentAction> 
                        : null
                    }
                </SCommentActionsWrapper>
            </SCommentSideWrapper>
        </SComment>
    )
}
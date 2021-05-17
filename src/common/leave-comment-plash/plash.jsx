import { useState } from "react";

import { Library } from "constants/language";
import { UploadFile } from "functions/file";
import Clips from 'common/clips/clips';
import SendText from 'common/send-text/msg';

import styled from "styled-components";
import { SaveComment } from "functions/api";
import { USER } from "constants/constants";

const SOneBtn = styled.div`
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${props => props.color ? props.color : 'rgba(255, 255, 255, 0.38)'}; 
    border-radius: 50px;
    cursor: pointer;

    & img {
        width: 80%;
        height: 80%;
    }

    &:hover {
        background: var(--purpleColor);
    }
`;

const SCommentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    margin: 1rem;
    background: rgba(0, 12, 116, 0.29);
    border-radius: 10px;
    box-shadow: var(--boxShadow);

    & > span {
        margin: 1rem;
        font-size: 1rem;
        font-weight: bold;
    }
`;

const SCommentInputWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
`;

const sendTextMsg = async(value = "", preloadedFiles = [], params = {}, updText = ()=>{}, setFiles = ()=>{}, addComments = (...comments)=>{}) => {
    if (value === "") return;
    
    params['body'] = value;
    const commentID = await SaveComment(params);

    params.id = commentID;
    params.datetime = Date.now().toString();
    params.avatar = USER.avatar;
    params.nickname = USER.nickname;
    params.userID = USER.id;
    addComments(params);
    
    if (preloadedFiles.length > 0) {
        preloadedFiles.forEach(file => UploadFile(file.type, file.file, 'comment', commentID));
        setFiles([]);
    }
    updText('');
}

const OneBtn = ({color, alt, srcIcon, onClick}) => {
    return (
        <SOneBtn color={color} onClick={onClick}>
            <img src={srcIcon} alt={alt} />
        </SOneBtn>
    )
}

export default function LeaveCommentPlash({ type, id, isAnswer = false, addComments }) {
    const [preloadedFiles, setFiles] = useState([]);
    const params = {
        'type': 'comment',
        'commentType': type,
        'id': id,
        'isAnswer': isAnswer ? 1 : 0,
    }

    return (
        <SCommentWrapper>
            <span>{Library.getText('common.leave-comment-plash.writeComment')}</span>

            <SCommentInputWrapper>
                <Clips Wrapper={OneBtn} preloadedFiles={preloadedFiles} setFiles={setFiles} />
            
                <SendText Wrapper={OneBtn} send={(value, updText) => sendTextMsg(value, preloadedFiles, params, updText, setFiles, addComments)} />
            </SCommentInputWrapper>
        </SCommentWrapper>
    )
}
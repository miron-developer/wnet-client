import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Library } from 'constants/language';
import { GetOne } from 'functions/api';
import Avatar from 'common/avatar/avatar';
import Like from 'common/like/like';
import Datetime from 'common/datetime/datetime';

import styled from 'styled-components';

const SPostUser = styled.div`
    width: 20%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const SPostUserName = styled.div`
    padding: .5rem;
    margin: .5rem;
    color: var(--offHoverColor);
    background: var(--purpleColor);
    border-radius: 5px;
    transition: var(--transitionApp);
    word-break: break-word;
`;

const SPostInfo = styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;

    & > div {
        margin: 5px;
    }
`;

const SPostTitle = styled.div`
    text-align: center;
    text-transform: uppercase;
    color: #000000;
`;

const SPostBody = styled.div`
    padding: .5rem;
    height: 100%;
    color: #000000;
    border-radius: 5px;
    background: rgba(107, 91, 149, 0.24);
`;

const SPostAdditionalInfo = styled.div`
    display: flex;
    justify-content: space-between;
`;

const SPost = styled.div`
    display: flex;
    padding: 1rem;
    margin: 1rem;
    text-decoration: none;
    background: var(--offHoverBG);
    border: 2px solid var(--offHoverBG);
    border-radius: 10px;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.25);
    transition: var(--transitionApp);

    &:hover {
        background: var(--onHoverBG);
    }

    &:hover ${SPostUserName} {
        color: var(--onHoverColor);
    }
`;

export default function PostsItem({id, setHaveAccess = ()=>{}}) {
    const [post, setPost] = useState({});

    useEffect(() => {
        if (post && Object.values(post).length === 0) {
            GetOne({'id': id}, "post", Library.getText('post.notLoadPost'), setPost)
                .then(done => done === true ? setHaveAccess(true) : setHaveAccess(false))
        }
    }, [id, post, setHaveAccess])
    
    const ava = post.userID ? post.userAvatar : post.groupAvatar;
    const name = post.userID ? post.nickname : post.groupTitle;

    return Object.values(post).length === 0 ? <SPost>you dont have access to this post</SPost> : (
        <SPost as={Link} to={`/${Library.getText('common.routes.post')}/${id}`}>
            <SPostUser>
                <Avatar isUser={true} avatar={ava} status={post.status} />
                <SPostUserName>{name}</SPostUserName>
            </SPostUser>
            <SPostInfo>
                <SPostTitle>{post.title}</SPostTitle>
                <SPostBody>{post.body}</SPostBody>
                <SPostAdditionalInfo>
                    <Like id={id} carma={post.carma} isLiked={post.isLiked} type="post" />
                    <Datetime datetime={post.datetime} />
                </SPostAdditionalInfo>
            </SPostInfo>
        </SPost>
    )
}
import { ToFollow } from 'functions/user';
import { ReadableCount } from 'functions/content';
import Avatar from 'common/avatar/avatar';

import styled from 'styled-components';

const SProfileAvatar = styled.div`
    margin: 1rem;
`;

const SProfileDataWrapper = styled.div`
    width: 100%;
    align-self: normal;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin: 0 1rem;
`;

const SProfileAboutWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    padding: .5rem 1rem;
    width: 100%;

    & span {
        color: #000000;
    }
`;

const SProfileSubsBtn = styled.div`
    font-size: 2rem;
    color: var(--violetColor);
`;

const onClick = (e, id, isUser, isPrivate) => e.preventDefault() || ToFollow(id, isUser, isPrivate ? 0 : 2);

export default function ResultProfile({id, type, avatar, status, fName, lName, title, aboutMe, description, isPrivate, followers, members, Link}) {
    const isUser = type === 'user' ? true : false;
    const name = isUser ? lName + ' ' + fName : title;
    const about = isUser ? aboutMe : description;
    const count = isUser ? followers : members;

    return (
        <Link to={`/${type}/${id}`}>
            <SProfileAvatar>
                <Avatar isUser={isUser} avatar={avatar} status={status} />
            </SProfileAvatar>

            <SProfileDataWrapper>
                <h2 className="result-item-title">{name}</h2>
                <SProfileAboutWrapper>
                    <span>{about}</span>
                    <span>{ReadableCount(count)} {isUser?'follows':'members'}</span>
                </SProfileAboutWrapper>
            </SProfileDataWrapper>

            <SProfileSubsBtn onClick={e => onClick(e, id, isUser, isPrivate)} >
                <i className='fa fa-user-plus' aria-hidden="true"></i>
            </SProfileSubsBtn>
        </Link>
    );
}
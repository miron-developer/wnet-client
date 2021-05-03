import { Link } from 'react-router-dom';

import { Library } from 'constants/language';
import Avatar from 'common/avatar/avatar';

import styled from 'styled-components';


const SGroupBody = styled.div`
    width: 100%;
    align-self: normal;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin: 0 1rem;
`

const SGroupName = styled.span`
    color: var(--offHoverColor);
    transition: var(--transitionApp);
`

const SDescriptionWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: .5rem 1rem;
    width: 100%;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);

    /* group name */
    & > span {
        color: #000000;
    }
`

const SGroup = styled(Link)`
    display: flex;
    align-items: center;
    padding: 1rem;
    margin: 1rem;
    background: var(--offHoverBG);
    text-decoration: none;
    border: 2px solid var(--offHoverBG);
    border-radius: 10px;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.25);
    transition: var(--transitionApp);

    &:hover {
        background: var(--onHoverBG);
    }

    /* additional margin for avatar */
    & > *:first-child {
        margin: 1rem;
    }

    &:hover ${SGroupName} {
        color: var(--onHoverColor);
    }
`

export default function ProfileItem({id, type, avatar, status, nickname, title, aboutMe, description}) {
    const isUser = type === 'user' ? true : false;
    const name = isUser ? nickname : title;
    const desc = isUser ? aboutMe : description;

    return (
        <SGroup to={'/'+Library.getText('common.routes.'+type)+'/'+id} >
            <Avatar isUser={type === 'user'} avatar={avatar} status={status} isNeedBorder={false} />

            <SGroupBody>
                <SGroupName>{name}</SGroupName>
                <SDescriptionWrapper>
                    <span>{desc}</span>
                </SDescriptionWrapper>
            </SGroupBody>
        </SGroup>
    )
}
import { Link } from 'react-router-dom';

import { ClosePopup } from 'common/popup/popup';
import { Library } from 'constants/language';
import Avatar from 'common/avatar/avatar';

import styled from 'styled-components';

const SProfileItemWrapper = styled(Link)`
    height: max-content;
    text-decoration: none;
`;

const SProfileItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    margin: 1rem;
    width: 15rem;
    height: 15rem;
    border-radius: 10px;
    background: var(--darkRedColor);
    box-shadow: var(--boxShadow);
`;

const SProfileItemName = styled.div`
    margin: auto;
    color: var(--offHoverColor);
`;

export default function ProfileItem({type, id, avatar, status, fName, lName, title}) {
    const isUser = type === 'user' ? true : false;
    const name = isUser ? lName + " " + fName : title;

    return (
        <SProfileItemWrapper to={"/"+Library.getText('common.routes.'+type)+"/"+id} onClick={ClosePopup} >
            <SProfileItem>
                <Avatar isUser={isUser} avatar={avatar} status={status} />

                <SProfileItemName>{name}</SProfileItemName>
            </SProfileItem>
        </SProfileItemWrapper>
    )
}
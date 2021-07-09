import { Library } from 'constants/language';
import Avatar from 'common/avatar/avatar';
import Like from 'common/like/like';
import Datetime from 'common/datetime/datetime';

import styled from 'styled-components';

const SVideoData = styled.div`
    display: flex;
    margin: .5rem;
`;

const SVideoDataWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 1rem;
`;

const SVideoPreview = styled.div`
    width: 6rem;

    & img {
        width: 100%;
        height: 100%;
    }
`;

const SVideoInfo = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const SVideoAdditionalInfo = styled.div`
    display: flex;
    justify-content: space-between;
    width: 80%;
    padding: 5px;
    left: 10%;
    background: #00000066;
    border-radius: 10px;
`;

export default function ResultVideo({id, title, preview, status, userAvatar, carma, datetime, isLiked, nickname, userID, groupAvatar, groupTitle, Link}) {
    const ava = userID ? userAvatar : groupAvatar;
    const name = userID ? nickname : groupTitle;

    return (
        <Link isVideo={true} to={`/${Library.getText('common.routes.video')}/${id}`} >
            <SVideoInfo>
                <SVideoData>
                    <Avatar isUser={userID ? true : false} avatar={ava} status={status} size="" />
                    <SVideoDataWrapper className="result-item-title">
                        <span className="video-data-username">{name}</span>
                        <span className="video-data-title">{title}</span>
                    </SVideoDataWrapper>
                </SVideoData>
                
                <SVideoPreview>
                    <img src={preview} alt="video preview"/>
                </SVideoPreview>
            </SVideoInfo>
            <SVideoAdditionalInfo>
                <Like id={id} carma={carma} isLiked={isLiked} type="media" />
                <Datetime datetime={datetime} />
            </SVideoAdditionalInfo>
        </Link>
    ); 
}
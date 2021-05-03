import Avatar from 'common/avatar/avatar';

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

export default function ResultVideo({id, fName, lName, avatar, status, title, preview, Link}) {
    const name = lName + ' ' + fName;
    
    return (
        <Link width='calc(50% - 4rem)' to={`/video/${id}`} >
            <SVideoData>
                <Avatar isUser={false} avatar={avatar} status={status} size="" isNeedBorder={false} />
                <SVideoDataWrapper className="result-item-title">
                    <span className="video-data-username">{name}</span>
                    <span className="video-data-title">{title}</span>
                </SVideoDataWrapper>
            </SVideoData>
            <SVideoPreview>
                <img src={preview} alt="video preview"/>
            </SVideoPreview>
        </Link>
    ); 
}
import { Library } from 'constants/language';
import { CalculateRelativeDatetime } from 'functions/content';

import styled, { css } from 'styled-components';

const SAvaAndStatus = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const SAvatar = styled.div`
    width: ${props => props.size ? props.size : ''};
    height: ${props => props.size ? props.size : ''};
    
    & img {
        width: 100%;
        height: 100%;
    }
`

const SStatusOver = css`
    position: absolute;
    right: 0;
    bottom: 0;
`;

const SStatusText = css`
    display: flex;
    align-items: center;
`;

const SStatus = styled.div`
    color: var(--onHoverColor);
    ${props => props.isOver ? SStatusOver : SStatusText}
    
    & i {
        color: ${props => props.isOnline ? 'lime' : 'var(--redColor)'};
    }
`

const ComputeStatusText = ({status, isNeedText}) => {
    const isOnline = status === 'online';
    const statusText = isOnline
        ? Library.getText('common.avatar.statusTextOnline') 
        : Library.getText('common.avatar.statusTextOffline') + ' ' + CalculateRelativeDatetime(status);
    
    return (
        <SStatus isOnline={isOnline} isOver={!isNeedText} >
            <i className="fa fa-circle" aria-hidden="true"></i>
            {isNeedText ? <span className="status-text">{statusText}</span> : null}
        </SStatus>
    )
}

const standardSizes = {
    'small': '6rem', 
    'big': '8rem',
};

export default function AvaAndStatus({isUser = true, avatar, status, isNeedText = false, size = 'small'}) {
    let realSize = standardSizes[size];
    if (!realSize) realSize = size;

    return (
        <SAvaAndStatus>
            <SAvatar size={realSize} >
                <img src={avatar} alt="avatar" />
            </SAvatar>

            {isUser && status ? <ComputeStatusText isUser={isUser} status={status} isNeedText={isNeedText} /> : null}
        </SAvaAndStatus>
    )
}
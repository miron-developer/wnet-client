import { Library } from 'constants/language';
import { CalculateRelativeDatetime } from 'functions/content';

import styled from 'styled-components';

const SAvaAndStatus = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const SAvatar = styled.div`
    width: ${props => props.size ? props.size : ''};
    height: ${props => props.size ? props.size : ''};

    &.border {
        border-radius: 10px;
        background: var(--purpleColor);
        overflow: hidden;
    }

    & img {
        width: 100%;
        height: 100%;
    }
`

const SStatus = styled.div`
    color: var(--onHoverColor);

    &.text {
        display: flex;
        align-items: center;
    }

    &.over {
        position: absolute;
        right: 0;
        bottom: 0;
    }

    &.online i {
        color: lime;
    }

    &.offline i {
        color: var(--redColor);
    }
`

const ComputeStatusText = ({status, isNeedText}) => {
    const offOrOn = status === 'online' ? 'online' : 'offline';
    const statusText = status === 'online' 
        ? Library.getText('common.avatar.statusTextOnline') 
        : Library.getText('common.avatar.statusTextOffline') + ' ' + CalculateRelativeDatetime(status);
    const position = isNeedText ? 'text' : 'over';
    
    return (
        <SStatus className={`${offOrOn} ${position}`}>
            <i className="fa fa-circle" aria-hidden="true"></i>
            {isNeedText ? <span className="status-text">{statusText}</span> : null}
        </SStatus>
    )
}

const standardSizes = {
    'small': '6rem', 
    'big': '8rem',
};

export default function AvaAndStatus({isUser = true, avatar, status, isNeedText = false, isNeedBorder = true, size = 'small'}) {
    const border = isNeedBorder ? 'border' : '';
    
    let realSize = standardSizes[size];
    if (!realSize) realSize = size;

    return (
        <SAvaAndStatus>
            <SAvatar size={realSize} className={`${border}`}>
                <img src={avatar} alt="avatar" />
            </SAvatar>

            {isUser && status ? <ComputeStatusText isUser={isUser} status={status} isNeedBorder={isNeedText} /> : null}
        </SAvaAndStatus>
    )
}
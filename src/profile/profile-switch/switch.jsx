import { Library } from 'constants/language';
import { DebouncedFuctionWithValue } from 'functions/effects';

import styled from 'styled-components';

const SPublcationsSwitch = styled.div`
    display: flex;
    align-items: center;
    margin: 1rem;
`;

const SPublicationsSwitchBtn = styled.div`
    padding: 1rem 2rem;
    background: ${props => props.isActive ? 'var(--violetColor)' : 'var(--purpleColor)'};
    text-transform: uppercase;
    cursor: pointer;
    transition: var(--transitionApp);

    &:hover {
        background: var(--violetColor);
    }

    &:first-child {
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
    }

    &:last-child {
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
    }
`;

const ToSwitch = DebouncedFuctionWithValue(2000);

const localLib = {
    'all': Library.getText('profile.switch.all'),
    'post': Library.getText('profile.switch.posts'),
    'event': Library.getText('profile.switch.events')
}

const publicationsTypes = {
    'all': localLib.all,
    'post': localLib.post,
    'event': localLib.event
}

// generate switch btns
export default function GSwitchPublications({publicationsType, setSwitchType}) {
    const GOneBtnSwitch = ({text}) => {
        return (
            <SPublicationsSwitchBtn 
                isActive={publicationsTypes[publicationsType] === text} 
                onClick={()=>ToSwitch(setSwitchType, Object.keys(publicationsTypes)[Object.values(publicationsTypes).indexOf(text)])} 
            >
                {text}
            </SPublicationsSwitchBtn>
        )
    }
        
    return (
        <SPublcationsSwitch>
            <GOneBtnSwitch text={localLib.all} />
            <GOneBtnSwitch text={localLib.post} />
            <GOneBtnSwitch text={localLib.event} />
        </SPublcationsSwitch>
    )
}
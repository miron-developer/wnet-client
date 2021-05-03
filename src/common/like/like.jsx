import { useState } from 'react';

import { Library } from 'constants/language';
import { POSTRequestWithParams } from 'functions/api';
import { Notify } from 'common/app-notification/notification';

import styled from 'styled-components';

const SCarma = styled.div`
    padding: 5px 20px;
    display: flex;
    align-items: center;
    color: var(--offHoverColor);
    background: ${props => props.isLikedState ? 'var(--darkRedColor)' : 'var(--purpleColor)'};
    border-radius: 10px;
    transition: var(--transitionApp);
    cursor: pointer;

    & i {
        color: var(--redColor);
    }
`;

const SCarmaCount = styled.div`
    margin: 0 5px;
`;


const useLikeFunction = (id, type, carma, isLiked) => {
    const [isLikedState, setLikedState] = useState(isLiked);
    const [newCarma, setCarma] = useState(carma);

    const LikeSaved = ({isLiked, carma}) => {
        setCarma(carma);
        setLikedState(isLiked);
        Notify('success', Library.getText('common.post-item.likeSaved'));
    }
    
    const SetLike = async(e) => {
        e.preventDefault();
        const res = await POSTRequestWithParams("/s/like", {
            'type': type,
            'id'  : id,
        })
        if (res.err !== "ok") return Notify('fail', Library.getText('common.post-item.likeNotSaved'));
        return LikeSaved(res.data);    
    }

    return {
        newCarma,
        isLikedState,
        SetLike,
    }
}

export default function Carma({ id, carma, isLiked, type }) {
    const { newCarma, isLikedState, SetLike } = useLikeFunction(id, type, carma, isLiked);
    
    return (
        <SCarma isLikedState={isLikedState} onClick={SetLike}>
            <i className="fa fa-heart" aria-hidden="true"></i>
            <SCarmaCount>{newCarma}</SCarmaCount>
        </SCarma>
    )
}
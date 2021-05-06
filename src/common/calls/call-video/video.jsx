import { useEffect, useRef } from 'react';

import styled from "styled-components";

const SVideoWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    grid-area : ${props => props.type};
    min-height: 20vh;
    height: ${props => {
        if (props.isFullSize && props.type !== 'main') return '40vh';
        if (props.isFullSize && props.type === 'main') return '80vh';
        return '100%';
    }};
    max-height: ${props => {
        if (props.isFullSize && props.type !== 'main') return '40vh';
        if (props.isFullSize && props.type === 'main') return '80vh';
        return '80vh';
    }};

    & video {
        width: 100%;
        height: 100%;
    }
`;

export default function CallVideo({isFullSize, type, poster, stream}) {
    const videoRef = useRef(null);
    useEffect(()=> videoRef.current ? videoRef.current.srcObject = stream : null);

    return (
        <SVideoWrapper isFullSize={isFullSize} type={type}>
            <video ref={videoRef} poster={poster} autoPlay={true} />
        </SVideoWrapper>
    )
}
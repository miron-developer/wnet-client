import { Library } from "constants/language";
import { GeneratePublications, SortArrOfObjByDatetime } from 'functions/content';

import styled from 'styled-components';

const SPublicationsTitle = styled.h2`
    color: var(--violetColor);
    text-align: center;
`;

const SProfilePrivate = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    & h2 {
        color: var(--redColor);
        text-transform: uppercase;
    }

    & p {
        text-transform: uppercase;
    }
`;

const SPublications = styled.div`
    height: 80vh;
    overflow: auto;
`;

// generate posts\events relatively from profile type and private type
export default function GPublications({isHaveAccess, isUser, publications, onScroll = ()=>{}}) {
    if (!isHaveAccess)
        return (
            <SProfilePrivate>
               <h2> {Library.getText(`profile.publications.private${isUser ? 'Acc' : 'Group'}`)} </h2>
               <p> {Library.getText(`profile.publications.sendRq${isUser ? 'Fr' : 'Memb'}`)} </p>
            </SProfilePrivate>
        )
    return (
        <>
            <SPublicationsTitle>{Library.getText('profile.publications.publications')} {publications.length}</SPublicationsTitle>
            <SPublications onScroll={onScroll}>
                {GeneratePublications(SortArrOfObjByDatetime(publications))}
            </SPublications>
        </>
    )
}
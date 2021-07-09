import { useEffect, useState } from 'react';

import { Library } from 'constants/language';
import { GeneratePublications } from 'functions/content';
import { useFromTo } from 'functions/hooks';
import { ScrollHandler } from 'functions/effects';

import styled from 'styled-components';

const SHome = styled.div`
    height: 86vh;
    padding: 2rem;
    overflow: auto;
`;

const loadNews = (getPart) => getPart('news', {}, Library.getText('home.notLoad'), true);

export default function Home() {
    const [isLoaded, setLoaded] = useState(false)
    const { datalist, isStopLoad, getPart } = useFromTo([], 5);

    useEffect(()=> {
        if (datalist.length === 0 && !isLoaded) {
            loadNews(getPart);
            setLoaded(true);
        }
    }, [datalist, isLoaded, getPart]);

    return (
        <SHome onScroll={e => ScrollHandler(e, isStopLoad, false, () => loadNews(getPart))}>
            {GeneratePublications(datalist)}
        </SHome>
    )
}

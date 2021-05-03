import { useEffect, useState } from 'react';

import { Library } from 'constants/language';
import { GeneratePublications } from 'functions/content';
import { useFromTo } from 'functions/hooks';
import { ScrollHandler } from 'functions/effects';

import styled from 'styled-components';

const SHome = styled.div`
    height: 86vh;
    overflow: auto;
`;

export default function Home() {
    const [isLoaded, setLoaded] = useState(false)
    const { datalist, isStopLoad, getPart } = useFromTo([], 20);

    useEffect(()=> {
        if (datalist.length === 0 && !isLoaded) {
            getPart('news', {}, Library.getText('home.notLoad'), true);
            setLoaded(true);
        }
    }, [datalist, isLoaded, getPart]);

    return (
        <SHome
            onScroll={e => ScrollHandler(e, isStopLoad, false, () => getPart('news', {}, Library.getText('home.notLoad'), true))}
        >
            {GeneratePublications(datalist)}
        </SHome>
    )
}

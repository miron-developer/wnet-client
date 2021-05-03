import { Link } from 'react-router-dom';

import { RandomKey } from 'functions/content';
import PostItem from 'common/post-item/post';

import ResultProfile from 'search/search-result/result-profile/profile';
import ResultVideo from 'search/search-result/result-video/video';
import styled from 'styled-components';

export const SSearchResultItem = styled(Link)`
    width: ${props => props.width ? props.width : '100%'};
    padding: 1rem;
    margin: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-decoration: none;
    background: var(--offHoverBG);
    box-shadow: var(--boxShadow);
    border-radius: 5px;
    transition: var(--transitionApp);

    &:hover {
        background: var(--onHoverBG);
        transition: var(--transitionApp);
    }

    & .result-item-title {
        margin: 0;
        color: var(--offHoverColor);
        transition: var(--transitionApp);
    }

    &:hover .result-item-title {
        color: var(--onHoverColor);
        transition: var(--transitionApp);
    }
`;

export default function GResult({datas = []}) {
    return datas.map(item => {
        if (item.type === 'post') return <PostItem key={RandomKey()} {...item} />;
        if (item.type === 'user' || item.type === 'group') return <ResultProfile key={RandomKey()} {...item} Link={SSearchResultItem} />
        return <ResultVideo key={RandomKey()} {...item} Link={SSearchResultItem} />
    });
}
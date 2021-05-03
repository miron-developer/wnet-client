import { useLocation } from 'react-router';

import { Library } from 'constants/language';

import styled from 'styled-components';

const SPageID = styled.div`
    padding: 5px 20px;
    min-width: 30%;
    width: ${props => props.isSign ? '50%' : 'auto'};
    color: var(--onHoverColor);
    text-transform: uppercase;
    font-weight: bold;
    background: rgba(255, 255, 255, 0.41);
    border-radius: 5px;
    white-space: nowrap;
    box-shadow: var(--boxShadow);
`

export default function PageID() {
    const cur_url = decodeURI(useLocation().pathname).split('/');
    cur_url[0] = Library.getText('common.header.page-id.home');    
    return <SPageID isSign={cur_url.includes('sign')}> {cur_url.join(' > ')} </SPageID>   
}

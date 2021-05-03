import { Library } from 'constants/language';
import AppNotifications from 'common/app-notification/notification';

import styled from 'styled-components';

const SFooter = styled.footer`
    grid-area: footer;
    background: var(--purpleColor);
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    & > div {
        
    }

    & a {
        margin: 1rem;
    }
`

const SFooterDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;    
`

const SFooterRight = styled(SFooterDiv)`
    & a {
        text-transform: capitalize;
        color: var(--offHoverColor);
    }
`

const SFooterGithubs = styled(SFooterDiv)`
    & a {
        color: var(--onHoverColor);
    }
`

export default function Footer() {
    return (
        <SFooter>
            <SFooterRight className="footer-rights">
                <a download href={`/rights/${window.localStorage.getItem('lang')}/T&Cs.docx`}>{Library.getText('common.footer.rights.terms')}</a>
                <a download href={`/rights/${window.localStorage.getItem('lang')}/PP.docx`}>{Library.getText('common.footer.rights.privacy')}</a>
            </SFooterRight>

            <SFooterGithubs className="footer-githubs">
                <i className="fa fa-github" aria-hidden="true"></i>
                <a href="https://github.com/miron-developer" rel="noreferrer" target="_blank">Miron</a>
                <i className="fa fa-github" aria-hidden="true"></i>
                <a href="https://github.com/mirask" rel="noreferrer" target="_blank">Miras</a>
            </SFooterGithubs>

            <AppNotifications />
        </SFooter>
    )
}
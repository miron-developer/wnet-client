import { withRouter } from "react-router";

import { Library } from "constants/language";

import styled from "styled-components";

const SLang = styled.div`
    margin: 1rem 0;
    padding: 1rem;
    width: 100%;
    color: var(--onHoverColor);
    border-radius: 5px;
    background: #ffffff21;
`;

const SLangsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: .5rem;
`;

const SOneLang = styled.span`
    padding: 5px;
    margin: 5px;
    color: ${props => props.isActive ? 'var(--onHoverColor)' : '#000000'};
    border-radius: 5px;
    background: ${props => props.isActive ? 'var(--purpleColor)' : '#ffffff38'};
    cursor: pointer;
`;

const setLang = short => {
    window.localStorage.setItem('lang', short);
    Library.lang = short;
    
    const pathOnNewLang = Library.calculatePath(Library.common.routes, decodeURI(window.location.pathname).split('/'));
    window.location.replace(pathOnNewLang);
}

const OneLang = ({lang, short}) => <SOneLang isActive={short===Library.lang} onClick={()=>setLang(short)}>{lang}</SOneLang>

export const Language = () => {
    return (
        <SLang>
            <span>Language:</span>
            <SLangsWrapper>
                <OneLang short="en" lang="English"   />
                <OneLang short="ru" lang="Русский"   />
                <OneLang short="kz" lang="Казахский" />
            </SLangsWrapper>
        </SLang>
    )
}

export default withRouter(Language);
import { withRouter } from "react-router";

import { Library } from "constants/language";

import styled from "styled-components";

const SLang = styled.div`
    margin: 1rem 0;
    padding: 1rem;
    border-radius: 5px;
    background: #ffffff21;
`;

const STitle = styled.span`
    color: var(--onHoverColor);
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

const onClick = short => {
    window.localStorage.setItem('lang', short);
    Library.lang = short;
    
    const pathOnNewLang = Library.calculatePath(Library.common.routes, decodeURI(window.location.pathname).split('/'));
    window.location.replace(pathOnNewLang);
}

const OneLang = ({lang, short, active}) => <SOneLang isActive={short===active} onClick={()=>onClick(short)}>{lang}</SOneLang>

export const Language = () => {
    const active = Library.lang;

    return (
        <SLang>
            <STitle>Language:</STitle>
            <SLangsWrapper>
                <OneLang short="en" active={active} lang="English"   />
                <OneLang short="ru" active={active} lang="Русский"   />
                <OneLang short="kz" active={active} lang="Казахский" />
            </SLangsWrapper>
        </SLang>
    )
}

export default withRouter(Language);